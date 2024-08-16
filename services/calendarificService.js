const axios = require('axios');
const config = require('../config/config');

const { apiUrl: api, apiKey: key } = config;

const fetchFromCalendarific = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${api}${endpoint}`, {
      params: { api_key: key, ...params }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from Calendarific API: ${error.message}`);
  }
};

module.exports = {
  fetchFromCalendarific
};
