import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
    static childContextTypes = {
        load: PropTypes.func,
        dependencies: PropTypes.object
    };

    getChildContext() {
        const {load, dependencies} = this.props;
        return {load, dependencies};
    }
}
