CryptoJS = require('crypto-js')
const nBits = 52; // number of most significant bits to use
const gameResult = (seed, salt) => {
  // 1. HMAC_SHA256(message=seed, key=salt) 
  const hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(seed), salt);
  seed = hmac.toString(CryptoJS.enc.Hex);
  console.log('seed: ', seed);
  // 2. r = 52 most significant bits
  seed = seed.slice(0, nBits / 4);
  return getFromSeed(seed)
};

const getFromSeed = (seed) => {
  const r = parseInt(seed, 16);
  console.log('r: ', r.toString(16));
  // 3. X = r / 2^52
  let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)
  console.log('X: ', X, parseFloat(X.toPrecision(9)));
  X = parseFloat(X.toPrecision(9));

  // 4. X = 99 / (1-X)
  X = 99 / (1 - X);
  console.log('99/(1-x)', X);
  // 5. return max(trunc(X), 100)
  const result = Math.floor(X);
  console.log('result', result);
  return Math.max(1, result / 100);
}

const HASH = 'c455213ccb40d1c96ddb8342d34d7e5bfd8c9a9d2cb47ab64f2abcb8251bbf28';
const SALT = '0000000000000000000301e2801a9a9598bfb114e574a91a887f2132f33047e6';
console.log('hash: ', HASH)
console.log('salt: ', SALT)
// console.log(gameResult(HASH, SALT));
console.log(getFromSeed('f000000000000'))

// last block 790,100 for the bc
// 1000000000000 1.05
// 2000000000000 1.13
// 3000000000000 1.21
// 4000000000000 1.32
// 5000000000000 1.44
// 6000000000000 1.58
// 7000000000000 1.76
// 8000000000000 1.98
// 9000000000000 2.26
// a000000000000 2.64
// b000000000000 3.16
// c000000000000 3.96
// d000000000000 5.28
// e000000000000 7.92
// f000000000000 15.84