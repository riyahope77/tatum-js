import { Blockchain } from '@tatumio/shared-core'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk, abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import {
  AlgorandService,
  ApiServices,
  BlockchainUtilsService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { algoWeb } from './services/algo.web'
import { algoWallet } from './services/algo.wallet'
import { algoTxService } from './services/algo.tx'
import type { AlgoApiCallsType } from './services/algo.types'

const blockchain = Blockchain.ALGO

export const TatumAlgoSDK = (
  args: SDKArguments,
  apiCalls: AlgoApiCallsType = {
    getBlockchainAccountBalance: ApiServices.blockchain.algo.algorandGetBalance,
  },
) => {
  const web = algoWeb(args)
  const txService = algoTxService({ algoWeb: web }, apiCalls)
  const abstractSdk = abstractBlockchainSdk({ ...args, blockchain })
  const { nft, storage } = abstractSdkNft()

  const { getNFTAccountBalance, getNFTContractAddress } = nft

  return {
    ...abstractSdk,
    algoWeb: web,
    wallet: algoWallet(),
    transaction: txService.native,
    token: {
      receiveAsset: txService.asset.send.receive,
      fungible: {
        ...txService.fungible,
        getFTTransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
        getFTAccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
        getFTAccountBalances: FungibleTokensErc20OrCompatibleService.erc20GetBalanceAddress,
      },
      nft: {
        ...txService.nft,
        getNFTAccountBalance,
        getNFTContractAddress,
      },
      storage,
    },
    blockchain: {
      broadcast: AlgorandService.algorandBroadcast,
      getBlock: AlgorandService.algorandGetBlock,
      getCurrentBlock: AlgorandService.algorandGetCurrentBlock,
      getBlockchainAccountBalance: AlgorandService.algorandGetBalance,
      getTransaction: AlgorandService.algorandGetTransaction,
      getPayTransactionByFromTo: AlgorandService.algorandGetPayTransactionsByFromTo,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
    virtualAccount: {
      ...abstractBlockchainVirtualAccount({ blockchain }),
      ...txService.virtualAccount,
    },
    node: {
      indexerGetDriver: AlgorandService.algoNodeIndexerGetDriver,
      getDriver: AlgorandService.algoNodeGetDriver,
      postDriver: AlgorandService.algoNodePostDriver,
    },
  }
}
