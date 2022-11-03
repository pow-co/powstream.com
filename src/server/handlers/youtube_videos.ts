
import { postYoutubeVideoOnchain } from '../../youtube'

import { log } from '../../log'

import { badRequest } from 'boom'

export async function show(req, h) {

    try {

        const { video_id } = req.params

        log.info('youtube.video.post.onchain.result', { video_id })

        const result = await postYoutubeVideoOnchain(video_id)

        log.info('youtube.video.post.onchain.result', result)

        return result

    } catch(error) {

        log.error('youtube.video.post.onchain.error', error)

        return badRequest(error)

    }

}

export async function index(req, h) {

}