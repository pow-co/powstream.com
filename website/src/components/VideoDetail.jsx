import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import axios from 'axios'

import delay from 'delay'
import { ReplayOutlined } from "@mui/icons-material";


const handleBoost = async ({ txid, setMessage }) => {

  const value = 0.05;
  const currency = 'USD';

  const url = `https://askbitcoin.ai/api/v1/boostpow/${txid}/new?value=${value}&currency=${currency}`;

  console.log('boostpow.job.build', { url });

  let { data } = await axios.get(url);

  console.log('boostpow.payment_request', data);

  const script = new bsv.Script(data.outputs[0].script);

  const amount = data.outputs[0].amount / 100000000;

  const { data: result } = await axios.get(`https://onchain.sv/api/v1/events?app=midasvalley.net&author=1KhvUBTJsZPGJnvZPxRPQctB2dBtCMsUHA&type=set_revenue_address&domain=powstream.com`)

  const { events: [{ content: { address } }] } = result

  const { data: { conversion: { output: { value: feeInBSV }}}} = await axios.get('https://api.anypayx.com/convert/0.0218-USD/to-BSV')

  try {
    const send = {
      outputs: [{
        opReturn: [
          'onchain',
          '18pPQigu7j69ioDcUG9dACE1iAN9nCfowr',
          'job',
          JSON.stringify({
            index: 0
          })
        ],
        amount,
        to: script.toASM(),
        currency: 'BSV'
      }, {
        to: address, // https://midasvalley.net/domains/powstream.com/revenue
        amount: feeInBSV,
        currency: 'BSV'
      }]
    }

    setMessage('Sending boostpow job order with relayx')

    console.log('relayx.send.params', send);

    const result = await relayone.send(send);

    setMessage('Success! boostpow job order purchased')

    console.log('relayx.send.result', result);

    console.log('RESULT', result);

    const { txid } = result;

    console.log('TXID', txid);

    // Post the new boostpow job transaction to the indexer API at pow.co
    axios
      .get(`https://pow.co/api/v1/boost/jobs/${txid}`)
      .then(({ data }) => {
        console.log(`pow.co/api/v1/jobs/${result.txid}.result`, data);
       })
      .catch((error) => {
        console.error(`pow.co/api/v1/jobs/${result.txid}`, error);
      });

      await delay(2000)

    setMessage(null)

    console.log('relay.quote', result);

  } catch (error) {

    console.error('relayx', error);

  }
};

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  const [boostingMessage, setBoostingMessage] = useState()

  const [txid, setTxid] = useState(null)

  const [data, setData] = useState(null)



  //const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    fetchFromAPI(`video/details/`, {
      id, hl: 'en', gl: 'US'
    })
    .then((data) => {
      console.log('VIDEO DETAILS', data)
      setVideoDetail(data)
    })

    //fetchFromAPI(`search/?part=snippet&relatedToVideoId=${id}&type=video`)
    fetchFromAPI(`video/related-contents/`, {
      id, hl: 'en', gl: 'US'
    })
    .then((data) => {

      console.log('related videos search result', data)
      setVideos(data.contents.map(({video}) => {

        video.author = Object.assign(video.author, {
          channelTitle: video.author.title
        })

        return video
      }))
    })

    axios.get(`https://powstream.com/api/v1/youtube/videos/${id}`).then(() => {
      return axios.get(`https://powstream.com/api/v1/youtube/videos/${id}`)
    })
    .then(({data}) => {

      setTxid(data[0].txid)

      setData(data[0])

      //enqueueSnackbar(`Boosting ${data[0].content.title} for $0.05`)
    })
    
  }, [id]);

  if(!videoDetail) return <Loader />;

  const views = videoDetail.stats?.views?.toLocaleString()

  const likes = videoDetail.stats?.likes?.toLocaleString()

  const { title, channelId, channelTitle } = videoDetail;

  function handleClickTxid(event) {
    event.preventDefault()
    event.stopPropagation()

    setBoostingMessage(`Boosting ${data.content.title} for $0.05 .....`)

    console.log('handle click txid', { txid })

    relayone.authBeta().then(token => {

      console.log('relayone.auth', token)

      const json = JSON.parse(atob(token.split('.')[0]));
      localStorage.setItem('auth.type', 'relayx');
      localStorage.setItem('relayx.token', token);
      localStorage.setItem('relayx.auth', JSON.stringify(json));
      localStorage.setItem('relayx.paymail', json.paymail);
      localStorage.setItem('relayx.pubkey', json.pubkey);
      localStorage.setItem('relayx.origin', json.origin);
      localStorage.setItem('relayx.issued_at', json.issued_at);

      handleBoost({ txid, setMessage: setBoostingMessage })

    })
    .catch(async (error) => {

      console.error('error', error)

      setBoostingMessage(`error boosting your video: ${error.message}`)

      await delay(2000)

      setBoostingMessage(null)

    })

  }

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${videoDetail.author.channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {videoDetail.author.title}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              {txid && !boostingMessage && (
                <Link to={`/channel/${channelId}`} onClick={handleClickTxid}>
                  <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                    {txid}
                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                  </Typography>
                </Link>
              )}
              {txid && boostingMessage && (
                  <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                    {boostingMessage}
                  </Typography>
              )}

              <Stack direction="row" gap="20px" alignItems="center">
                {views && (
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {videoDetail.stats?.views?.toLocaleString()} views
                  </Typography>
                )}

                {likes && (
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {videoDetail.stats?.likes?.toLocaleString()} likes
                  </Typography>
                )}

              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;