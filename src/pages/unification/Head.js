import React from 'react';
import PropTypes from 'prop-types';

import {get, pick} from 'lodash';

import {staticCDN} from '../../common/utils/cdn';

import css from './inline-assets/style/index.scss';
import fontFaceObserver from './inline-assets/js/font-face-observer.js';
import fontLoader from './inline-assets/js/font-loader.js';

import light from './inline-assets/fonts/Montserrat/montserrat-light.woff';
import regular from './inline-assets/fonts/Montserrat/montserrat-regular.woff';
import bold from './inline-assets/fonts/Montserrat/montserrat-bold.woff';

const fonts = [
    {name: 'MontserratCrit', font: light, weight: 300, style: 'normal'},
    {name: 'MontserratCrit', font: regular, weight: 400, style: 'normal'},
    {name: 'MontserratCrit', font: bold, weight: 700, style: 'normal'}
];

const COMMON_SEO_PROPS = ['segment.seo', 'themeName', 'lang', 'siteId', 'rapido'];
const COMMON_OG_PROPS = ['openGraph', 'websiteSeoSchema'];
const TITLE_PROPS = 'chart.seo.title';
const IMAGE = 'chart.topImageUrl';

const PRELOAD = [
    {rel: 'dns-prefetch', href: '//umbrella.data.naturalint.com/'},
    {rel: 'dns-prefetch', href: '//umbrella.s3.naturalint.com/'}
];

const ENV = 'development';

import {
    Meta,
    SEO,
    OG,
    Title,
    Favicon,
    Script,
    Style,
    Preload,
    Font
} from '../../common/elements/page/';

export default function Head(props) {
    const {common, name, [name]: page} = props;
    const {assetsCdn: cdn = {}, niEnv: env = ENV, nreum} = common;

    const showNewRelic = env === 'production';

    const seo = pick(common, COMMON_SEO_PROPS);
    const og = pick(common, COMMON_OG_PROPS);

    const title = get(page, TITLE_PROPS);
    const url = get(page, IMAGE);

    const preloadLinks = [
        ...PRELOAD,
        {rel: 'preload', as: 'image', href: staticCDN(url, cdn, env)}
    ];

    return (
        <head>
            <Meta />
            <SEO {...seo} />
            <OG {...og} />
            <Title title={title} />
            <Favicon />
            <Preload links={preloadLinks} />
            <Script>{fontFaceObserver}</Script>
            <Script>{fontLoader}</Script>
            <Font fonts={fonts} />
            <Style>{css}</Style>
            {/* <Script hidden={!showNewRelic}>{nreum}</Script> */}
        </head>
    );
}
