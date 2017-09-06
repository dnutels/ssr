import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class ComponentLoader extends PureComponent {
    static EMPTY = () => null;

    static contextTypes = {
        load: PropTypes.func,
        dependencies: PropTypes.object
    };

    componentWillMount() {
        const {load, dependencies} = this.context;
        const {name, version = dependencies[name]} = this.props;

        const LoadedComponent = load(name, version) || ComponentLoader.EMPTY;
        this.setState({WrappedComponent: LoadedComponent});
    }

    render() {
        const {WrappedComponent} = this.state;
        return <WrappedComponent {...this.props} />;
    }
}
