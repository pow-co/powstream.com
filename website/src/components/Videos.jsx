import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return <Loader />;

  videos = videos.filter(video => !!video)
  
  return (
    <Box sx={{ borderColor: 'secondary.main' }}>

    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="center" alignItems="start" gap={3}>
      {videos.map((item, idx) => {

        return <Box key={idx}>
          {item.videoId && <VideoCard video={item} /> }
        </Box>
      })}
    </Stack>
    </Box>
  );
}

export default Videos;