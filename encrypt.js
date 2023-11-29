const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

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
  { clientId: "rs2I2cQdue2clv29IDRg", clientSecret: "rEZNp74PRG" },
  { clientId: "UqgCkXbs5M4tkhSjW2zs", clientSecret: "6a0TkloYpP" },
  { clientId: "aDocYCeDwkUK7pjOZqlZ", clientSecret: "cCgfhKuEsA" },
  { clientId: "Z7zt7O4g1tmYsjH0aQxd", clientSecret: "zbS8Pde4I8" },
  { clientId: "TB7M83BLoatISHS9ZPJi", clientSecret: "wjgFnbHv25" },
  { clientId: "TXdxpDnE5A_BE6vKogwF", clientSecret: "CIWXmvLeG6" },
  { clientId: "K6kyMT7b0J845k_dW6_N", clientSecret: "3Jk2esummd" },
  { clientId: "Pn3K7U4xi8pBjHo2hQI0", clientSecret: "yAreDVYYTC" },
  { clientId: "2wmR1b3FT2oa7KtrN8sw", clientSecret: "GUqmMixtaJ" },
  { clientId: "lcU6K4R6sQk4yH1Hqh7a", clientSecret: "d2tpadlhNr" },
];

const algorithm = 'aes-256-ctr';
const password = '90WDK1dw0183pqlxcv431283WE462CZXC84Q3QDd4w81cxz234q8w3d5142';

function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const encryptedKeys = encrypt(apiKeys);
fs.writeFileSync(path.join(__dirname, 'encryptedKeys.txt'), encryptedKeys);
