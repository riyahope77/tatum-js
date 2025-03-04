/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAdaKeyPair = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send assets to.
     */
    address: string;
    /**
     * Amount to be withdrawn to blockchain.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Fee to be submitted as a transaction fee to blockchain. If none is set, default value of 0.5 ADA is used.
     */
    fee?: string;
    /**
     * Array of assigned blockchain addresses with their private keys.
     * Either mnemonic, keyPair or signature Id must be present - depends on the type of account and xpub.
     * Tatum KMS does not support keyPair type of off-chain transaction, only mnemonic based.
     *
     */
    keyPair: Array<{
        /**
         * Blockchain address assigned to account withdrawal is made from.
         */
        address?: string;
        /**
         * Private key of blockchain address.
         */
        privateKey?: string;
    }>;
    /**
     * Used to parametrize withdrawal as a change address for left coins from transaction.
     */
    attr: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note visible to owner of withdrawing account
     */
    senderNote?: string;
}
