import {
  commonTestFactory,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  TestCasesApiCallMapping,
} from '@tatumio/shared-testing-common'
import { TatumSolanaSDK } from '../solana.sdk'
import * as apiClient from '@tatumio/api-client'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('SolanaSDK - blockchain', () => {
  const sdk = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const blockchain = sdk.blockchain
  const api = mockedApi.blockchain.solana
  const testData = TEST_DATA.SOLANA

  const blockchainFunctionsMapping: TestCasesApiCallMapping<typeof blockchain> = {
    getCurrentBlock: [api.solanaGetCurrentBlock, {}],
    getBlock: [api.solanaGetBlock, testData.BLOCK_HEIGHT],
    getAccountBalance: [api.solanaGetBalance, testData.ADDRESS],
    getTransaction: [api.solanaGetTransaction, testData.TX_HASH],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(blockchain, blockchainFunctionsMapping)
  })
})
