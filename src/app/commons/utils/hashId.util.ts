import { HttpException, HttpStatus } from '@nestjs/common';
import { config } from 'dotenv';
import Hashids from 'hashids';
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

export function encodedStringID(id: string, length: number = 40): string {
  const salt = process.env.HASHIDS_SALT;
  const hashids = new Hashids(salt, length);
  return hashids.encode(id);
}

export function decodedStringID(
  id: string,
  length: number = 40,
): string | NumberLike[] | string[] {
  const salt = process.env.HASHIDS_SALT;
  const hashids = new Hashids(salt, length);

  const decodeStr: string | NumberLike[] | string[] | undefined =
    hashids.decode(id);
  if (decodeStr == undefined)
    throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

  return decodeStr;
}
