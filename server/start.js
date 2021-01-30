const app = require('./index.js');
const port = 3006;

app.listen(port, () => {
  console.log(`Image service listening at http://localhost:${port}`)
});