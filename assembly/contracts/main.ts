// The entry file of your WebAssembly module.
import { callerHasWriteAccess, generateEvent } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

export function hello_world(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const name = new Args(binaryArgs)
    .nextString()
    .expect('Name argument is missing or invalid');
  generateEvent(`Hello world! ${name}`);
  return [];
}
