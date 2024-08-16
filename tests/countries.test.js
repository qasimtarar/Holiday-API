const request = require('supertest');
const express = require('express');
const countriesRoute = require('../routes/countries');
const axios = require('axios');

// Mock axios
jest.mock('axios');

const app = express();
app.use('/countries', countriesRoute);

let server;

beforeAll(async () => {
  server = app.listen(3000);
});

afterAll(async () => {
  await new Promise(resolve => server.close(resolve)); 
});

describe('GET /countries', () => {
  it('should return 200 and a list of countries', async () => {

    const mockResponse = {
      meta: {},
      response: {
        countries: [
          { country_name: 'Pakistan', country_short: 'PK' },
          { country_name: 'United States', country_short: 'US' }
        ]
      }
    };

    // Mock the axios.get method to return the mock response
    axios.get.mockResolvedValue({ data: mockResponse });

    const res = await request(app).get('/countries');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockResponse);
  });

  it('should return 500 if the API call fails', async () => {
    
    // Mock the axios.get method to throw an error
    axios.get.mockRejectedValue(new Error('Failed to fetch countries'));

    const res = await request(app).get('/countries');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch country data');
  });
});
