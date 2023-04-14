import { stringToBytes, Args} from '@massalabs/as-types';
import { test_address_validation, test_set_keys, test_get_keys, test_get_keys_of } from '../contracts/main';

describe('Group test', () => {
  test('Testing event', () => {
    expect(test_address_validation(
      new Args().add("AU1MYs6iZvrzg4QDsLpZVzJujwPcGA3SsYEtPGqCBWSgeQAJsYh6").serialize()
    )).toStrictEqual([1]);
    expect(test_address_validation(
      new Args().add("BU1MYs6iZvrzg4QDsLpZVzJujwPcGA3SsYEtPGqCBWSgeQAJsYh6EA").serialize()
    )).toStrictEqual([0]);
    expect(test_set_keys(
      new Args().add(stringToBytes("toto")).add(stringToBytes("vovo")).serialize()
    )).toStrictEqual(stringToBytes("toto"))
    expect(test_set_keys(
      new Args().add(stringToBytes("titi")).add(stringToBytes("vivi")).serialize()
    )).toStrictEqual(stringToBytes("titi"))
    expect(test_get_keys(
      new Args().add(stringToBytes("to")).serialize()
    )).toStrictEqual([1])
    expect(test_get_keys(
      new Args().add(stringToBytes("ti")).serialize()
    )).toStrictEqual([1])
    expect(test_get_keys_of(
      new Args().add("AU1MYs6iZvrzg4QDsLpZVzJujwPcGA3SsYEtPGqCBWSgeQAJsYh6").add(stringToBytes("a")).serialize()
    )).toStrictEqual([0])
  });
});
