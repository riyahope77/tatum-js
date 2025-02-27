import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  EthereumService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { ethWeb3 } from './services/eth.web3'
import { ethKmsService } from './services/eth.kms'
import { ethTx } from './services/eth.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { ethAuctionService } from './services/eth.auction'
import { virtualAccountService } from './services/eth.virtualAccount'

const blockchain = Blockchain.ETH

export const TatumEthSDK = (args: SDKArguments) => {
  const web3 = ethWeb3({
    blockchain,
    apiCalls: {
      getFee: BlockchainFeesService.getBlockchainFee,
    },
  })
  const api = EthereumService
  const txService = ethTx({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

  return {
    ...evmSdk,
    kms: ethKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
      getErc20AccountBalances: FungibleTokensErc20OrCompatibleService.erc20GetBalanceAddress,
    },
    nft: {
      ...txService.erc721,
      ...nft,
    },
    storage,
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    gasPump: txService.gasPump,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
      auction: ethAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.ethWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: EthereumService.ethBroadcast,
      getTransactionsCount: EthereumService.ethGetTransactionCount,
      getCurrentBlock: EthereumService.ethGetCurrentBlock,
      getBlock: EthereumService.ethGetBlock,
      getBlockchainAccountBalance: EthereumService.ethGetBalance,
      getTransaction: EthereumService.ethGetTransaction,
      getAccountTransactions: EthereumService.ethGetTransactionByAddress,
      estimateGas: BlockchainFeesService.ethEstimateGas,
      estimateGasBatch: BlockchainFeesService.ethEstimateGasBatch,
      smartContractInvocation: EthereumService.ethBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      getInternalTransaction: EthereumService.ethGetInternalTransactionByAddress,
    },
    virtualAccount,
  }
}
