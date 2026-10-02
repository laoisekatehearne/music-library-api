const express = require('express');
const cors = require('cors');

const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Music Library API is running' });
});

app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});