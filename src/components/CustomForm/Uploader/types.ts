import { FormConfigBaseProps, FormConfigBase, FormTypeEnum } from "../types";
import { PropType } from "vue";
import type { UploaderFileListItem } from 'vant'

export type FileType = 'image' | 'video' | 'audio' | 'file'

export interface UploaderType extends FormConfigBase {
    formType: FormTypeEnum.Uploader,
    /**
     * @description 最大上传数量
     */
    max?: number;
    /**
     * @description 上传类型
     */
    accept?: string;
    /**
     * @description 上传大小限制
     * 单位：字节
     * 默认：2MB
     */
    size?: number;
    /**
     * @description 文件类型
     */
    fileType?: FileType;

    value?: string | string[];
    multiple: boolean;
    /**
     * @description 示例图
     */
    example?: string[];
    appendix?: string[];
}

export const UploaderProps = {
    ...FormConfigBaseProps,
    multiple: {
        type: Boolean,
        default: false,
    },
    /**
     * @description 最大上传数量
     */
    max: {
        type: Number,
        default: 1
    },
    /**
     * @description 上传类型
     */
    accept: {
        type: String,
        default: 'image/jpeg,image/png,image/gif'
    },
    /**
     * @description 上传大小限制
     * 单位：字节
     * 默认：2MB
     */
    size: {
        type: Number,
        default: 1024 * 1024 * 2
    },

    value: {
        type: Array as () => string[],
        default: () => []
    },
    /**
     * @description 文件类型
     */
    fileType: {
        type: String as PropType<FileType>,
        default: 'image'
    },

    example: {
        type: Array as () => string[],
        default: () => []
    },
    appendix: {
        type: Array as () => string[],
        default: () => []
    }






}

export type UploaderProps = PropType<typeof UploaderProps>;

export interface UploaderState {
    /**
     * @description 文件列表
     */
    fileList: UploaderFileListItem[];
    /**
     * @description 
     */
    // urlList: string[];

    /**
     * @description 显示预览
     */
    previewVisible?: boolean;

}

export interface FileUplaoderFn {
    (file: File[]): Promise<string[]>;

}