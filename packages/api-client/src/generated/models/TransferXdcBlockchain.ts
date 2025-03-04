/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXdcBlockchain = {
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Currency of the transfer. ERC20 tokens are available only for mainnet use.
     */
    currency: 'XDC';
    /**
     * Nonce to be set to XDC transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
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
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
