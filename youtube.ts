
import { postYoutubeVideoOnchain } from './src/youtube'

const video_id = 'dQw4w9WgXcQ'
//const video_id = 'dQw4w9WgXcQ'

postYoutubeVideoOnchain(video_id).then(console.log).catch(console.error)

