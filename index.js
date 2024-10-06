const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes'); 
const app = express();
const PORT = 3000;

app.use(express.json());

const MONGO_URI = 'mongodb+srv://delgaddi:Delgaddi123@cluster0.fh90y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
res.send('Welcome to the Task Manager API!');
});

app.use('/api', taskRoutes);  

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
