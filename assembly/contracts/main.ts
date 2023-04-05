// The entry file of your WebAssembly module.
import { callerHasWriteAccess, generateEvent, getKeys, getKeysOf, validateAddress } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

export function test_address_validation(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = validateAddress(args.nextString().expect("Address argument missing"));
  return [res];
}

export function test_get_keys(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = getKeys(args.nextBytes().expect("Keys argument missing"));
  return res[0];
}

export function test_get_keys_of(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = getKeysOf(
      args.nextString().expect("Address argument missing"),
      args.nextBytes().expect("Keys argument missing"));
  return res[0];
}
