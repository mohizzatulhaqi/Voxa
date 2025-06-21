const http = require('http');

console.log('=== Testing Image Display ===\n');

// Test specific file
const testFile = 'files-1750470700775-703006540.png';
const testUrl = `http://localhost:3001/uploads/images/${testFile}`;

console.log(`Testing file: ${testFile}`);
console.log(`URL: ${testUrl}\n`);

// Test file access with detailed headers
const req = http.get(testUrl, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`);
  console.log(`  Content-Type: ${res.headers['content-type']}`);
  console.log(`  Content-Length: ${res.headers['content-length']}`);
  console.log(`  Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
  console.log(`  Cache-Control: ${res.headers['cache-control']}`);
  
  if (res.statusCode === 200) {
    console.log('\n✅ File is accessible!');
    
    // Check if it's actually an image
    const contentType = res.headers['content-type'];
    if (contentType && contentType.startsWith('image/')) {
      console.log('✅ Content-Type is correct for image');
    } else {
      console.log('❌ Content-Type is not correct for image:', contentType);
    }
    
    // Check file size
    const contentLength = res.headers['content-length'];
    if (contentLength && parseInt(contentLength) > 0) {
      console.log(`✅ File has content: ${contentLength} bytes`);
    } else {
      console.log('❌ File has no content or invalid size');
    }
    
  } else if (res.statusCode === 404) {
    console.log('❌ File not found (404)');
    console.log('This could mean:');
    console.log('1. File does not exist in uploads/images/');
    console.log('2. Backend is not running on port 3001');
    console.log('3. Static file middleware is not configured correctly');
  } else {
    console.log(`❌ Unexpected status: ${res.statusCode}`);
  }
});

req.on('error', (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log('This could mean:');
  console.log('1. Backend is not running');
  console.log('2. Port 3001 is not accessible');
  console.log('3. Network connectivity issue');
});

req.setTimeout(5000, () => {
  console.log('❌ Timeout');
  req.destroy();
});

// Also test the alternative API endpoint
console.log('\n=== Testing Alternative API Endpoint ===\n');

const apiUrl = `http://localhost:3001/api/file/images/${testFile}`;
console.log(`API URL: ${apiUrl}\n`);

const apiReq = http.get(apiUrl, (res) => {
  console.log(`API Status: ${res.statusCode}`);
  console.log(`API Headers:`);
  console.log(`  Content-Type: ${res.headers['content-type']}`);
  console.log(`  Content-Length: ${res.headers['content-length']}`);
  
  if (res.statusCode === 200) {
    console.log('✅ API endpoint works!');
  } else {
    console.log('❌ API endpoint failed');
  }
});

apiReq.on('error', (err) => {
  console.log(`❌ API Error: ${err.message}`);
});

apiReq.setTimeout(5000, () => {
  console.log('❌ API Timeout');
  apiReq.destroy();
});