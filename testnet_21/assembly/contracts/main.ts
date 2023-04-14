// The entry file of your WebAssembly module.
import { Storage, generateEvent, getKeys, getKeysOf, validateAddress } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

export function test_address_validation(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  if (validateAddress(args.nextString().expect("Address argument missing"))) {
    generateEvent('Address is valid');
  } else {
    generateEvent('Address is not valid');
  }
  return [];
}

export function test_set_keys(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  Storage.set(args.nextBytes().expect("Keys argument missing"), args.nextBytes().expect("Value argument missing")); 
  return []; 
}

export function test_get_keys(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = getKeys(args.nextBytes().expect("Keys argument missing"));
  generateEvent(`Keys: ${res}`);
  return [];
}

export function test_get_keys_of(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = getKeysOf(
      args.nextString().expect("Address argument missing"),
      args.nextBytes().expect("Keys argument missing"));
  generateEvent(`Keys: ${res}`);
  return [];
}
