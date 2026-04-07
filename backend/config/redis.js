const { createClient } = require('redis');

const client = createClient({
  url: 'redis://127.0.0.1:6379/0'
});

client.on('error', (err) => console.error('Redis Error', err));

(async () => {
  await client.connect();
})();

module.exports = client;