const request = require('supertest');
const express = require('express');
const holidaysRoute = require('../routes/holidays');
const axios = require('axios');

// Mock axios
jest.mock('axios');

const app = express();
app.use('/holidays', holidaysRoute);

describe('GET /holidays', () => {

    //400 - Bad Request
  it('should return 400 if country or year is missing', async () => {
    const res = await request(app).get('/holidays');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Both Country and Year required to fetch results!');
  });

  //200 - Success
  it('should return 200 and holiday data when valid country and year are provided', async () => {
    const mockResponse = {
      meta: {},
      response: {
        holidays: [{ name: 'Test Holiday', date: '2024-01-01' }]
      }
    };

    // Mock the axios.get method to return mockResponse
    axios.get.mockResolvedValue({ data: mockResponse });

    const res = await request(app).get('/holidays?country=PAK&year=2024');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockResponse);
  });
});
