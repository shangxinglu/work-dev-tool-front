import { getAction, } from "@/command/netTool";
import { upload } from 'qiniu-js'
import { KEY } from '@/config/map'
// import { getCurrentLocationH5 } from '@/utils/helper'
import { getParamUrl } from '@/utils/util'
import { getLocation } from '@/third/map/Tencent/index'
interface QNYTokenAPIResult {
    url: string;
    token: string;
}

export const getQNYTokenAPI = async () => {
    const res: QNYTokenAPIResult = await getAction('/public/common/getQnToken');
    return res;
}


export const uploadImgAPI = (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {

        const res = await getQNYTokenAPI();
        const observe = upload(file, null, res.token,);
        const subscribe = observe.subscribe({
            complete(data: any) {
                console.log(res);
                const url = res.url + data.hash;
                resolve(url);

            },
            error(err: any) {
                console.log(err);
                resolve('');
            }
        })

    })

}



/**
 * @description 图片上传
 */
export const uploadImg = <T>(file: File | File[]): Promise<string[]> => {
    if (!Array.isArray(file)) {
        file = [file];
    }
    return new Promise(async (resolve, reject) => {
        const urls = await Promise.all((file as File[]).map(e => uploadImgAPI(e)))
        resolve(urls);
    });
}


export interface H5NavParams {
    // type: H5NavParamsType,
    /**
     * @description 起点经度
     */
    spointx: number;
    /**
     * @description 起点纬度
     */
    spointy: number;

    /**
     * @description 终点经度
     */
    epointx: number;
    /**
     * @description 终点纬度
     */
    epointy: number;
    /**
     * @description 终点名称
     */
    eword: string;
    referer: string;
    key: string;
}

export const mapNavigate = async (to: LatLngObj, from?: LatLngObj) => {
    if (!from) {
        // from = await getCurrentLocationH5() || {};
        from = await getLocation() || {};
    }

    const params: H5NavParams = {
        spointx: from.lng,
        spointy: from.lat,
        epointx: to.lng,
        epointy: to.lat,
        eword: "目的地",
        referer: "myApp",
        key: KEY,
    };
    location.href = `https://map.qq.com/nav/drive#routes/page?${getParamUrl(params)}`;
}



export const getCurrentLocation = (): GetlocationPromiseType => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(res => {
            console.log('getCurrentLocationH5', res);

            resolve({ lat: res.coords.latitude, lng: res.coords.longitude });
        }, err => {
            console.log('getCurrentLocationH5 error', err);

            reject(err);
        }, {
            timeout: 5000
        });
    });
}