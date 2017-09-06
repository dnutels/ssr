import React, {PureComponent} from 'react';
import {get} from 'lodash';

import Container from '../utils/Container';
import Link from './Link';

export default class SEO extends PureComponent {
    renderRobots(index, follow) {
        const indexValue = index ? 'index' : 'noindex';
        const followValue = follow ? 'follow' : 'nofollow';
        const robots = `${indexValue} ${followValue}`;

        return <meta name="robots" content={robots} />;
    }

    renderCanonical({host, path, url}) {
        const href = `${host}${path}`;

        return <Link rel="canonical" href={href} itemProp={url} />;
    }

    render() {
        const {lang = 'EN', siteId, rapido = {}} = this.props;
        const {title, description, index, follow} = get(this.props, 'segment.seo', {});

        return (
            <Container>
                <meta name="lang" content={lang} />
                <meta name="siteId" content={siteId} />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                {this.renderRobots(index, follow)}
                {this.renderCanonical(rapido)}
            </Container>
        );
    }
}
