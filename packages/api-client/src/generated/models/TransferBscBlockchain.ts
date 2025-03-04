/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferBscBlockchain = {
    /**
     * (Only for BSC transactions) Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Nonce to be set to BSC transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from BSC Blockchain Account. BEP20 tokens like BETH, BBTC, BADA, WBNB, BDOT, BXRP, BLTC, BBCH, CAKE are available only for mainnet use.
     */
    currency: 'BSC' | 'BETH' | 'BBTC' | 'RMD' | 'USDC_BSC' | 'B2U_BSC' | 'BADA' | 'WBNB' | 'GMC_BSC' | 'BDOT' | 'BXRP' | 'BLTC' | 'BBCH' | 'HAG' | 'CAKE' | 'BUSD_BSC';
    fee?: CustomFee;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
