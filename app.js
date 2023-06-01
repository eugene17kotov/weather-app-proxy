const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const indexRouter = require('./routes/index.js');

app.use('/', indexRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

try {
    app.listen(3000, () => {
        console.log('Server running. Use our API on port: 3000');
    });
} catch (err) {
    console.error('Failed to start server with error: ', err.message);
    process.exit(1);
}

module.exports = app;
