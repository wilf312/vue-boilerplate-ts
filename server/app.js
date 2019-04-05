const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 9999

app.get('/', (req, res) => res.json({
  hello: 'world!'
}))


// body parse
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// cors https://qiita.com/tomoya_ozawa/items/feca4ffc6217d585b037
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});


// ----------------- 読み込んだりしたり、更新したり

let mockdb = {
  storeDetail: {
    storeId: 1,
    storeName: 'げんやフロントエンドコンサルティング',
    description: 'フロントのお仕事うけおいます',
  }
}
// 取得 API
app.get('/storeDetail', (req, res) => res.json(mockdb.storeDetail))

// 更新 API
app.put('/storeDetail', (req, res) => {
  let data = {}
  data['storeName'] = req.body.storeName || mockdb.storeDetail.storeName
  data['description'] = req.body.description || mockdb.storeDetail.description

  mockdb.storeDetail = {
    ...mockdb.storeDetail,
    ...data
  }

  console.log(mockdb)

  res.json({success: true})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
