import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import favicon from "../images/menu-logo.png";

export default () => (
	<StaticQuery
		query={graphql`
			query helmetQuery {
				site {
					siteMetadata {
						title
						author
						description
						keywords
					}
				}
			}
		`}
		render={data => (
			<Helmet>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
				/>
				<meta name="description" content={data.site.siteMetadata.description} />
				<meta name="keywords" content={data.site.siteMetadata.keywords} />
				<link rel="shortcut icon" type="image/png" href={favicon} />
				<link href="https://fonts.googleapis.com/css?family=Dosis:500,700" rel="stylesheet" />
				<title>{data.site.siteMetadata.title}</title>
				<html lang="en" className="has-navbar-fixed-top"/>
				{/* Google / Search Engine Meta Tags */}
				<meta itemprop="name" content={data.site.siteMetadata.author} /> />
				<meta
					itemprop="description"
					content={data.site.siteMetadata.description}
				/>
			</Helmet>
		)}
	/>
);
