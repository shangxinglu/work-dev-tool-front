import { getAction, postAction } from "@/command/netTool";
import { isWeChat } from "@/utils/env";

/**
 * @description 最新授权url
 */
let authUrl = "";

let requestPromise: any = null;

export const wxAuth = () => {
    if (!isWeChat) return Promise.resolve();
    const currentUrl = `${window?.location.href.split("#")[0]}`;

    if (authUrl === currentUrl) return requestPromise;
    authUrl = currentUrl;

    requestPromise = getAction(
        `/api/wx/ticket?url=${currentUrl}`,
    ).then(e => {
        // eslint-disable-next-line no-undef
        wx.config({
            ...e,
            debug: false,
            jsApiList: [
                "openLocation",
                "getLocation",
                "chooseImage",
                "uploadImage",
            ],
        });

        return new Promise<void>((resolve, reject) => {
            wx.ready(() => {
                resolve();
            });


        })
    });

    return requestPromise;
};


export interface ChooseImageOptions {
    /**
     * @description 选择图片的数量
     */
    count?: number;
    sizeType?: Array<'original' | 'compressed'>;
    /**
     * @description 图片选择成功后回调
     */
    choose?: (res: string[]) => void;
}

export interface ChooseImageResult {
    localIds: Array<string>
}

export const chooseImage = (options: ChooseImageOptions = {}): Promise<ChooseImageResult["localIds"]> => {
    return new Promise((resolve, reject) => {

        wxAuth().then(() => wx.chooseImage({
            count: options.count || 1,
            sizeType: options.sizeType || ['original', 'compressed'],
            success(res: ChooseImageResult) {
                const localIds = res.localIds;

                options.choose?.(localIds);
                console.log('选择图片', localIds);

                resolve(localIds);
                return
            }
        })
        )
    })
}

export const getServerId = (localIds: string | Array<string>, serverIds: Array<string> = []): Promise<Array<string>> => {
    if (!Array.isArray(localIds)) {
        localIds = [localIds]
    }
    console.log('获取serverId', localIds);
    const localId = localIds.pop();

    return new Promise((resolve, reject) => {
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1,
            success(res: any) {
                console.log('uploadImage success, serverId is: ', res);
                serverIds.push(res.serverId);
                if (localIds.length > 0) {
                    resolve(getServerId(localIds, serverIds))
                    return;
                } else {
                    uploadImgAPI(serverIds).then(res => {
                        const imgUrl = res.map(e => e.key);
                        resolve(imgUrl);

                    }).catch(e => {
                        resolve([]);
                    })
                    return
                }

            },
        })
    })
}

/**
 * @description 上传图片
 */
export const uploadImg = (options: ChooseImageOptions = {}): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        chooseImage(options).then(localIds => {
            getServerId(localIds)
                .then((serverIds) => {
                    console.log('serverIds', serverIds);
                    resolve(serverIds);
                })


            // Promise.all(localIds.map(localId => getServerId(localId)))
            //     .then((serverIds) => {
            //         console.log('serverIds', serverIds);
            //         resolve(serverIds);
            //     })
        })
    })
}

interface UploadImgAPIDataItem {
    /**
     * @description 上传后的图片链接
     */
    key: string;
}

/**
 * @description 图片上传
 */
export const uploadImgAPI = async (serverId: Array<string>): Promise<Array<UploadImgAPIDataItem>> => {
    const res: Array<UploadImgAPIDataItem> = await postAction('/api/wx/uploadImg', { serverId });
    console.log('uploadImgAPI', res);
    return res;
}

/**
 * @description 打开位置
 */
export const openLocation = (to: LatLngObj, name: string = '', address: string = '') => {
    wxAuth().then(() => {
        wx.openLocation({
            latitude: to.lat,
            longitude: to.lng,
            name,
            address,
            scale: 14,
            infoUrl: "",
        });
    });
}


type GetlocationPromiseType = Promise<LatLngObj>;

/**
 * @description 微信IOS同时多次调用只触发一次
 */
let wxGetlocationPromise: GetlocationPromiseType | null;

/**
 * @description 获取当前定位
 *
 * @returns
 */
export const getCurrentLocation = (): GetlocationPromiseType => {
    /**
       * @description 数据模拟
       */
    // return Promise.resolve({ lat: 29.875571, lng: 121.70357 })

    if (wxGetlocationPromise) return wxGetlocationPromise;

    wxGetlocationPromise = new Promise((resolve, reject) => {

        wxAuth().then(() => {
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log("getLocation 获取成功");

                    wxGetlocationPromise = null;
                    console.log("wx.getLocation success", res);
                    resolve({ lat: res.latitude, lng: res.longitude });
                },
                fail: function (err) {
                    console.log("getLocation 获取失败");

                    console.log("wx.getLocation fail", err);
                    reject(err);
                },
            });

        });

    });

    return wxGetlocationPromise;

};

