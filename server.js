const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
let visitorCount = 0;

app.use(cors({ origin: '*' }));


const apiKeys = [
  { clientId: "SliOUwwJyx40KDhySwCf", clientSecret: "r1Z3AkEecz" },
  { clientId: "e7aRAHnNdbVvYpqoEbgJ", clientSecret: "1x4VuVpRoU" },
  { clientId: "gpUQMPZQ2dpFeR5ks9JN", clientSecret: "0xzwuO6ZTx" },
  { clientId: "Efxk5ItHSgqhdcv6aZzs", clientSecret: "jI6LaAHL5s" },
  { clientId: "2OctgbbZV7OHrrNyeYZ_", clientSecret: "i8ejJ77dNN" },
  { clientId: "P2btjxecgeeos_tGfM9A", clientSecret: "LiktVAyUGL" },
  { clientId: "EJWNBF8JcXRecGzzHYzw", clientSecret: "kA6eLQrz7l" },
  { clientId: "PcERsS8d9RsClB_oJIlx", clientSecret: "aoHNvCxWcf" },
  { clientId: "7cFnxnLYivh4iv6QpQhJ", clientSecret: "aH_Mc0jU1o" },
];

let currentKeyIndex = 0;

const apiUrl = "https://openapi.naver.com/v1/search/shop.json";

// 순차적으로 API 키를 선택하는 함수
function getNextApiKey() {
  const key = apiKeys[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
  return key;
}

// 키워드 검색 엔드포인트
app.get('/search/:keyword/:start', async (req, res) => {
  const { keyword, start } = req.params;
  const { clientId, clientSecret } = getNextApiKey();
  
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
  const { clientId, clientSecret } = getNextApiKey();
  
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
  const { clientId, clientSecret } = getNextApiKey();
  
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
