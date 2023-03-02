// The entry file of your WebAssembly module.
import { callerHasWriteAccess, generateEvent } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function hello_world(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  if (!callerHasWriteAccess()) {
    return [];
  }
  const argsDeser = new Args(binaryArgs);
  const name = argsDeser
    .nextString()
    .expect('Name argument is missing or invalid');
  generateEvent(`Hello world! ${name}`);
  return [];
}

export function event(_: StaticArray<u8>): StaticArray<u8> {
  const message = "I'm an event!";
  generateEvent(message);
  return stringToBytes(message);
}
