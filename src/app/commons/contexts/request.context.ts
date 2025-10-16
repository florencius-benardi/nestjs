import { Request } from 'express';

export class RequestContext {
  private static _current: Request | undefined;

  static setCurrentRequest(req: Request) {
    this._current = req;
  }

  static getCurrentRequest(): Request | undefined {
    return this._current;
  }
}
