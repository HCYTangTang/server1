const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
}));

const clientId = "SliOUwwJyx40KDhySwCf";
const clientSecret = "r1Z3AkEecz";
const naverSearchApiUrl = "https://openapi.naver.com/v1/search/shop.json";
const customSearchApiUrl = "https://port-0-server1-koh2xlj138h9k.sel4.cloudtype.app/search";

// 키워드 검색 엔드포인트
app.get('/search/keyword/:keyword/:start', async (req, res) => {
  const { keyword, start } = req.params;
  try {
    const response = await axios.get(naverSearchApiUrl, {
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
app.get('/search/rank/:storeName/:start', async (req, res) => {
  const { storeName, start } = req.params;
  try {
    const response = await axios.get(`${customSearchApiUrl}/${storeName}/${start}`);
    
    const items = response.data.map((item, index) => {
      item.rank = start - 1 + index;
      return item;
    });
    
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.listen(3000, () => console.log('Server Open'));
