import React from 'react';

import QUERY from './query.gql';
import PKG from './package.json';
import JS from './assets/js/index.js';

import Page from '../../common/base/page/';

import Head from './Head';
import Body from './Body';

export default class UnificationPage extends Page {
    static QUERY = QUERY;
    static PKG = PKG;
    static JS = JS;

    render() {
        const {name, version} = PKG;
        const {common, [name]: page, scripts} = this.props;
        const props = {common, [name]: page, name, version, scripts};

        return (
            <html>
                <Head {...props} />
                <Body {...props} />
            </html>
        );
    }
}
