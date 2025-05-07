export default {
  server: {
    proxy: {
      '/bejeweled': 'http://localhost:8080',  // Проксировать все запросы на /bejeweled на сервер
    },
  },
};