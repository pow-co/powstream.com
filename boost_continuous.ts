
import { boostpow } from 'stag-wallet'

import { Miner } from 'boostminer'

import delay from 'delay'

async function run() {

  while (true) {

    try {

      const result = await boostpow({
        content: '62acd43fd07cc382f69c20e2de6485d5eca9759d916563e4518d29303337b8f8',
        difficulty: 0.01,
        satoshis: 100000
      })

      console.log({ result })

      await delay(2500)

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
