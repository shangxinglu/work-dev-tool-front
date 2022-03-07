/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
/**
 * @description 加密方式
 */
enum sm2EncryptEnum {
  C1C2C3 = 0,
  C1C3C2 = 1,
}

interface Window {
  // 加密
  sm2Encrypt: (str: string, publicKey: string, mode: sm2EncryptEnum) => string;
  // // 解密
  // Decrypt: (str: string) => string;

  wxConfig: () => void;
}

interface wxUploadSuccess {
  serverId: string;
}

function wxUploadSuccessFun(result: wxUploadSuccess): void;

interface WXJSSDKOpenLocationOptions {
  /**
   * @description 纬度，浮点数，范围为90 ~ -90
   */
  latitude: number;
  /**
   * @description 经度，浮点数，范围为180 ~ -180。
   */
  longitude: number;
  /**
   * @description 位置名
   */
  name: string;
  /**
   * @description 地址详情说明
   */
  address: string;
  /**
   * @description 地图缩放级别,整型值,范围从1~28。默认为最大
   */
  scale: number;
  /**
   * @description 在查看位置界面底部显示的超链接,可点击跳转
   */
  infoUrl: string;
}

type WXJSSDKGetLocationOptions = {
  type: 'wgs84' | 'gcj02';
  success?: (res: {
    latitude: number,
    longitude: number,
    speed: number;
    accuracy: number;
  }) => void;

  fail?: (err: any) => void;
}
declare class wx {
  static ready(fn: () => void): void;
  static previewImage({ current: number, urls: [] }): void;
  static uploadImage({
    localId: string,
    isShowProgressTips: number,
    success: wxUploadSuccessFun
  }): void;
  static chooseImage(res: { [key: string]: any }): void;
  static config(res: { [key: string]: any }): void;
  static openLocation(options: WXJSSDKOpenLocationOptions): void;
  static getLocation(options: WXJSSDKGetLocationOptions)

}

declare class DesUtils {
  static encode(str: string, secretKey: string): string;
}
declare class AMap {
  static [key: string]: any;
}

declare class timTool {
  static getMessageList({ userID } = {}): Promise<any>;
  static getView({ }: any): any;
  static deleteConversation(conversationID: any): any;
}

declare interface LatLngObj {
  lat: number;
  lng: number;
}

declare type GetlocationPromiseType = Promise<LatLngObj>;

declare module 'rollup-plugin-visualizer';