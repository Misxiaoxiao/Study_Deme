import Request from '../utils/request'

const icode = '13926EAFCAA16CC3'

export function wordcloud () {
  return Request({
    url: '/screen/wordcloud',
    method: 'get',
    params: { icode }
  })
}

export function mapScatter () {
  return Request({
    url: 'screen/map/scatter',
    method: 'get',
    params: { icode }
  })
}

export function screenData () {
  return Request({
    url: '/screen/data',
    method: 'get',
    params: { icode }
  })
}
