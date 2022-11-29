import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import axios from "axios";

import moment from 'moment'

import { wrapRelayx } from 'stag-relayx'

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recent");
  const [videos, setVideos] = useState(null);
  
  // @ts-ignore
  const stag = wrapRelayx(window.relayone)

  async function buyBoost() {

    const result = await stag.boost.buy({
      content: '1e8b1b7a374112ba274b8122ef3b8b7b8a168e0afe47d4c5c08ef5bca0e98b64',
      difficulty: 2.18,
      value: 100_000
    })

    return result

  }

  useEffect(() => {

    //buyBoost().then(result => console.log("bought boost", result)).catch(console.error)

  }, [])

  useEffect(() => {
    setVideos(null);

    if (selectedCategory.toLowerCase()=== 'recent') {

      (async () => {

        const date = moment().subtract(1, 'week')

        const timestamp = date.unix() * 1000

        console.log('TIMESTAMP', timestamp)

        const { data: boostedWeek } = await axios.get(`https://onchain.sv/api/v1/boostpow/rankings?app=powstream.com&type=youtube_video_metadata&start_date=${timestamp}`)

        const vids = boostedWeek.rankings.slice(0, 12).map(event => {
  
          return event
        })

        const [week, day, remaining] = await Promise.all([
          axios.get(`https://onchain.sv/api/v1/boostpow/rankings?app=powstream.com&type=youtube_video_metadata&start_date=${timestamp}`)
        ])

        const { data } = await axios.get('https://onchain.sv/api/v1/events?app=powstream.com&type=youtube_video_metadata')
  
        data.events.map(event => {

          vids.push(event)
        })
    
        setVideos(vids.map(({txid, content: video, difficulty}) => {
          const result = {
            videoId: video.video_id,
            thumbnails: [{
              url: video.thumbnail_url
            }],
            author: {
              channelTitle: video.author_name,
              channelId: video.author_url
            },
            title: video.title,
            difficulty,
            txid
          }
          return result
        }))
  
      })()


    } else if (selectedCategory.toLowerCase() === 'boosted') {

      (async () => {

        const { data } = await axios.get('https://onchain.sv/api/v1/boostpow/rankings?app=powstream.com&type=youtube_video_metadata')
  
        const vids = data.rankings.map(event => {
  
          return Object.assign(event.content, { difficulty: event.difficulty })
        })
    
        setVideos(vids.map(video => {
          const result = {
            videoId: video.video_id,
            thumbnails: [{
              url: video.thumbnail_url
            }],
            author: {
              channelTitle: video.author_name,
              channelId: video.author_url
            },
            title: video.title,
            difficulty: video.difficulty
          }
          console.log('RZ', result)
          return result
        }))
  
      })()
      
    } else {

      fetchFromAPI(`search/`, {
        q: selectedCategory,
        hl: 'en',
        gl: 'US'
      }).then((data) => {
        const videos = data.contents.map(({video}) => video)
  
        setVideos(videos)
      })

    }

    }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;