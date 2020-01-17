const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/utils")

registerLinkResolver(linkResolver)
