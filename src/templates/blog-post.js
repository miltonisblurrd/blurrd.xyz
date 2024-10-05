import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const BlogPost = ({ data }) => {
  const { title, publishDate, body } = data.contentfulBlogPost
  const richTextBody = JSON.parse(body.raw)

  return (
    <div>
      <h1>{title}</h1>
      <p>{publishDate}</p> {/* Display the correct publishDate */}
      <div>{documentToReactComponents(richTextBody)}</div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        raw
      }
    }
  }
`

export default BlogPost
