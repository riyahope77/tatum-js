import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumEthSDK } from './eth.sdk'

describe('TatumEthSDK', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Web3', () => {
      describe('Get client', () => {
        const provider = TEST_DATA.ETH?.PROVIDER

        it('should return valid web3 client', async () => {
          const client = await sdk.httpDriver({
            jsonrpc: '2.0',
            method: 'web3_clientVersion',
            params: [],
            id: 2,
          })

          expect(client.result).toBeDefined()
          expect(String(client.result).length).toBeGreaterThan(0)
        })

        it('should return valid web3 client with privateKey', async () => {
          const web3 = evmBasedWeb3({ blockchain: Blockchain.ETH })
          const client = web3.getClient(provider, TEST_DATA.ETH.TESTNET.ERC_721!.PRIVATE_KEY)

          expect(client).toBeDefined()
        })
      })

      describe('Get gas price in wei', () => {
        it('should return gas price', async () => {
          const gasPrice = await sdk.getGasPriceInWei()

          expect(gasPrice).toBeDefined()
          expect(parseInt(gasPrice)).toBeGreaterThan(0)
        })
      })
    })
  })
})
