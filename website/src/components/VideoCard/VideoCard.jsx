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
import { BoostButton } from "myboostpow-lib"

const VideoCard = ({ video }) => {

	const { videoId, author, difficulty } = video

	const handleBoostLoading = () => {
        toast('Publishing Your Boost Job to the Network', {
            icon: '⛏️',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
          });
      };
    
      const handleBoostSuccess = () => {
        toast('Success!', {
            icon: '✅',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
          });
      };
    
      const handleBoostError = () => {
        toast('Error!', {
            icon: '🐛',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
        });
      };

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
					<BoostButton 
						content={video.txid}
						difficulty={difficulty}
						theme="dark"
						showDifficulty={false}
						onSending={handleBoostLoading}
						onError={handleBoostError}
						onSuccess={handleBoostSuccess}
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
