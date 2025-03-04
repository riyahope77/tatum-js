/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ChainTransferBscBep20 = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC';
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The blockchain address of the fungible tokens
     */
    contractAddress: string;
    /**
     * The amount of the fungible tokens to be sent
     */
    amount: string;
    /**
     * The number of decimal places that the fungible tokens have; to find out how many decimal places are used in the fungible tokens, check out the <a href="https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress" target="_blank">smart contract</a>
     */
    digits: number;
    /**
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
