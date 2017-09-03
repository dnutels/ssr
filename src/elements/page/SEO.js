import React from 'react';
import {get} from 'lodash';

import Root from '../utils/Root';

export default function Comp(props = {}) {
    const {themeName, lang = 'EN', siteId, segment = {}} = props;
    const {title, description, index, follow} = get(props, 'segment.seo', {});
    const {host, path, url} = get(props, 'rapido', {});

    const indexValue = index ? 'index' : 'noindex';
    const followValue = follow ? 'follow' : 'nofollow';
    const robots = `${indexValue} ${followValue}`;

    const href = `${host}${path}`;

    return (
        <Root>
            <meta name="theme" content={themeName} />
            <meta name="lang" content={lang} />
            <meta name="siteId" content={siteId} />
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={href} itemProp={url} />
        </Root>
    );
}
