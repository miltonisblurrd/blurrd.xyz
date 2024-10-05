import React from "react"
import { graphql } from "gatsby"

const BlogPage = ({ data }) => {
  return (
    <div>
      <h1>Blog</h1>
      {data.allContentfulBlogPost.edges.map(post => (
        <div key={post.node.slug}>
          <h2>{post.node.title}</h2>
          <p>{post.node.publishDate}</p> {/* Display the correct publishDate */}
          <div>{post.node.body.raw}</div>
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          body {
            raw
          }
        }
      }
    }
  }
`

export default BlogPage
