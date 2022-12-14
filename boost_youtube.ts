
import { boostpow } from 'stag-wallet'

import { Miner } from 'boostminer'

import delay from 'delay'

async function run() {

  while (true) {

    try {

      const result = await boostpow({
        content: '40016a773534c48ace5abc87158256f2e2bb13f0dc2b7ae22d76e0d964042396',
        difficulty: 0.01,
        satoshis: 1000
      })

      console.log({ result })

      await delay(15_000)

      const miner = new Miner({

        privatekey: process.env.stag_private_key

      })

      const miningResult = await miner.workJob(result.txid)

      console.log({ miningResult })

    } catch(error) {

      console.error('error', error)

    }

  }

}

run()
