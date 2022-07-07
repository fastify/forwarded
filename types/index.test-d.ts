import { IncomingMessage } from "http";
import { expectError, expectType } from "tsd";
import { forwarded } from "..";
import forwardedESM from "..";
import * as forwardedVarImport from "..";

expectType<string[]>(forwardedESM({} as IncomingMessage))
expectType<string[]>(forwarded({} as IncomingMessage))
expectType<string[]>(forwardedVarImport.default({} as IncomingMessage))
expectType<string[]>(forwardedVarImport.forwarded({} as IncomingMessage))
expectError(forwarded())
expectError(forwarded('10.0.0.1'))
