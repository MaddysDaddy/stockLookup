const request = require('request');

module.exports = {
  index(req, res) {

    // Setup API components
    const base = 'https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=';
    const key = '&apikey=AQYYFTFBKBPA9HA5';
    const tags = req.params.tags;

    request(base + tags + key, (error, response, body) => {

      const data = JSON.parse(body);
      res.json(data);
    })
  },
  details(req, res) {

    // Setup API call for details
    const base = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
    const key = '&apikey=AQYYFTFBKBPA9HA5';
    const tag = req.params.tag
    const url = base + tag + key;

    request(url, (error, response, body) => {

      const data = JSON.parse(body);

      // Pulling data from the response
      const apiData = data['Time Series (Daily)'];

      // Grab keys and values
      const dataKeys = Object.keys(apiData);
      const dataValues = Object.values(apiData);
      let newData = [];

      // Reshaping data to array
      for (let i = 0; i < dataValues.length; i++) {
        dataValues[i].date = dataKeys[i];
        newData.push(dataValues[i]);
      }

      // Limiting to previous 1 day
      newData = newData.slice(0, 1);
      res.json(newData);
    })
  }
}
