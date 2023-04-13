import {
    ClientFactory,
    Client,
    DefaultProviderUrls,
    IAccount,
} from "@massalabs/massa-web3";

// create a base account for signing transactions
const baseAccount = {
    address: "AU1MYs6iZvrzg4QDsLpZVzJujwPcGA3SsYEtPGqCBWSgeQAJsYh6",
    secretKey: "S12u2RMR5UQ9SrAB3rF7G52nzSBx9Akb8PkAQhnWPhkAo5UvKi9J",
    publicKey: "P12ZNYLippvu32S9wtVECQqQh6UFXCjNc33sWYaLSu9XpTgAW52u",
} as IAccount;

// initialize a testnet client
const testnetClient: Client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    true,
    baseAccount
);
