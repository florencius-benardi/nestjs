import { HttpException, HttpStatus } from '@nestjs/common';
import { config } from 'dotenv';
import Hashids from 'hashids';
import zlib from 'node:zlib';
import { NumberLike } from 'hashids/cjs/util';

config();

export function encodedID(id: number, length: number = 15): string {
  const salt = process.env.HASHIDS_SALT;
  const hashids = new Hashids(salt, length);
  const randNumber = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  return hashids.encode([randNumber, id, randNumber]);
}

export function decodedID(id: string, length: number = 15): number {
  const salt = process.env.HASHIDS_SALT;
  const hashids = new Hashids(salt, length);

  if (typeof id == 'string') {
    if (hashids.decode(id)?.[1] == undefined)
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    else {
      return Number(hashids.decode(id)?.[1]);
    }
  }

  return Number(id);
}

export function encodeToken(token: string): string {
  return zlib.deflateSync(token, { memLevel: 9 }).toString('base64url');
}

export function decodedToken(token: string): string | NumberLike[] | string[] {
  return zlib.inflateSync(Buffer.from(token, 'base64url')).toString();
}
