// Simpan sebagai hash.js lalu jalankan: node hash.js
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(console.log);