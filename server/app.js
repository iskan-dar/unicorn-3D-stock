require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const dbCheck = require('./helpers/dbCheck');
const authRouter = require('./routers/authRouter');
const itemRouter = require('./routers/itemRouter');
const searchRouter = require('./routers/searchRouter');
const cartRouter = require('./routers/cartRouter');
const sortByCategoryRouter = require('./routers/sortByCategoryRouter');
const catalogRouter = require('./routers/catalogRouter');
const wishRouter = require('./routers/wishRouter');
const ordersMakerRouter = require('./routers/ordersMakerRouter')
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(fileUpload({}));

app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: ['http://localhost:3000', process.env.CLIENT_URL],
}));

// routers
app.use('/auth', authRouter);
app.use('/items', itemRouter);
app.use('/cart', cartRouter);
app.use('/search', searchRouter);
app.use('/sort', sortByCategoryRouter);
app.use('/catalog', catalogRouter);
app.use('/wishlist', wishRouter);
app.use('/ordersMaker', ordersMakerRouter);

app.use(errorMiddleware);

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
		dbCheck();
	} catch (error) {
		console.log(error);
		console.log('Something went wrong with server connection to the PORT');
	}
};

start();
