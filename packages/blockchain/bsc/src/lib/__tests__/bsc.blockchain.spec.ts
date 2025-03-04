import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '../bsc.sdk'
import * as apiClient from '@tatumio/api-client'
import { BscEstimateGas, CallSmartContractMethod } from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('BscSDK - blockchain', () => {
  const sdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.bsc
  const testData = TEST_DATA.BSC

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    broadcast: [api.bscBroadcast, { txData: 'hello' }],
    getTransactionsCount: [api.bscGetTransactionCount, testData.TESTNET.ADDRESS_0],
    getCurrentBlock: [api.bscGetCurrentBlock, {}],
    getBlock: [api.bscGetBlock, testData.BLOCK_HASH],
    getBlockchainAccountBalance: [api.bscGetBalance, testData.TESTNET.ADDRESS_0],
    getTransaction: [api.bscGetTransaction, testData.TX_HASH],
    estimateGas: [
      blockchain.estimateGas,
      {
        from: testData.TESTNET.ADDRESS_0,
        to: testData.TESTNET.ADDRESS_100,
        contractAddress: testData.TESTNET.SMART_CONTRACT.CONTRACT_ADDRESS,
        amount: '10',
      } as BscEstimateGas,
    ],
    smartContractInvocation: [
      api.bscBlockchainSmartContractInvocation,
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
    smartContractGetAddress: [blockchain.smartContractGetAddress, 'BSC', testData.TX_HASH],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
