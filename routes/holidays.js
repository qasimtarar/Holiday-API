const express = require('express');
const NodeCache = require('node-cache');
const { fetchFromCalendarific } = require('../services/calendarificService');
const config = require('../config/config');
const router = express.Router();

const cache = new NodeCache({ stdTTL: config.cacheTTL })

router.get('/', async (req, res) => {

  try {
      
    const { country, year } = req.query;

    if(!country || !year){
      return res.status(400).json({"error":"Both Country and Year required to fetch results!"});
    }

    const cacheKey = `${country}-${year}`;

    if(cache.has(cacheKey)){
      console.log({msg: "returned from cache"})
      return res.json(cache.get(cacheKey));
    }

    const data = await fetchFromCalendarific('/holidays', {country, year});
    
    cache.set(cacheKey, data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;