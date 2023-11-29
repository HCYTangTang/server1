const axios = require('axios');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const app = express();
let visitorCount = 0;

app.use(cors({ origin: '*' }));

const algorithm = 'aes-256-ctr';
const password = '90WDK1dw0183pqlxcv431283WE462CZXC84Q3QDd4w81cxz234q8w3d5142';

function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return JSON.parse(dec);
}

const encryptedKeys = fs.readFileSync(path.join(__dirname, 'encryptedKeys.txt'), 'utf8');
const apiKeys = decrypt(encryptedKeys);

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
