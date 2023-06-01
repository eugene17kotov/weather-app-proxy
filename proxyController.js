const axios = require('axios');
const dotenv = require('dotenv').config();

axios.defaults.baseURL = 'http://api.weatherstack.com';

const proxyController = async (req, res) => {
    const { query = 'Dnipropetrovsk' } = req.query;

    const params = { access_key: '3b85bff172787a1251e3f8d9a1d3275a', query };

    const data = await axios.get('/current', { params });

    const {
        data: {
            current,
            location: { name: location },
        },
    } = data;

    res.status(200).json({ ...current, location });
};

module.exports = proxyController;
