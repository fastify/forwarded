'use strict'
const benchmark = require('benchmark')

const forwarded = require('..')
const req0 = fakerequest({})
const req1 = fakerequest({ 'x-forwarded-for': '192.168.0.10' })
const req2 = fakerequest({ 'x-forwarded-for': '192.168.0.10, 192.168.1.20' })
const req5 = fakerequest({ 'x-forwarded-for': '192.168.0.10, 192.168.1.20, 192.168.1.21, 192.168.1.22, 192.168.1.23' })

new benchmark.Suite()
  .add('combined',
    function combined () {
      forwarded(req0)
      forwarded(req1)
      forwarded(req2)
      forwarded(req5)
    },
    { minSamples: 100 }
  )
  .on('cycle', function onCycle (event) { console.log(String(event.target)) })
  .run({ async: false })

function fakerequest (headers) {
  return {
    headers,
    socket: {
      remoteAddress: '10.0.0.1'
    }
  }
}
