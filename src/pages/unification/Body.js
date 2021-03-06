import React from 'react';
import {get, omit} from 'lodash';

import {staticCDN} from '../../common/utils/cdn';

import logo from './inline-assets/images/logo.svg';
import reporter from './inline-assets/js/reporter.js';

import ComponentLoader from '../../common/base/component-loader/';

import {Script} from '../../../lib/elements/page/';
import {SVGDefinition} from '../../../lib/elements/svg/';

export default function Body(props) {
    const {common, name, version, [name]: page, scripts} = props;
    const {assetsCdn: cdn = {}, niEnv: env = ENV} = common;
    const url = get(common, 'tracking.funnelManagerUrl');
    const domain = get(common, 'rapido.host');

    const hideData = env === 'production';
    const data = JSON.stringify(omit(props, 'common.nreum'));

    const hideTracker = env !== 'production';
    const cdnURL = staticCDN(url, cdn, env);
    const funnelURL = `${cdnURL}/tag_manager/tags.js?container=page_impression&domain=${domain}`;

    const {chart = {}} = page;
    const {title} = chart;

    const scriptTags = scripts.map((script, index) => {
        return <Script type="text/javascript" src={script} key={index} />;
    });

    return (
        <body className="page__font-light" data-page-name={name} data-page-version={version}>
            <SVGDefinition>{logo}</SVGDefinition>
            <ComponentLoader name="header" title={title} />
            <Script id="eventTrackerAttributes">{reporter}</Script>
            <Script hidden={hideTracker} type="text/javascript" src={funnelURL} defer async />
            <Script type="text/javascript" src="//126557.tctm.co/t.js" defer async />
            <Script hidden={hideData}>window.data = {data};</Script>
            <Script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js" />
            {scriptTags}
        </body>
    );
}
