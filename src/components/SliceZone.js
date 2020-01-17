import React from 'react'
import PropTypes from 'prop-types';

import { RichText } from 'prismic-reactjs'
import { uniqueKey, linkResolver } from '../utils/utils'
import Link from './Link'
import Image from './Image'

const SliceZone = ({ slices }) => {
  const slice = slices.map(slice => {
    switch (slice.type) {
      case 'richtext':
        return <RichText render={ slice.primary.richtext } serializeHyperlink={ Link } key={ uniqueKey() }/>
      case 'image':
        return <Image prismic={ slice.primary.image } sharp={ slice.primary.imageSharp } alt={ slice.primary.image.alt } key={ uniqueKey() }/>
      default:
        return null
    }
  })
  return slice
}

SliceZone.propTypes = {
  slices: PropTypes.array.isRequired,
}

export default SliceZone
