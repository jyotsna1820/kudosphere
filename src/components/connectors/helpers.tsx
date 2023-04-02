import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import * as keys from "../../../.vscode/keys.json";

const process = {env:
{
  INFURA_KEY: "a1b2c3d4e5f6g7h8i9j0",
}}

export const CoinbaseWallet = new WalletLinkConnector({
 url: `https://mainnet.infura.io/v3/${keys.INFURA_KEY}`,
 appName: "Web3-react Demo",
 supportedChainIds: [1, 3, 4, 5, 42],
});

export const WalletConnect = new WalletConnectConnector({
  //@ts-ignore
 rpcUrl: `https://mainnet.infura.io/v3/${keys.INFURA_KEY}`,
 bridge: "https://bridge.walletconnect.org",
 qrcode: true,
});

export const Injected = new InjectedConnector({
 supportedChainIds: [1, 3, 4, 5, 42]
});