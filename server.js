const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const couponRoutes = require('./routes/couponAssign');
const createRoutes = require('./routes/createuser');
const roleRoutes = require('./routes/roleAssign');
const loginRoutes = require('./routes/login');
const { verifyToken } = require('./middleware/auth');
const config = require('./config');
const app = express();

app.use(bodyParser.json());
app.use('/user', createRoutes.routes);
app.use('/login', loginRoutes.routes);
app.use('/roles', roleRoutes.routes);
app.use('/coupons', couponRoutes.routes);

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data!' });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
