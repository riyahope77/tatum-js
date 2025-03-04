/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BscTxLog = {
    /**
     * From which this event originated from.
     */
    address?: string;
    /**
     * An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
     */
    topics?: Array<string>;
    /**
     * The data containing non-indexed log parameter.
     */
    data?: string;
    /**
     * Integer of the event index position in the block.
     */
    logIndex?: number;
    /**
     * Block number where this transaction was in.
     */
    blockNumber?: number;
    /**
     * Hash of the block.
     */
    blockHash?: string;
    /**
     * Integer of the transaction’s index position, the event was created in.
     */
    transactionIndex?: number;
    /**
     * Hash of the transaction this event was created in.
     */
    transactionHash?: string;
}
