
const axios = require('axios')

import { findOrCreate } from './onchain'

const getMetadata = async (video_id) => {
  const video_url: string = `https://www.youtube.com/watch?v=${video_id}`;
  const requestUrl: string = `https://youtube.com/oembed?url=${video_url}&format=json`;
  const result = await axios.get(requestUrl);
  return Object.assign(result.data, {
    video_url,
    video_id
  });
};

export async function postYoutubeVideoOnchain(video_id: string) {

  const result = await getMetadata(video_id)

  console.log(result)

  const [record, isNew] = await findOrCreate({
    where: {
      app: 'powstream.com',
      type: 'youtube_video_metadata',
      content: {
        video_id
      }
    },
    defaults: {
      app: 'powstream.com',
      key: 'youtube_video_metadata',
      val: result
    }
  })

  return [record, isNew]

}

