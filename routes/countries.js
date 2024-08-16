const express = require('express');
const router = express.Router();
const { fetchFromCalendarific } = require('../services/calendarificService');


router.get('/', async (req, res) => {
  try {
    
    const data = await fetchFromCalendarific('/countries');

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch country data' });

  }
});

module.exports = router;
