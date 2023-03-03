import { Address, call, callerHasWriteAccess } from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(args: StaticArray<u8>): StaticArray<u8> {
  if (!callerHasWriteAccess()) {
    return [];
  }
  callHelloContract(args);
  return [];
}

// API that calls the function ABI inside the wasm blob
function callHelloContract(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const address = new Address(
    args.nextString().expect('Address argument is missing or invalid'),
  );

  call(
    address,
    'hello_world',
    new Args().add(args.nextString().expect('Name argument is missing')),
    0,
  );

  return [];
}
