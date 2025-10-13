import { config } from 'dotenv';
import Hashids from 'hashids';

config();

export function encodedID(id: number): string {
  const hashids = new Hashids('', 8);
  const salt = process.env.HASHIDS_SALT;
  const randNumber = Math.random() * (100 - 50 + 1) + 50;
  return hashids.encode([salt, id?.toString(), randNumber.toString()]);
}

export function decodedID(id: string): number | bigint {
  const hashids = new Hashids('', 8);
  return hashids.decode(id)[1];
}
