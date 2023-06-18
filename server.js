const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
}));

const clientId = "SliOUwwJyx40KDhySwCf";
const clientSecret = "r1Z3AkEecz";
const apiUrl = "https://openapi.naver.com/v1/search/shop.json";

app.get('/search/:keyword/:storeName/:start', async (req, res) => {
  const { keyword, storeName, start } = req.params;
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
    
    const items = response.data.items.map((item, index) => {
      if (item.mallName === storeName) {
        item.rank = start - 1 + index;
      }
      return item;
    });
    
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.listen(3000, () => console.log('Server Open'));
