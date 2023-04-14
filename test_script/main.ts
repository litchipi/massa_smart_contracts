import {
    ClientFactory,
    Client,
    DefaultProviderUrls,
    IAccount,
    fromMAS,
    ICallData,
    Args,
    IOperationData,
    EOperationStatus,
    EventPoller,
    IEventFilter,
} from "@massalabs/massa-web3";

const addr: string = "AU1MYs6iZvrzg4QDsLpZVzJujwPcGA3SsYEtPGqCBWSgeQAJsYh6";
const false_addr: string = "BU1MYs6iZvrzg4QDsLpZVzJujwPcGA3SsYEtPGqCBWSgeQAJsYh6E";

// create a base account for signing transactions
const baseAccount = {
    address: addr,
    secretKey: "S12u2RMR5UQ9SrAB3rF7G52nzSBx9Akb8PkAQhnWPhkAo5UvKi9J",
    publicKey: "P12ZNYLippvu32S9wtVECQqQh6UFXCjNc33sWYaLSu9XpTgAW52u",
} as IAccount;

// initialize a testnet client
const web3Client: Client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    true,
    baseAccount
);

const SCAddr : string = "AS12mNqSLbra6nJg8tZSQZgdkSy4P9HYtVgcRgN9S46n5qA2T5ueo";

async function callSC(func_name: string, args: Args) {
    console.log(func_name);
    const op_id: string = await web3Client.smartContracts().callSmartContract(
        {
            fee: fromMAS("0.1"),
            maxGas: fromMAS("1"),
            coins: fromMAS("0.1"),
            targetAddress: SCAddr,
            functionName: func_name,
            parameter: args.serialize(),
        } as ICallData,
        baseAccount
    );
    console.log("operation id: ", op_id);
    await web3Client
      .smartContracts()
      .awaitRequiredOperationStatus(op_id, EOperationStatus.FINAL);
    console.log('Operation is final, getting events ...');
    const events = await EventPoller.getEventsOnce(
      {
        start: null,
        end: null,
        original_operation_id: op_id,
        original_caller_address: null,
        emitter_address: null,
      } as IEventFilter,
      web3Client,
    );
    console.log('events: ', events);
    console.log("\n====\n");
}

await callSC("test_address_validation", new Args().addString(addr));
await callSC("test_address_validation", new Args().addString(false_addr));
await callSC("test_set_keys", new Args().addUint8Array(new Uint8Array([3, 2, 1])).addUint8Array(new Uint8Array([1, 2, 3])));
await callSC("test_get_keys", new Args().addUint8Array(new Uint8Array([3, 2])));
await callSC("test_get_keys_of", new Args().addString(SCAddr).addUint8Array(new Uint8Array([3, 2])));
