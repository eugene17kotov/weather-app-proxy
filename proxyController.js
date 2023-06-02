const axios = require('axios');
require('dotenv').config();
const customError = require('./error');

const access_key = process.env.API_KEY;

axios.defaults.baseURL = 'http://api.weatherstack.com';

const proxyController = async (req, res) => {
    const { query = 'Dnipropetrovsk' } = req.query;

    const params = { access_key, query };

    const data = await axios.get('/current', { params });

    console.log(data.data.success);

    if (data.data.success === false) {
        throw customError({ status: 400, message: 'Invalid city name' });
    }

    const {
        data: {
            current,
            location: { name: location },
        },
    } = data;

    res.status(200).json({ ...current, location });
};

module.exports = proxyController;
