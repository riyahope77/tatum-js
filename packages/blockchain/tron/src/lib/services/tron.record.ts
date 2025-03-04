import { BlockchainStorageService, CancelablePromise } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'

export const tronRecord = () => {
  return {
    /**
     * Get log record
     * <h4>1 credit per API call.</h4><br/><p>Gets log data from blockchain.</p>
     * @param chain The blockchain to get the log record from
     * @param id ID of the log record / transaction on the blockchain
     * @returns any OK
     * @throws ApiError
     */
    getLog(id: string): CancelablePromise<{
      /**
       * Data stored in the record.
       */
      data: string
    }> {
      // TODO: Open API bug
      // @ts-ignore
      return BlockchainStorageService.getLog(Blockchain.TRON, id)
    },
  }
}
