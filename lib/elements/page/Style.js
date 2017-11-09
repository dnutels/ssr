import React, {Children} from 'react';
import PropTypes from 'prop-types';

function Style(props) {
    const {children, hidden, ...rest} = props;

    let styleProps = children ? {
        dangerouslySetInnerHTML: {
            __html: children
        },
        ...rest
    } : rest;

    return hidden ? null : <style {...styleProps}></style>;
}

Style.propTypes = {
    children: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    rel: PropTypes.string,
    hidden: PropTypes.bool
};

export default Style;
