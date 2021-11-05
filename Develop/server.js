const express = require('express');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});