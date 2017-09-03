import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
    static childContextTypes = {
        load: PropTypes.func
    };

    getChildContext() {
        const {load} = this.props;
        return {load};
    }
}
