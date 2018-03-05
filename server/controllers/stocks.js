const request = require('request');
const rp = require('request-promise-native');

module.exports = {
  index(req, res) {

    // Setup API components
    const base = 'https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=';
    const key = '&apikey=AQYYFTFBKBPA9HA5';
    const tags = req.params.tags;
    const url = base + tags + key;

    const options = {
      uri: url,
      json: true
    };

    // Fetch the data
    rp(options)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.log('Error!: ', error.statusCode);
        res.json({
          errorMessage: 'Service is unavailable at this time. Please try again later.',
          errorCode: error.statusCode
        })
      })


  },
  details(req, res) {

    // Setup API call for details
    const base = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
    const key = '&apikey=AQYYFTFBKBPA9HA5';
    const tag = req.params.tag
    const url = base + tag + key;

    const options = {
      uri: url,
      json: true
    }

    rp(options)
      .then(data => {

        // Pulling data from the response
        const apiData = data['Time Series (Daily)'];

        // Grab keys and values
        const dataKeys = Object.keys(apiData);
        const dataValues = Object.keys(apiData).map(key => {
          return apiData[key]
        });
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
      .catch(error => {
        console.log('Error!: ', error.statusCode);
        res.json({
          errorMessage: 'Service is unavailable at this time. Please try again later.',
          errorCode: error.statusCode
        })
      })
  }
}
