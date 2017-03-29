export function formatQueryParams(query){

    let params = {};

    query.substring(1).split('&').forEach(param => {

        let t = param.split('=');
        params[t[0]]=t[1];

    });

    return params;

}