const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const shoppinglistRoutes = require('./routes/shoppinglist');
const pantryRoutes = require('./routes/pantry');
const regrethistoryRoutes = require('./routes/regrethistory');
const opportunitycostRoutes = require('./routes/opportunitycost');
const calculateRoutes = require('./routes/calculate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'BeliApa API berjalan!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/shoppinglist', shoppinglistRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/regrethistory', regrethistoryRoutes);
app.use('/api/opportunitycost', opportunitycostRoutes);
app.use('/api/calculate', calculateRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});