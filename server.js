const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
let visitorCount = 0;

app.use(cors({
  origin: '*',
}));

const clientId = "SliOUwwJyx40KDhySwCf";
const clientSecret = "r1Z3AkEecz";
const apiUrl = "https://openapi.naver.com/v1/search/shop.json";

// 키워드 검색 엔드포인트
app.get('/search/:keyword/:start', async (req, res) => {
  const { keyword, start } = req.params;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      params: {
        query: keyword,
        start: start,
        display: 100,
      },
    });
    
    res.json(response.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

// 순위 검색 엔드포인트
app.get('/rank/:keyword/:storeName/:start', async (req, res) => {
  const { keyword, storeName, start } = req.params;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      params: {
        query: keyword,
        store: storeName,
        start: start,
        display: 100,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

// 순위 추적 엔드포인트
app.get('/tracking/:keyword/:start', async (req, res) => {
  const { keyword, start } = req.params;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      params: {
        query: keyword,
        start: start,
        display: 100,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

// 방문자 수
app.get('/visit', (req, res) => {
  visitorCount++;
  res.send({ visitorCount });
});

app.listen(3000, () => console.log('Server Open'));
