const request = require('supertest');
const app = require('../server/index.js');

describe('Tests all Crud Operations', () => {

  // beforeAll(() => {

  // });

  // afterAll(() => {

  // });

  let testImageId;

  it('should post a new image', async () => {
    let url = 'htttp://this-is-a-test.com/fake.jpeg';
    const res = await request(app)
      .post('/items/1/images')
      .send({
        url: 'htttp://this-is-a-test.com/fake.jpeg'
      })
    expect(res.statusCode).toEqual(200);
    let body = res.body.rows[0];
    expect(body).toHaveProperty('id');
    testImageId = body.id;
    expect(body).toHaveProperty('item_id', 1);
    expect(body).toHaveProperty('image_url', url);
  });

  it('should update an image', async () => {
    let url = 'htttp://this-is-a-test-2.com/fake2.jpeg';
    const res = await request(app)
      .put(`/items/1/images/${testImageId}`)
      .send({
        url: url
      })
    expect(res.statusCode).toEqual(200);
    let body = res.body.rows[0];
    expect(body).toHaveProperty('id', testImageId);
    expect(body).toHaveProperty('item_id', 1);
    expect(body).toHaveProperty('image_url', url);
  });

  it('should delete an image', async () => {
    const res = await request(app)
      .delete(`/items/1/images/${testImageId}`)

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('command', 'DELETE')
    let body = res.body.rows[0];
    expect(body).toHaveProperty('id', testImageId);
    expect(body).toHaveProperty('item_id', 1);
  });

});