const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const routes = [
    { path: '/admin', target: 'http://localhost:8000' },
    { path: '/api', target: 'http://localhost:9000' },
    { path: '/auth', target: 'http://localhost:9001' },
    { path: '/', target: 'http://localhost:5173' },
];

routes.forEach((route) => {
    app.use(route.path, createProxyMiddleware({ target: route.target, pathRewrite: { [`^${route.path}`]: '' }, changeOrigin: true }));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Custom Gateway is running on port ${PORT}`);
});
