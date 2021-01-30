const axios = require ('axios');
jest.mock('axios');

describe('Verifies repsonse from calling /items/:item_id/images endpoint', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const testGetItemImages = async () => {
    const res = await axios.get('/items/2/images');
    return res.rows;
  }

  const mock = () => {
    axios.get.mockResolvedValue({
      rows: [
        {
            "id": 17,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_002.jpg"
        },
        {
            "id": 19,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_004.jpg"
        },
        {
            "id": 21,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_006.jpg"
        },
        {
            "id": 23,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_008.jpg"
        },
        {
            "id": 25,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_010.jpg"
        },
        {
            "id": 16,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_001.jpg"
        },
        {
            "id": 18,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_003.jpg"
        },
        {
            "id": 20,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_005.jpg"
        },
        {
            "id": 22,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_007.jpg"
        },
        {
            "id": 24,
            "item_id": 2,
            "image_url": "https://festy-images.s3-us-west-1.amazonaws.com/2_009.jpg"
        }
      ]
    });
  }

  test('Verifies that response from server is an array' , async () => {
    mock();
    const data = await testGetItemImages();
    expect(Array.isArray(data)).toBe(true);
  });

  test('Verifies that the response for item_id 2 returns an array of 10 objects', async () => {
    mock();
    const data = await testGetItemImages();
    expect(data).toHaveLength(10);
  });

  test('Verifies that elements in array are objects', async () => {
    mock();
    const data = await testGetItemImages();
    data.forEach((element)=>{
      expect(typeof element).toBe('object');
    })
  });

  test('Verifies that elements in array are objects and have the correct keys', async () => {
    mock();
    const data = await testGetItemImages();
    data.forEach( (element) => {
      expect(typeof element).toBe('object');
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('item_id');
      expect(element).toHaveProperty('image_url');
    });
  });

  test('Verifies that oject keys are the correct dataytypes', async ()=>{
    mock();
    const data = await testGetItemImages();
    expect(typeof data[0].id).toBe('number');
    expect(typeof data[0].item_id).toBe('number');
    expect(typeof data[0].image_url).toBe('string');
  });

})