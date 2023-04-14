// The entry file of your WebAssembly module.
import { Storage, generateEvent, getKeys, getKeysOf, validateAddress } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

export function test_address_validation(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const addr = args.nextString().expect("Address missing");
  generateEvent(addr);
  if (validateAddress(addr)) { //args.nextString().expect("Address argument missing"))) {
    generateEvent('Address is valid');
    return [1];
  } else {
    generateEvent('Address is not valid');
    return [0];
  }
}

export function test_set_keys(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const keys = args.nextBytes().expect("Keys argument missing");
  Storage.set(keys, args.nextBytes().expect("Value argument missing")); 
  return keys; 
}

export function test_get_keys(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = getKeys(args.nextBytes().expect("Keys argument missing"));
  generateEvent(`Keys: ${res}`);
  return [res.length as u8];
}

export function test_get_keys_of(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  let res = getKeysOf(
      args.nextString().expect("Address argument missing"),
      args.nextBytes().expect("Keys argument missing"));
  generateEvent(`Keys: ${res}`);
  return [res.length as u8];
}
