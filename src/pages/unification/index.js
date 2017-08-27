import React, {Component} from 'react';

import QUERY from './query.gql';
import PKG from './package.json';

export default class Page extends Component {
    static QUERY = QUERY;
    static PKG = PKG;

    render() {
        const {a} = this.props;

        return (
            <html>
                <head>
                    <title>Test - {a}</title>
                </head>
                <body style={{color: 'red'}}>
                    <div>{a} -- {Date.now()}</div>
                    <div>{a} -- {Date.now()}</div>
                    <div>{a} -- {Date.now()}</div>
                    <div>{a} -- {Date.now()}</div>
                </body>
            </html>
        );
    }
}

export {QUERY};
