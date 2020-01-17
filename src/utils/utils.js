import Moment from 'moment'

export const dateFormatter = data => Moment(data).format("LL")

export const uniqueKey = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

export const linkResolver = doc => {
  if (doc.type === "article") {
    return "/article/" + doc.uid
  }
  return "/"
}
