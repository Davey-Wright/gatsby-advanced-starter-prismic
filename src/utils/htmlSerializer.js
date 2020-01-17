import React from 'react'
import Link from '../components/link'

export const htmlSerializer = (props) => {
  switch(props.type) {
    case 'hyperlink':
    console.log(props.element)
      return <Link {...props} />
    default:
      return null;
  }
}
