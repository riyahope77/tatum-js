/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type UpdateCashbackValueForAuthorNft = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'ETH' | 'KCS' | 'KLAY' | 'MATIC' | 'ONE';
    /**
     * The ID of the NFT to update royalty information for
     */
    tokenId: string;
    /**
     * The blockchain address of the NFT to update royalty information for
     */
    contractAddress: string;
    /**
     * The new value of the royalty cashback to be set for the author of the NFT; to disable the royalties for the NFT completely, set this parameter to 0
     */
    cashbackValue: string;
    /**
     * The private key of the NFT author's address
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
