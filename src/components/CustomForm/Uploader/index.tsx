import { defineComponent } from "vue";
import style from "./index.module.less";
import { UploaderProps, UploaderState, FileType } from './types'

import { Uploader, } from 'vant'
import type { UploaderFileListItem, } from 'vant'

import { uploadImg } from '@/utils/h5'
import { uploadImg as wxUploadImg } from '@/utils/wx'

import { isWeChat } from "@/utils/env";


import CameraImg from './assets/camera.png'
import UploadImg from './assets/upload.png'



export default defineComponent({
    props: UploaderProps,
    data(): UploaderState {
        return {
            fileList: this.formatUrlToFile(this.value),

        }
    },
    emits: ["change", 'update:value'],
    watch: {
        value() {
            // this.fileList = 
            this.fileList = this.formatUrlToFile(this.value)
        }
    },

    methods: {
        formatUrlToFile(url: string | string[]) {
            if (!Array.isArray(url)) {
                url = [url]
            }

            return url.filter(e => e).map(item => {
                return {
                    url: item,
                }
            })
        },
        wxUpload() {
            const currentIndex = this.fileList.length
            wxUploadImg({
                count: this.max || 1,
                choose: this.onChooseSuccess,
            }).then(res => {
                const { fileList } = this
                res.map((item, index: number) => {
                    const fileItem = fileList[currentIndex + index];
                    fileItem.url = item;
                    fileItem.status = 'done'
                })
                // this.fileList.push(...this.formatUrlToFile(res))
                this.$emit('update:value', res)

                this.$emit('change', res)
            })
        },
        onChooseSuccess(res: string[]) {
            const file: UploaderFileListItem[] = res.map(item => {
                return {
                    url: '',
                    status: 'uploading',
                }
            })


            this.fileList.push(...file)


        },
        onClickUpload(e: MouseEvent) {
            if (isWeChat) {
                if (this.fileType === 'file') return
                e.preventDefault()
                this.wxUpload()
                return

            }
        },
        onAfterRead(res: UploaderFileListItem | UploaderFileListItem[]) {
            console.log('UploaderFileListItem', res);
            if (!Array.isArray(res)) {
                res = [res]
            }
            const { fileList } = this;
            const currentIndex = fileList.length - res.length;

            const fileArr: File[] = [];
            for (let item of res) {
                item.status = 'uploading'
                fileArr.push(item.file!)
            }

            uploadImg(fileArr).then((res: string[]) => {
                console.log('success', res);
                res.map((url: string, index: number) => {
                    const file = fileList[index + currentIndex]
                    file.url = url
                    file.status = 'done'
                })
                const urlArr = fileList.map(item => item.url)
                this.$emit('update:value', urlArr)
                this.$emit('change', urlArr)
            })
        },
        /**
         * @description 阻止原生change事件冒泡
         */
        onChange(e: Event) {
            e.stopPropagation();
        },


        renderInterLabel() {
            if (this.renderLabel) {
                return this.renderLabel(this.label)
            }
            if (!this.label) return '';
            return (
                <div class={['mt-8 mb-10 font--t5 text-grey vant__label', style['label'], this.required ? 'vant__label--required' : '', this.labelClassName]}>{this.label}</div>
            )
        },
        renderPrompt() {

        },
        renderImageUploader() {
            return (
                <div class={['pt-11', style['button--image']]}>
                    <img src={CameraImg} class={[' mx-auto', style['img--1']]} />
                    <div class={['font--t6 text-neutral-9 text-center']}>{this.fileList.length}/{this.max}</div>
                </div>
            )
        },
        renderFileUploader() {
            return (
                <div class={['flex--center--v bg-green border__radius px-36', style['button--file']]}>
                    <img class={[style['img--2']]} src={UploadImg} />
                    <div class={['ml-5 font--t5 text-white']}>上传文件</div>
                </div>
            )
        },

        renderUploaderButton() {
            const currentNum = this.fileList.length;
            const maxNum = this.max;

            const strategy: Record<FileType, {
                className: string,
                slot: {
                    [name: string]: (file: UploaderFileListItem) => JSX.Element
                }
            }> = {
                image: {
                    slot: {
                        default: this.renderImageUploader,
                    },
                    className: style['uploader--image']
                },
                file: {
                    slot: {
                        default: this.renderFileUploader,
                    },

                    className: style['uploader--file']
                },
                video: {
                    slot: {
                        default: this.renderImageUploader,
                    },
                    className: style['uploader--image']
                },
                audio: {
                    slot: {
                        default: this.renderImageUploader,
                    },
                    className: style['uploader--image']
                },
            }

            const currentStrategy = strategy[this.fileType]

            return (
                <div class={['', currentStrategy.className]} onChange={this.onChange}>
                    <Uploader onClick-upload={this.onClickUpload} deletable={this.disabled ? false : true} disabled={this.disabled} v-slots={currentStrategy.slot} accept={this.accept} max-size={this.size} maxCount={this.max} upload-text={`${currentNum}/${maxNum}`} upload-icon={CameraImg} multiple={currentNum < maxNum - 1} v-model={this.fileList} afterRead={this.onAfterRead} ></Uploader>
                </div>
            )
        }
    },
    render() {
        return (
            <div class={['py-15', style['uploader']]}>
                {this.renderInterLabel()}
                {this.renderUploaderButton()}
            </div>
        )
    }
});