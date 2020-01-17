import React from 'react'
import { Link, graphql } from 'gatsby'

import Image from '../components/Image'
import { uniqueKey, dateFormatter, linkResolver } from '../utils/utils'

export const query = graphql`
  {
    prismic {
      allArticles(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              type
              uid
              id
              firstPublicationDate
            }
            title
            words_by_name
            reading_time
            featured_image
            featured_imageSharp {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const doc = data.prismic.allArticles.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <ul>
      { data.prismic.allArticles.edges.map( ({ node }) => {
        return (
          <li key={ uniqueKey() }>
            <Image prismic={ node.featured_image } sharp={ node.featured_imageSharp } alt={ node.featured_image.alt }/>
            <Link to={ linkResolver(node._meta) }>
              { node.title[0].text }
            </Link>
            <p>{ node.words_by_name } - { node.reading_time } min read - { dateFormatter(node._meta.firstPublicationDate) }</p>
          </li>
        )
      })}
    </ul>
  )
}
