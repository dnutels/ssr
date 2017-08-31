'use strict';

function renderError(err) {
    return `
        <html>
        <head>
            <title>Error</title>
            <style>
                .error {
                    background-color: #96084a;
                    color: white;
                    font-family: monospace;
                }
            </style>
        </head>
        <body class="error">
            <pre>${err.stack}</pre>
        </body>
        </html>
    `;
}

module.exports = {
    renderError
};
