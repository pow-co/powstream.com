
import { onchain } from 'stag-wallet'

export async function findOrCreate({where, defaults}: {where: any, defaults: any}) {

  var isNew = false

  var record = await onchain.findOne(where)

  console.log('FIRST FIND RECORD', record)

  if (!record) {

    isNew = true

    const postResult = await onchain.post(defaults)

    console.log('POST RESULT', postResult)
    
    await onchain.findOne(where)
    record = await onchain.findOne(where)

    console.log('SECOND FIND RECORD', record)


  }

  return [record, isNew]

}
