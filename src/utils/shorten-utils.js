import {SHORTENER} from '../config';

export const BAIDU_SEARCH = 'https://www.baidu.com/s?wd=';

export const SHORTENER_LIST = {
    SINA: 'sina',
}

export const SINA_SHORTEN = 'http://route.showapi.com/855-1';
export const SECRET = '0ccbdfbad1b54b32878f201ef63117ed';
export const APPID = '34672';

export function getSinaShortenURL(url, onSuccess, onFailed){

    $.get(SINA_SHORTEN+`?showapi_appid=${APPID}&showapi_sign=${SECRET}&url_long=${url}`)
        .done(res => {

            if(res.showapi_res_code === 0 && res.showapi_res_body.url_short){

                onSuccess(res.showapi_res_body.url_short);

            }else{
                onFailed();
            }

        })
        .fail(() => {
            onFailed();
        });    


}

export function getShortenURL(url, onSuccess, onFailed){

    switch(SHORTENER){

        case SHORTENER_LIST.SINA:
            getSinaShortenURL(url, onSuccess, onFailed);
            break;
        default:
            getSinaShortenURL(url, onSuccess, onFailed);
            break;
    }
   


}