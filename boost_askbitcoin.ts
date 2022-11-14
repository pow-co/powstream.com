
import { boostpow } from 'stag-wallet'

import { Miner } from 'boostminer'

import delay from 'delay'

async function run() {

  while (true) {

    try {

      const result = await boostpow({
        content: '98fdda9decf409698a39e7118866bab976c93b21f00df81321b755669365d457',
        difficulty: 0.10,
        satoshis: 10000
      })

      console.log({ result })

      await delay(2000)

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
