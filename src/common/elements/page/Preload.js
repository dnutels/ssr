import React from 'react';

import Link from './Link';

export default function Preload({links}) {
    return links.map((link) => {
        return <Link {...link} />;
    });
}
