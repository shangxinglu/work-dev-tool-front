
import qs from "qs";

const baseConfig: RequestInit = {
    method: 'GET',
}

/**
 * @description 标准化响应
 */
async function normalRes(res: Response) {
    const statusCode = res.status;
    if (statusCode === 401) {
        return Promise.reject();
    }
    const resData = await res.json();

    return resData
}

function normalQuery(params): string {
    let query = ''
    if (!params) return query;
    if (typeof params === 'string') {
        query += `?${params}`
    } else {
        query += `?${qs.stringify(params)}`
    }
    return query
}

function normalBody(body: string | object | FormData): string | FormData {
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



export default function request(url, options: RequestOption = {}) {
    return new Promise(async (resolve, reject) => {

        const { params } = options;
        const query = normalQuery(params);
        options.body = normalBody(options.body) || null;

        const res = await fetch(url + query, {
            ...baseConfig,
            ...options,
        }).catch(err => {
            console.warn(err);
            reject(err);
        }) as Response

        const resData = await normalRes(res);
        return resData;

    })
}

export const Get = (url: string, params, options: RequestOption = {}) => {
    options.params = params;
    return request(url, {
        ...options,
        method: 'GET'
    })
}

export function Post(url: string, body, options: RequestOption = {}) {


    return request(url, {
        ...options,
        method: 'POST',
        body,
    })
}

export function Put(url: string, body, options: RequestOption = {}) {
    return request(url, {
        ...options,
        method: 'PUT',
        body,
    })
}

export function Delete(url: string, options: RequestOption = {}) {
    return request(url, {
        ...options,
        method: 'DELETE',
    })
}
