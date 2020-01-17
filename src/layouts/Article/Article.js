import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import { Link as PrismicLink } from "prismic-reactjs"

import SliceZone from '../../components/SliceZone'
import { uniqueKey, dateFormatter, linkResolver } from '../../utils/utils'

export default ({ data }) => {

  const doc = data.prismic.allArticles.edges.slice(0, 1).pop()
  if (!doc) return null

  const prevArticle = data.prismic.prevArticle,
        nextArticle = data.prismic.nextArticle

  const article = doc.node,
        title = article.title[0],
        description = article.description,
        datePublished = dateFormatter(article._meta.firstPublicationDate),
        tags = []
        article.tags.forEach( ({ tag }) => {
          if( tag !== null) {
            tags.push(tag.tag)
          }
        })

  return (
    <>
      <header>
        <Img fluid={ article.featured_imageSharp.childImageSharp.fluid } alt={ article.featured_image.alt }/>
        <h1>{ title.text }</h1>
        <p>{ description }</p>
        <p>Published On: { datePublished }</p>
        <p>{ article.reading_time } min read</p>
          <p>Words By:
            <a href={ PrismicLink.url(article.words_by_link) } target='_blank' rel='noopener noreferrer'>
              { article.words_by_name }
            </a>
          </p>
        <p>Photos By:
          <a href={ PrismicLink.url(article.photos_by_link) } target='_blank' rel='noopener noreferrer'>
            { article.photos_by_name }
          </a>
        </p>
        <p>
          Tags:
          {
            tags.map( tag => (
              <li key={ uniqueKey() }>
                <Link to={ `/articles?tag=${ tag.toLowerCase() }` }>
                  { tag }
                </Link>
              </li>
            ))
          }
        </p>
        </header>

        <main>
          <SliceZone slices={ article.body } />
        </main>

        <footer>

        </footer>
    </>
  )
}

const PreviousArticleLink = ({ doc }) => {
  return (
    <>
      <p>Previous Article</p>
      <Link to={ linkResolver(doc._meta) }>
        { doc.title[0].text }
      </Link>
    </>
  )
}


const NextArticleLink = ({ doc }) => (
  <>
    <p>Next Article</p>
    <Link to={ linkResolver(doc._meta) }>
      { doc.title[0].text }
    </Link>
  </>
)

export const query = graphql`
  query ArticleQuery(
    $uid: String
  ) {
    prismic {
      allArticles(uid: $uid) {
        edges {
          node {
            _meta {
              id
              type
              uid
              firstPublicationDate
            }
            title
            description
            tags {
              tag {
                ... on PRISMIC_Tag {
                  tag
                }
              }

            }
            words_by_name
            words_by_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            photos_by_name
            photos_by_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            reading_time
            featured_image
            featured_imageSharp {
              childImageSharp {
                fluid(maxWidth: 1300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            body {
              ... on PRISMIC_ArticleBodyImage {
                type
                primary {
                  image
                  imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1300) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              ... on PRISMIC_ArticleBodyRichtext {
                type
                primary {
                  richtext
                }
              }
            }
          }
        }
      }
    }
  }
`
