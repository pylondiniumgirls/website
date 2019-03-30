module.exports = {
	siteMetadata: {
		title: 'Pylondinium Girls',
		author: 'Pylondinium Girls',
		imageUrl: 'https://i.imgur.com/Vz81GEl.png',
		description: 'Django workshop for women beginners',
		keywords: `Pylondinium, Django, workshop, beginners, programming, Python`,
		twitter: 'https://twitter.com/pylondiniumgir1/',
		github: `https://github.com/pylondiniumgirls`,
		siteUrl: `https://www.example.com`
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-XXXXXXXX-X',
				// Setting this parameter is optional (requried for some countries such as Germany)
				anonymize: true
			}
		},
		`gatsby-plugin-sitemap`
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	]
};
