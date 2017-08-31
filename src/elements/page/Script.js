import React from 'react';
// import PropTypes from 'prop-types';

function Script(props) {
    const {children, ...rest} = props;

    let scriptProps = children ? {
        dangerouslySetInnerHTML: {
            __html: children
        },
        ...rest
    } : rest;

    return <script {...scriptProps}></script>;
}

// Script.propTypes = {
//     name: PropTypes.string
// };

export default Script;
