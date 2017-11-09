import React, {Children} from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    const {children, active = true, label = '', ...rest} = props;
    const content = children ? children : label;

    return (
        <button active={active} {...rest}>
            {content}
        </button>
    );
}

Button.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    iconPosition: PropTypes.oneOf(['left', 'right', 'both'])
};

export default Button;
