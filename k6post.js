import http from 'k6/http';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '1m', //30s
      preAllocatedVUs: 20, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  //const res = http.get(`http://localhost:3006/items/40137893`);

  var url = `http://localhost:3006/items/10000001/images`;
  var payload = JSON.stringify({
    url: 'FAKE_TEST_URL',
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}