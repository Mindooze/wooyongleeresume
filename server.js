const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// 정적 파일 서빙
app.use(express.static('.'));

// 메인 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
