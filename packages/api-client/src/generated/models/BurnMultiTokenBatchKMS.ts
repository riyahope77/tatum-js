/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnMultiTokenBatchKMS = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'ONE' | 'MATIC' | 'KCS' | 'KLAY' | 'BSC';
    /**
     * Address of holder
     */
    account: string;
    /**
     * The IDs of the Multi Tokens to be destroyed.
     */
    tokenId: Array<string>;
    /**
     * The amounts of the Multi Tokens to be destroyed.
     */
    amounts: Array<string>;
    /**
     * The address of the Multi Token smart contract
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}
