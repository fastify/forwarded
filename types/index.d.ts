import { IncomingMessage } from 'http';

/**
 * Get all addresses in the request used in the `X-Forwarded-For` header.
 */
declare function forwarded(req: IncomingMessage): string[];

export default forwarded
export {
  forwarded
}
