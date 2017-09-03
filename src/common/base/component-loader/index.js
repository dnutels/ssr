import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class ComponentLoader extends PureComponent {
    static EMPTY = () => null;
    static ROOT = '../../../components';

    static contextTypes = {
        load: PropTypes.func
    };

    componentWillMount() {
        const {load} = this.context;
        const {name} = this.props;
        const LoadedComponent = load(name) || ComponentLoader.EMPTY;
        this.setState({WrappedComponent: LoadedComponent});
    }

    render() {
        const {WrappedComponent} = this.state;
        return <WrappedComponent {...this.props} />;
    }
}
