import { config } from 'dotenv';
import Hashids from 'hashids';

config();

export function encodedID(id: number): string {
  const salt = process.env.HASHIDS_SALT;
  const hashids = new Hashids(salt, 15);
  const randNumber = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  return hashids.encode([randNumber, id, randNumber]);
}

export function decodedID(id: string): number {
  const salt = process.env.HASHIDS_SALT;
  const hashids = new Hashids(salt, 15);
  return Number(hashids.decode(id)[1]);
}
