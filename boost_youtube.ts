
import { boostpow } from 'stag-wallet'

import { Miner } from 'boostminer'

import delay from 'delay'

async function run() {

  while (true) {

    try {

      const result = await boostpow({
        content: '60cf362a2820655e5b1fe78b414a3508ed6835c4c40a5d6c6d400648fcf085dd',
        difficulty: 0.1,
        satoshis: 1000
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
