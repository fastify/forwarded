'use strict'

const test = require('node:test')
const forwarded = require('..')

test('should require req', function (t) {
  t.plan(1)
  t.assert.throws(forwarded.bind(null), 'argument req.*required')
})

test('should work with X-Forwarded-For header', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1')
  t.assert.deepStrictEqual(forwarded(req), ['127.0.0.1'])
})

test('should include entries from X-Forwarded-For', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': '10.0.0.2, 10.0.0.1'
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

test('should include entries from X-Forwarded-For', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': '   '
  })
  t.assert.deepStrictEqual(forwarded(req), ['127.0.0.1'])
})

test('should include entries from X-Forwarded-For', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': '10.0.0.1'
  })
  t.assert.deepStrictEqual(forwarded(req), ['127.0.0.1', '10.0.0.1'])
})

test('should skip blank entries', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': '10.0.0.2,, 10.0.0.1'
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

test('should trim leading OWS', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': ' 10.0.0.2 ,  , 10.0.0.1 '
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

test('should handle correctly when beginning with a comma', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': ', 10.0.0.2 ,  , 10.0.0.1'
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

test('should handle correctly when ending with a comma', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': '10.0.0.2 ,  , 10.0.0.1,'
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

test('should trim trailing OWS before a comma', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': ' , 10.0.0.2 ,  , 10.0.0.1'
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

test('should trim trailing OWS after a comma', function (t) {
  t.plan(1)
  const req = createReq('127.0.0.1', {
    'x-forwarded-for': ' 10.0.0.2 ,  , 10.0.0.1 , '
  })
  t.assert.deepStrictEqual(forwarded(req), [
    '127.0.0.1',
    '10.0.0.1',
    '10.0.0.2'
  ])
})

function createReq (socketAddr, headers) {
  return {
    socket: {
      remoteAddress: socketAddr
    },
    headers: headers || {}
  }
}
