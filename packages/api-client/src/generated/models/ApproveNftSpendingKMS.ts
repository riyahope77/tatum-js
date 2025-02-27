/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ApproveNftSpendingKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE';
    /**
     * The blockchain address of the auction/marketplace smart contract
     */
    spender: string;
    /**
     * Set to "true" if the asset is an NFT; set to "false" is the asset is a Multi Token
     */
    isErc721: boolean;
    /**
     * The ID of the asset (NFT or Multi Token)
     */
    tokenId: string;
    /**
     * The blockchain address of the smart contract from which the asset (NFT or Multi Token) was minted
     */
    contractAddress: string;
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address from which the fee will be deducted that was generated from the mnemonic
     */
    index?: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
