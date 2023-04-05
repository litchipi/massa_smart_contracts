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
  return [];
}

// APIs that calls the function ABI inside the wasm blob

function callValidateAddress(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const address = new Address(
    args.nextString().expect('Address argument is missing or invalid'),
  );

  let res = call(
    address,
    'test_address_validation',
    new Args().add(args.nextString().expect('Name argument is missing')),
    0,
  );

  return res;
}

function callGetKeys(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const address = new Address(
    args.nextString().expect('Address argument is missing or invalid'),
  );

  call(
    address,
    'test_get_keys',
    new Args().add(args.nextBytes().expect("Keys argument missing")),
    0,
  );

  return [];
}

function callGetKeysOf(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const address = new Address(
    args.nextString().expect('Address argument is missing or invalid'),
  );
  call(
    address,
    'test_get_keys_of',
    new Args().add(args.nextBytes().expect("Keys argument missing")).add(args.nextString().expect("Address argument is missing or invalid")),
    0,
  );

  return [];
}
