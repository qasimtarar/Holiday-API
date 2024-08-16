const env = require('dotenv');

const api = "https://calendarific.com/api/v2";
const port = 3000;
const cacheLifeInSeconds = 7200;  // 2 hours

const { error } = env.config();
if(error) {
    console.error("Failed to load env.");
    process.exit(1);
}

if(!process.env.CALENDARIFIC_API_KEY){
    console.error("CALENDARIFIC_API_KEY is missing in env.");
    process.exit(1);
}

module.exports = {
  apiKey: process.env.CALENDARIFIC_API_KEY,
  apiUrl: api,
  cacheTTL: cacheLifeInSeconds,
  port : process.env.PORT || port
};
