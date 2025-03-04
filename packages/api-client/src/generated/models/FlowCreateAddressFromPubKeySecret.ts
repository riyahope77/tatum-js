/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowCreateAddressFromPubKeySecret = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Public key to be used; will be assigned to a newly created address and will have a weight of 1000
     */
    publicKey: string;
    /**
     * Secret for account. Secret, or signature Id must be present.
     */
    privateKey: string;
    /**
     * Weight of the key. If not set, default 1000 will be used.
     */
    weight?: number;
}
