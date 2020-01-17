import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { uniqueKey, linkResolver } from '../utils/utils'

const Link = (type, element, content, children, index) => {

  if (element.data.link_type === 'Document') {
    return (
      <GatsbyLink to={ linkResolver(element.data) } key={ uniqueKey() }>
        { content }
      </GatsbyLink>
    )
  }
  if (element.data.link_type === 'Web') {
    return (
      <a href={ element.data.url } target='_blank' rel='noopener noreferrer' key={ uniqueKey() }>
        { content }
      </a>
    )
  }
};

export default Link
