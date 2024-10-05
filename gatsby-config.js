require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID)
console.log("Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN)

module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    description: `A starter template for Gatsby with Contentful integration.`,
    author: `@yourusername`,
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
  ],
}

