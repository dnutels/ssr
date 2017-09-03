import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from './assets/style/index.scss';
import JS from './assets/js/index.js';
import QUERY from './query.gql';
import PKG from './package.json';

import Page from '../../common/base/page/';
import ComponentLoader from '../../common/base/component-loader/';

import Root from '../../elements/utils/Root';

import Style from '../../elements/page/Style';
import Script from '../../elements/page/Script';
import SEO from '../../elements/page/SEO';

export default class UnificationPage extends Page {
    static QUERY = QUERY;
    static PKG = PKG;

    renderTitle() {
        return 'Title';
    }

    renderHead() {
        const {a} = this.props;

        return (
            <Root>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <SEO />
            </Root>
        );
    }

    renderBody() {
        const {a} = this.props;

        return (
            <Root>
                <ComponentLoader title={a} name="header" />
                <hr />
                <div style={{color: 'red'}}>{Date.now()}</div>
                <Script>
                    console.log('AAAAA');
                </Script>
            </Root>
        );
    }

    render() {
        return (
            <html>
                <head>{this.renderHead()}</head>
                <body>{this.renderBody()}</body>
            </html>
        );
    }
}
