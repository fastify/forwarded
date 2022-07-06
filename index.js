/*!
 * forwarded
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {object} req
 * @return {array}
 * @public
 */

module.exports = function forwarded (req) {
  if (!req) {
    throw new TypeError('argument req is required')
  }

  // simple header parsing
  const socketAddr = req.socket.remoteAddress

  const header = req.headers['x-forwarded-for']
  if (!header && typeof header !== 'string') {
    return [socketAddr]
  } else if (header.indexOf(',') === -1) {
    return [socketAddr, header.trim()]
  } else {
    let end = header.length
    let start = end
    const result = [socketAddr]
    let char = ''
    // gather addresses, backwards
    for (let i = end - 1; i >= 0; --i) {
      char = header[i]
      if (char === ' ') {
        (start === end) && (start = end = i)
      } else if (char === ',') {
        (start !== end) && result.push(header.slice(start, end))
        start = end = i
      } else {
        start = i
      }
    }

    // final address
    (start !== end) && result.push(header.substring(start, end))
    // return all addresses
    return result
  }
}
