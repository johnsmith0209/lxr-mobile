import axios from 'axios';
import * as Apis from 'wf-apis';
import {
    isMobileApp,
} from '@/configs';
import {
    jwtStorage,
    langStorage,
} from './Storage';
import {
    CapacitorHttp,
} from '@capacitor/core';
import {
    BaseApi
} from 'wf-apis/lib/Base';

let baseURL = 'https://www.lixinger.com/api/';

// console.log('isMobileApp', {isMobileApp, ios: isPlatform('ios'), android: isPlatform('android'), mobileweb: isPlatform('mobileweb')});
if (process.env.NODE_ENV === 'development') {
    baseURL = !isMobileApp ? '/api/' : 'http://192.168.31.156:8088/api/';
}

const AXIOS_CLIENT_CONFIG = {
    // 这里需要根据web或者native和本地网络ip调整
    baseURL,
    timeout: 60000,
};

let client = axios.create(AXIOS_CLIENT_CONFIG);
function requestWrapper(method = 'get') {
    return async function(url, args) {
        try {
            let count = 0;
            // console.log({count: count++});
            const options = {
                url: `${baseURL}${url}`,
                method: method.toUpperCase(),
                responseType: 'json',
            };
            // console.log({count: count++});
            if (method.toLowerCase() === 'get') {
                options.params = args?.params;
            } else {
                options.data = args;
            }
            // console.log({count: count++});
            if (args?.cancelToken) {
                // TODO: cancel token implementation
                delete args?.cancelToken;
            }
            // 必须手动覆盖，不然swift代码会用自己的URLSession，就算删掉了cookie也没用
            // console.log({count: count++});
            const lang = await langStorage.get();
            const jwt = await jwtStorage.get();
            // console.log({count: count++});
            // console.log('get from cookie', {jwt, lang});
            options.headers = {cookie: ''};
            Object.entries({jwt, lang}).forEach(([key, value]) => {
                options.headers.cookie += `${key}=${value}; `;
            });
            // console.log({count: count++});
            if (method !== 'get') {
                options.headers['Content-Type'] = 'application/json';
            }
            console.log('CapacitorHttp request options', options);
            // 非200的不会throw
            const {data, headers, status} = await CapacitorHttp.request(options);
            console.log({count: count++});
            console.log('CapacitorHttp response', data, headers, status);
            if (status !== 200) {
                const error = {
                    status,
                    data: data.error,
                    __handled: true,
                };
                throw Error(error);
            }
            console.log({count: count++});
            return {data, headers, status};
        } catch (error) {
            if (error.__handled) {
                throw error;
            }
            // for network error ?
            console.error(error);
        }
    };
}

if (isMobileApp) { // 替换成CapacitorHttp
    client = {
        get: requestWrapper('get'),
        post: requestWrapper('post'),
        delete: requestWrapper('delete'),
        put: requestWrapper('put'),
    };
}

Object.entries(Apis).forEach(([, api]) => {
    if (api instanceof BaseApi) {
        api.client = client;
    }
});
