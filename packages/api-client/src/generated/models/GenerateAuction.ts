/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateAuction = {
    /**
     * Blockchain to work with.
     */
    chain: 'ETH' | 'ONE' | 'KLAY' | 'BSC' | 'MATIC';
    /**
     * Address of the recipient of the fee for the trade.
     */
    feeRecipient: string;
    /**
     * Percentage of the selling amount of the NFT asset. 100 - 1%
     */
    auctionFee: number;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
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
