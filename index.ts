import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { getAllStocks, createStock, getStockById, updateStock, deleteStock } from './src/controller/stockController';

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// CRUD routes for Stock
app.get('/stocks', getAllStocks);
app.post('/stocks', createStock);
app.get('/stocks/:id', getStockById);
app.put('/stocks/:id', updateStock);
app.delete('/stocks/:id', deleteStock);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});