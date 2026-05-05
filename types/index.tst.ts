/// <reference types="node" />

import { type IncomingMessage } from 'node:http'
import { expect } from 'tstyche'
import forwardedESM, { forwarded } from '.'
import * as forwardedVarImport from '.'

expect(forwardedESM({} as IncomingMessage)).type.toBe<string[]>()
expect(forwarded({} as IncomingMessage)).type.toBe<string[]>()

expect(forwardedVarImport.default({} as IncomingMessage)).type.toBe<string[]>()
expect(forwardedVarImport.forwarded({} as IncomingMessage)).type.toBe<
  string[]
>()

expect(forwarded).type.not.toBeCallableWith()
expect(forwarded).type.not.toBeCallableWith('10.0.0.1')
