const STATIC = 'static';
const DATA = 'data';

function cdnify(url, name, cdn, env) {
    let combinedUrl = '';

    if (url) {
        const path = cdn[name];

        if (name === 'data') {
            if (url.indexOf('http') === 0 || url.indexOf('//') === 0) {
                combinedUrl = url.replace(/([^:]\/)\/+/g, '$1');
            } else {
                combinedUrl = `${path}/${env}/${url}`.replace(/([^:]\/)\/+/g, '$1');
            }
        } else {
            if (url.indexOf('http') === 0 || url.indexOf('//') === 0) {
                combinedUrl = url.replace(/([^:]\/)\/+/g, '$1');
            } else {
                combinedUrl = `${path}/${url}`.replace(/([^:]\/)\/+/g, '$1');
            }
        }
    }

    return combinedUrl;
}

export function staticCDN(url, cdn, env) {
    return cdnify(url, STATIC, cdn, env);
}

export function dataCDN(url, cdn, env) {
    return cdnify(url, DATA, cdn, env);
}
