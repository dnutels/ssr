import React, {PureComponent} from 'react';
import {isEmpty} from 'lodash';

import Container from '../utils/Container';
import Script from './Script';

export default class OG extends PureComponent {
    renderBase({type, title, site_name, image, url}) {
        return (
            <Container>
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={site_name} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
            </Container>
        );
    }

    renderAuthor(article = {}) {
        const {author, publish} = article;

        const authorMeta = isEmpty(author) ? null :
            <meta property="article:author" content={author} />;
        const publishMeta = isEmpty(publish) ? null :
            <meta property="article:published_time" content={publish} />;

        return (
            <Container>
                {authorMeta}
                {publishMeta}
            </Container>
        );
    }

    renderJSONLD(websiteSeoSchema = {}) {
        return (
            <Script type="application/ld+json" id="ldjson_website">
                {JSON.stringify(websiteSeoSchema)}
            </Script>
        );
    }

    render() {
        const {openGraph = {}, websiteSeoSchema = {}} = this.props;
        const {article = {}} = openGraph;

        return (
            <Container>
                {this.renderBase(openGraph)}
                {this.renderAuthor(article)}
                {this.renderJSONLD(websiteSeoSchema)}
            </Container>
        );
    }
}
