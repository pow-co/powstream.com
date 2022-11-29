import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	demoThumbnailUrl,
	demoVideoUrl,
	demoVideoTitle,
	demoChannelUrl,
	demoChannelTitle,
} from '../../utils/constants';
import './VideoCard.scss';

import toast from 'react-hot-toast';

//import BoostpowButton from 'boostpow-button'
import BoostpowButton from '/Users/zyler/github/pow-co/boostpow-button'

const VideoCard = ({ video }) => {

	const { videoId, author, difficulty } = video

	async function onBoostpowClick(boostpowPromise) {

		console.log('boostpow clicked', boostpowPromise)

		toast.promise(boostpowPromise, {
			loading: 'Boosting Video with $0.05 of Energy',
			success: 'Boost Proof of Work Ordered',
			error: 'Error Ordering Boost',
		})
	}

	function onBoostpowSuccess(result) {

		console.log('boostpow success', result)

		//toast.success('Boost Proof of Work Ordered')
	}

	function onBoostpowError(error) {

		toast.error('Error Ordering Boost Proof of Work')

		
	}

	return <Card
		sx={{
			width: { xs: '100%', sm: '358px', md: '358px' },
			boxShadow: 'none',
			borderRadius: '10px',
			overflow: 'hidden',
		}}
		className='videoCardContainer'
	>
		<Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
			<CardMedia
				image={video.thumbnails[0]?.url || demoThumbnailUrl}
				alt={video.title}
				sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
			/>
		</Link>
		<CardContent sx={{ backgroundColor: '#1E1E1E', height: '106px' }}>

		{video.txid && (
				<Box sx={{float: 'right'}}>
					<BoostpowButton
						onClick={onBoostpowClick}
						onSuccess={onBoostpowSuccess}
						onError={onBoostpowError}
						currency={'USD'}
						value={0.05}
						content={video.txid}
					/>
				</Box>
			)}
			<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
				<Typography variant='subtitle1' fontWeight='bold' color='#FFF'>
					{video.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
				</Typography>
			</Link>
			<Link to={author?.channelId ? `/channel/${author?.channelId}` : demoChannelUrl}>
				<Typography variant='subtitle2' color='gray'>
					{author?.channelTitle || demoChannelTitle}
					<CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
					{difficulty && (
						
						<span>
							<br/>
							<i>
								{difficulty} Difficulty
							</i>
						</span>
					)}

				</Typography>
			</Link>


		</CardContent>
	</Card>
};

export default VideoCard;
