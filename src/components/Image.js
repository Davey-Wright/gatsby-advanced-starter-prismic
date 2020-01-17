import React from 'react'
import PropTypes from 'prop-types';

import Img from 'gatsby-image'
import get from 'lodash/get'

const Image = ({ prismic, sharp, alt }) => {
  const imgSharp = get( sharp, 'childImageSharp.fluid')

  if ( imgSharp ) {
    return <Img fluid={ imgSharp } alt={ alt } />
  } else {
    return <img src={ prismic.url } alt={ alt } />
  }
}

Image.propTypes = {
  prismic: PropTypes.object.isRequired,
  sharp: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired
}

export default Image
