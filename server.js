const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const couponRoutes = require('./routes/coupons');
const createUser = require('./routes/createuser');
const roleAssign = require('./routes/roleAssign');
const login = require('./routes/loginAdmin');
const { verifyToken } = require('./middleware/auth');
const app = express();



app.use(bodyParser.json());

app.use('/coupons', couponRoutes);
app.use('/create', createUser);
app.use('/role-assignment', roleAssign);
app.use('/login', login);


app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data!' });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


mongoose.connect('mongodb://localhost:27017/superadmin-dashboard')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
