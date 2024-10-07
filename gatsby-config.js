require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `blurrd`,
    description: `A starter template for Gatsby with Contentful integration.`,
    author: `@yourusername`,
    siteUrl: `https://blurrd.xyz`, // Add this line with your actual domain
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,           // Add this plugin
    `gatsby-transformer-sharp`,      // And this one as well
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-react-helmet`, // Add this for better SEO handling
    {
      resolve: `gatsby-plugin-manifest`, // Add this for PWA support
      options: {
        name: `blurrd`,
        short_name: `blurrd`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site. Ensure this file exists or change the path.
      },
    },
  ],
}

