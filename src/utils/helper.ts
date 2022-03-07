// import {
//     getLocation,
// } from '@/third/map/Tencent/index'

// import {
//     getLocation,
// } from '@/third/map/Amap/index'

import { getCurrentLocation as getCurrentLocationWx, openLocation } from '@/utils/wx'
import { getCurrentLocation as getCurrentLocationH5, mapNavigate } from '@/utils/h5'

import { isWeChat } from "./env";
import moment from "moment";




// 获取事件中的dataset指定key的数据
export const getDataset = function (e: MouseEvent, key: string): any {
  const { target } = e;

  let el = target;

  while (el) {
    const { dataset } = el as HTMLElement;
    if (dataset?.[key]) {
      return dataset[key];
    }

    el = (el as HTMLElement)?.parentElement;
  }

  return null;
};



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


  if (!isWeChat) {
    return getCurrentLocationH5();
  }

  return getCurrentLocationWx();

};

export const getLatLng = () => {
  return getCurrentLocation().then(e => {
    localStorage.setItem('latLng', JSON.stringify(e));
    return e
  }).catch(err => {
    return null;
  })
}

export const getLastLocation = async () => {
  const latLngStr = localStorage.getItem('latLng') || 'null';
  const latLngObj = JSON.parse(latLngStr);
  if (latLngObj) {
    getLatLng();
    return latLngObj;
  }

  return getLatLng();

}

export const getLatLngParams = async () => {
  const latLng = await getLastLocation();
  if (!latLng) return {};
  return {
    lat: latLng.lat,
    lng: latLng.lng,
  }
}


/**
 * @description 导航
 */
export async function navigation(to: LatLngObj, options: {
  name?: string,
  address?: string,
  from?: LatLngObj,
} = {}) {
  if (isWeChat) {
    openLocation(to, options.name, options.address);
  } else {
    mapNavigate(to, options.from);
  }

}



/**
 * @description 格式化时间
 */
export const formatDatetime = (time: string, format: string = 'YYYY-MM-DD') => {
  if (!time) return "";
  return moment(time).format(format);
};






export const isAPISuccess = (res: any) => {
  return res.code === 200
}

