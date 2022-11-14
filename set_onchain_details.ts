
require('dotenv').config()

import { findOrCreate } from './src/onchain'

async function run() {

  const tokenResult = await findOrCreate({
    where: {
      app: 'midasvalley.net',
      type: 'set_token'
    },
    defaults: {
      app: 'midasvalley.net',
      key: 'set_token',
      val: {
        origin: '12ead3a1ee6019751ed8be45d9c54e97b5d76c7ca8fbd253c318903290857fd4_o2',
        type: 'run'
      }
    }
  })

  console.log(tokenResult)

  const domainResult = await findOrCreate({
    where: {
      app: 'midasvalley.net',
      type: 'set_domain'
    },
    defaults: {
      app: 'midasvalley.net',
      key: 'set_domain',
      val: {
        origin: 'powstream.com'
      }
    }
  })

  console.log(domainResult)

  const revenueAddressResult = await findOrCreate({
    where: {
      app: 'midasvalley.net',
      type: 'set_revenue_address',
      content: {
        address: '17wgreobple1qjn2ugbuwlwekae4y4ujja'
      }
    },
    defaults: {
      app: 'midasvalley.net',
      key: 'set_revenue_address',
      val: {
        address: '17wgreobple1qjn2ugbuwlwekae4y4ujja',
        minimum_amount: {
          value: 1,
          currency: 'USD'
        }
      }
    }
  })

  console.log(revenueAddressResult)

  const logoResult = await findOrCreate({
    where: {
      app: 'midasvalley.net',
      type: 'set_logo'
    },
    defaults: {
      app: 'midasvalley.net',
      key: 'set_logo',
      val: {
        url: 'https://bitcoinfileserver.com/12ead3a1ee6019751ed8be45d9c54e97b5d76c7ca8fbd253c318903290857fd4',
        txid: '12ead3a1ee6019751ed8be45d9c54e97b5d76c7ca8fbd253c318903290857fd4_o1'
      }
    }
  })

  console.log(logoResult)

}

run()

