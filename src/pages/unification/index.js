import React, {Component} from 'react';

import CSS from './assets/style/index.scss';
import JS from './assets/js/index.js';
import QUERY from './query.gql';
import PKG from './package.json';

import Style from '../../elements/page/Style';
import Script from '../../elements/page/Script';

export default class Page extends Component {
    static QUERY = QUERY;
    static PKG = PKG;

    render() {
        const {a} = this.props;

        return (
            <html>
                <head>
                    <title>Test - {a}</title>
                    <Style>
                        {CSS}
                    </Style>
                </head>
                <body style={{color: 'red'}}>
                    <div>{a} -- {Date.now()}</div>
                    <Script>
                        console.log('AAAAA');
                    </Script>
                </body>
            </html>
        );
    }
}
