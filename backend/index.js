import express from 'express';
import fileupload from 'express-fileupload';
import cors from 'cors';
import ProductRoutes from './routes/ProductRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(fileupload()); // Ensure this is after express.json() if you are using both

app.use(ProductRoutes);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
