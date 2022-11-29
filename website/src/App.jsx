import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';

import { SnackbarProvider } from 'notistack'

import toast, { Toaster } from 'react-hot-toast';

const App = () => (
  <BrowserRouter>
    <SnackbarProvider />
    <Box sx={{ backgroundColor: '#000' }}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;