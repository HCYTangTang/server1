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
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));

function extractPopularDegree(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
  
    // 해당 상품 페이지에서 __NEXT_DATA__ 스크립트 태그를 찾아 JSON 파싱
    const scriptTag = $('#__NEXT_DATA__');
    const jsonData = JSON.parse(scriptTag.html());
  
    // popularDegree 값 반환
    if (jsonData && jsonData.props && jsonData.props.pageProps && jsonData.props.pageProps.product) {

    return jsonData.props.pageProps.product.popularDegree;
    } else {
      console.error('Invalid JSON data:', jsonData);
      return null;
    }  
}
