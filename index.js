const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];

function updateWatchedStatusById(watchList, videoId, watched) {
  watchList.forEach((ele) => {
    if (ele.videoId === videoId) {
      ele.watched = watched;
    }
  });
}

function updateAllVideosWatchedStatus(watchList, watched) {
  watchList.forEach((ele) => {
    ele.watched = watched;
  });
}

function deleteVideoById(watchList, videoId) {
  let result = watchList.filter((ele) => ele.videoId != videoId);
  return result;
}

function deleteWatchedVideos(watchList) {
  let result = watchList.filter((ele) => ele.watched === true);
  return result;
}

app.get('/watchlist/update', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === 'true';
  updateWatchedStatusById(watchList, videoId, watched);
  res.json(watchList);
});

app.get('/watchlist/update-all', (req, res) => {
  let watched = req.query.watched === 'true';
  updateAllVideosWatchedStatus(watchList, watched);
  res.json(watchList);
});

app.get('/watchlist/delete', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let result = deleteVideoById(watchList, videoId);
  res.json(result);
});

app.get('/watchlist/delete-watch', (req, res) => {
  let result = deleteWatchedVideos(watchList);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
