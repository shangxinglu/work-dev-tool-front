
import qs from "qs";

const baseConfig: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

type Body = string | undefined | object | null | BodyInit;

/**
 * @description 标准化响应
 */
async function normalRes(res: Response) {
    const statusCode = res.status;
    if (statusCode === 401) {
        return Promise.reject();
    }

    const resData = await res.json();
    return resData.data;
}

function normalQuery(params?: string | object): string {
    let query = ''
    if (!params) return query;
    if (typeof params === 'string') {
        query += `?${params}`
    } else {
        query += `?${qs.stringify(params)}`
    }
    return query
}

function normalBody(body: Body): null | string | FormData {
    if (!body) return null;
    if (typeof body === 'string') {
        return body
    } else if (body instanceof FormData) {
        return body
    } else {
        return JSON.stringify(body)
    }
}

interface RequestOption extends RequestInit {

    params?: {
        [key: string]: any
    } | string
}



export default function request(url: string, options: RequestOption = {}): Promise<any> {
    return new Promise(async (resolve, reject) => {

        const params = options.params;
        const query = normalQuery(params);
        options.body = normalBody(options.body || '') || null;

        const res = await fetch(url + query, {
            ...baseConfig,
            ...options,
        }).catch(err => {
            console.warn(err);
            reject(err);
        }) as Response

        const resData = await normalRes(res);
        resolve(resData);

    })
}

export const Get = (url: string, params: string | object, options: RequestOption = {}) => {
    options.params = params;
    return request(url, {
        ...options,
        method: 'GET'
    })
}

export function Post(url: string, body: Body, options: RequestOption = {}) {


    return request(url, {
        ...options,
        method: 'POST',
        body: body as string | FormData,
    })
}

export function Put(url: string, body: Body, options: RequestOption = {}) {
    return request(url, {
        ...options,
        method: 'PUT',
        body: body as string | FormData,
    })
}

export function Delete(url: string, options: RequestOption = {}) {
    return request(url, {
        ...options,
        method: 'DELETE',
    })
}
