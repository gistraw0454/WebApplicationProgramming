const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;

// Nunjucks 설정
nunjucks.configure(/* 템플릿 파일 경로 */'views', {
    autoescape: true,
    express: app,
    // 템플릿 파일이 변경되면 엔진을 재시작하도록 설정
    watch : true,
});
// app.set에서 view engine을 html로 설정 ( 이걸 내가 해야할까?.. )
app.set('view engine','html');

// 정적 파일 경로를 'public'으로 설정 설정
app.use(express.static(path.join(__dirname,'public')));

// 폼 요청을 해석하기 위해 미들웨어 사용 (body-parser의 urlencoded 미들웨어는 폼 요청 해석)
app.use(express.urlencoded({extended: false}));

// 폼 요청은 contact.njk 파일과 과제 설명 PDF 참고


// 상품 데이터
const products = [
    { name: '상품 A', price: 10000, onSale: false },
    { name: '상품 B', price: 20000, onSale: true },
    { name: '상품 C', price: 15000, onSale: false },
    { name: '상품 D', price: 30000, onSale: true },
];

// 루트 라우트('/')
// / get 요청이 오면 index.njk로 라우트
// 이때, products 리스트를 인자로 주어야 함
app.get('/', (req, res) => {
    res.render('index.njk', { products });
});

// 상품 페이지 라우트('/products')
// /products get 요청이 오면 products.njk로 라우트
// 이때, products 리스트를 인자로 주어야 함
app.get('/products', (req, res) => {
    res.render('products.njk', { products });
});

// 문의 페이지 라우트('/contact')
// /contact get 요청이 오면 contact.njk로 라우트
app.get('/contact', (req, res) => {
    res.render('contact.njk');
});

// 문의 폼이 post되었을 경우 처리 라우트('/contact')
// 콘솔에 문의자의 name과 message를 출력
// 이후 contact_success.njk로 라우트
app.post('/contact', (req, res) => {
    const {name, message} =  req.body;  // req.body : body-parser에의해처리된request body를나타내는객체
    console.log(`문의 - 이름 : ${name} , 메세지 : ${message}`);
    res.render('contact_success.njk');
});
// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 시작되었습니다.`);
});
