import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumEthSDK } from '../eth.sdk'
import * as apiClient from '@tatumio/api-client'
import { BlockchainUtilsService, CallSmartContractMethod, EthEstimateGas } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('EthSDK - blockchain', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.eth
  const testData = TEST_DATA.ETH

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.ethBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.ethGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.ethGetCurrentBlock, {}],
    getBlock: [api.ethGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.ethGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.ethGetTransaction, testData.TX_HASH],
    smartContractGetAddress: [BlockchainUtilsService.scGetContractAddress, 'BSC', testData.TX_HASH],
    getAccountTransactions: [api.ethGetTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    getInternalTransaction: [api.ethGetInternalTransactionByAddress, testData.TESTNET.ADDRESS_0, 50],
    estimateGas: [
      blockchain.estimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as EthEstimateGas,
    ],
    estimateGasBatch: [
      blockchain.estimateGasBatch,
      {
        estimations: [
          {
            from: testData.TESTNET.ADDRESS_0,
            to: testData.TESTNET.ADDRESS_100,
            contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
            amount: '10',
          } as EthEstimateGas,
        ],
      },
    ],
    smartContractInvocation: [
      api.ethBlockchainSmartContractInvocation,
      {
        contractAddress: testData.TESTNET.ERC_20.CONTRACT_ADDRESS,
        methodName: 'transfer',
        methodABI: {
          inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'stake',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        params: ['0x632'],
        amount: '100000',
        fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
        nonce: 0,
        fee: { gasLimit: '40000', gasPrice: '20' },
      } as CallSmartContractMethod,
    ],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
