import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  FungibleTokensErc20OrCompatibleService,
  KuCoinService,
} from '@tatumio/api-client'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { kcsWeb3 } from './services/kcs.web3'
import { kcsKmsService } from './services/kcs.kms'
import { kcsTxService } from './services/kcs.tx'
import { virtualAccountService } from './services/kcs.virtualAccount'

const blockchain = Blockchain.KCS

export const TatumKcsSDK = (args: SDKArguments) => {
  const web3 = kcsWeb3({ blockchain })
  const api = KuCoinService
  const txService = kcsTxService({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

  return {
    ...evmSdk,
    kms: kcsKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
    },
    nft: {
      ...txService.erc721,
      ...nft,
    },
    storage,
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    // TODO: marketplace and auctions not surpported yet
    // marketplace: {
    //   ...evmBasedMarketplace({
    //     blockchain,
    //     web3,
    //     broadcastFunction: KuCoinService.kcsBroadcast,
    //   }),
    //   auction: kcsAuctionService({ blockchain, web3 }),
    // },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.kcsWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: KuCoinService.kcsBroadcast,
      getTransactionsCount: KuCoinService.kcsGetTransactionCount,
      getCurrentBlock: KuCoinService.kcsGetCurrentBlock,
      getBlock: KuCoinService.kcsGetBlock,
      getBlockchainAccountBalance: KuCoinService.kcsGetBalance,
      getTransaction: KuCoinService.kcsGetTransaction,
      estimateGas: BlockchainFeesService.kcsEstimateGas,
      smartContractInvocation: KuCoinService.kcsBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
    virtualAccount,
  }
}
