import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addModelToCart } from '../../redux/actions/cartAC';
import { setModel } from '../../redux/actions/modelAC';
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	FormControl,
	IconButton,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import styles from './style.module.css';
import CatalogCardItem from '../CatalogCardItem/CatalogCardItem';
import axios from 'axios';
import {
	deleteWish,
	getUserWishes,
	saveWish,
} from '../../redux/actions/wishAC';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ModelPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const model = useSelector((store) => store.model);
	const user = useSelector((store) => store.user);
	const wishes = useSelector((store) => store.wishes);

	const [quantity, setQuantity] = useState({ value: Number(1) }); // счетчик количества
	const [inputs, setInputs] = useState({}); // инпуты
	const [totalCost, setTotalCost] = useState({ value: 0 });
	const [alsoBuy, setAlsoBuy] = useState([]);
	const photosArr = model['Photos.photoUrl'];

	const [activeActions, setActiveActions] = useState(0)
	const [wished, setWished] = useState(false);

	const [snackState, setSnackState] = useState({
		snackOpen: false,
		vertical: 'top',
		horizontal: 'center',
	});

	const { vertical, horizontal, snackOpen } = snackState;

	const handleSnackClick = (newState) => () => {
		setSnackState({ snackOpen: true, ...newState });
	};

	const handleSnackClose = () => {
		setSnackState({ ...snackState, snackOpen: false });
	};

	useEffect(() => {
        if(user.id){
            dispatch(getUserWishes(user.id));
        }
	}, [dispatch, user.id]);

	useEffect(() => {
		setWished(wishes.find(el => el.itemId == id))
	}, [id, wishes])

	const wishHandler = () => {
		dispatch(saveWish(user.id, id));
	};

	const unWishHandler = () => {
		const targetWish = wishes.find(el => el.itemId === +id);
		dispatch(deleteWish(targetWish.id));
	};

	// PHOTO-SLIDER
	const mainPhotoRender = (array) => {
		if (activeActions < 0) {
			setActiveActions(array?.length - 1)
			return (
				array?.[`${activeActions}`]
					? <CardMedia
						component="img"
						alt={`${model.itemTitle}-pic`}
						width="600"
						height="100%"
						image={'http://localhost:4000/' + array?.[`${activeActions}`]} />
					: <Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress sx={{ color: 'blue' }} />
					</Box>)
		}
		if (activeActions > array?.length - 1) {
			setActiveActions(0)
			return (
				array?.[`${activeActions}`]
					? <CardMedia
						component="img"
						alt={`${model.itemTitle}-pic`}
						width="600"
						height="100%"
						image={'http://localhost:4000/' + array?.[`${activeActions}`]} />
					: <Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress sx={{ color: 'blue' }} />
					</Box>)
		}
		return (
			array?.[`${activeActions}`]
				? <CardMedia
					component="img"
					alt={`${model.itemTitle}-pic`}
					width="600"
					height="100%"
					image={'http://localhost:4000/' + array?.[`${activeActions}`]} />
				: <Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress sx={{ color: 'blue' }} />
				</Box>)
	}

	useEffect(() => {
		const modelId = id;
		dispatch(setModel(modelId));
	}, [id]);

	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	useEffect(() => {
		if (model.digitalPrice) {
			setTotalCost({ value: model.digitalPrice });
		}
	}, [model.digitalPrice]);

	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// TOOOOOOODDDOOOOOOOOOOOOO
	useEffect(() => {
		const modelId = id;
		axios.get('http://localhost:4000/items', modelId)
			.then((response) =>
				setAlsoBuy(response.data));
	}, []);

	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Расчет суммы заказа в зависимости от количества и масштаба
	useEffect(() => {
		return inputs.scale
			? setTotalCost({
				value: (parseFloat((model.digitalPrice + inputs.scale)) * Number(quantity.value)).toFixed(2),
			})
			: setTotalCost({
				value: (parseFloat(model.digitalPrice) * Number(quantity.value)).toFixed(2),
			});
	}, [inputs.scale, model.digitalPrice, quantity.value]);

	// Выбор цвета модели
	const colorSelectHandler = (event) => {
		setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	// Выбор масштаба модели
	const scaleSelectHandler = (event) => {
		setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
		setTotalCost({ value: (model.digitalPrice + event.target.value) });
		setQuantity({ value: Number(1) });
	};

	// ADD TO CART
	const addToCartHandler = (event) => {
		const formData = {
			id,
			userId: user.id,
			title: model.itemTitle,
			quantity: quantity.value,
			total: totalCost.value,
		};

		dispatch(addModelToCart(event, formData))
		setInputs({});
		setQuantity({ value: Number(1) });
		setTotalCost({ value: Number(model.digitalPrice) });
		// navigate('/')
	};

	return (
		<Container className={styles.myMainContainer} maxWidth="xl">
			<Box sx={{
				width: "100%",
				marginBottom: "125px",
				display: 'flex',
				justifyContent: 'space-between'
			}}>
				<Container>

					{/* ОСНОВНОЕ ФОТО */}
					<Box className={styles.modelPageMainImg}>
						{mainPhotoRender(photosArr)}
					</Box>

					{/* МИНИАТЮРЫ ФОТО */}
					<Box component="div" className={styles.modelPageCarouselBox} >

						{/* КНОПКА НАЗАД */}
						<IconButton className={styles.modelPageCarouselBtn} onClick={() => setActiveActions(prev => prev - 1)} >
							<ArrowBackIosNewIcon />
						</IconButton>

						<Stack direction="row" alignItems="center" spacing={2}>
							{photosArr?.length
								? photosArr.map((el) => (
									<Box key={el} >
										<img style={{ width: '100%', height: '105px' }}
											src={'http://localhost:4000/' + el}
											alt="here"
											loading="lazy"
										/>
									</Box>
								))
								: null}
						</Stack>

						{/* КНОПКА ВПЕРЕД */}
						<IconButton className={styles.modelPageCarouselBtn} onClick={() => setActiveActions(prev => prev + 1)}>
							<ArrowForwardIosIcon />
						</IconButton>

					</Box>

					{/* ОПИСАНИЕ */}
					<Typography className={styles.modelPageDescriptionTitle} component="div">Description</Typography>

					<Typography>{model.description}</Typography>

				</Container>

				{/* {ФОРМА НАЧИНАЕТСЯ ТУТ} */}
				<Box component="form" onSubmit={addToCartHandler}
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}} >
					<Typography className={styles.modelPageModelTitle}>{model.itemTitle}</Typography>

					{model.digitalPrice
						? <Typography className={styles.modelPageModelTotalCost} variant="h4">{totalCost.value} USD</Typography>
						: <Box> <CircularProgress sx={{ color: 'blue' }} /> </Box>
					}

					<Card className={styles.modelPageModelBuyDigital}>
						<CardContent>
							<Stack spacing={1} direction="row">
								<LibraryAddCheckOutlinedIcon sx={{ color: 'blue' }} />

								<Typography variant="h6" component="b">
									Digital copy available
								</Typography>
							</Stack>

							<Typography color="#6B7280">
								You can buy a Digital version of this model. The priceis fixed, the ability to select options is not available.
							</Typography>

						</CardContent>

						<Box className={styles.modelPageModelBuyDigitalBtn}>
							<Button className={styles.modelPageBuyButton}> Buy digital for {model.digitalPrice} USD </Button>
						</Box>

					</Card>

					{/* COLOR SELECTOR */}
					<Typography sx={{ marginBottom: "15px" }}> Color </Typography>
					<FormControl sx={{ color: "#1F2937", marginBottom: "40px" }} size="small">

						<Select name="color" id="color-select"
							onChange={colorSelectHandler} value={inputs.color ?? ''}
							className={styles.modelPageSelect}>

							<MenuItem value={model?.['PhysicalCopies.color']}>{model?.['PhysicalCopies.color']}</MenuItem>
						</Select>

					</FormControl>

					{/* SCALE SELECTOR */}
					<Typography sx={{ marginBottom: "15px" }}> Scale </Typography>
					<FormControl sx={{ marginBottom: "40px" }} size="small">

						<Select name="scale" id="scale-select"
							onChange={scaleSelectHandler} value={inputs.scale ?? ''}
							className={styles.modelPageSelect}>

							<MenuItem value={Number(model?.['PhysicalCopies.price'])}>
								{model?.['PhysicalCopies.scale']} - {model?.['PhysicalCopies.price']} $
							</MenuItem>

						</Select>

					</FormControl>

					<Typography> Quantity </Typography>

					<Box className={styles.modelPageCounter} component="div">
						<IconButton color="inherit" disabled={quantity.value === 1}
							onClick={() => { setQuantity({ value: quantity.value - Number(1) }) }} ><RemoveIcon /></IconButton>
						<Typography> {quantity.value} </Typography>
						<IconButton color="inherit" disabled={!inputs.scale}
							onClick={() => { setQuantity({ value: quantity.value + Number(1) }) }}><AddIcon /></IconButton>
					</Box>

					<Stack spacing={2} direction="row" container="true" justifyContent="center">
						<Button
							disabled={!inputs.scale || !inputs.color}
							type="submit"
							className={styles.modelPageAddToCartButton}
							size="large"
							variant="contained"
							onClick={handleSnackClick({
								vertical: 'top',
								horizontal: 'right',
							})}
						>
							ADD TO CART
						</Button>
						<Snackbar
							anchorOrigin={{ vertical, horizontal }}
							open={snackOpen}
							onClose={handleSnackClose}
							autoHideDuration={5000}
							key={vertical + horizontal}
						>
							<Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
								Added successfully to your cart!
							</Alert>
						</Snackbar>

						{wished ? (
							<Button
								onClick={unWishHandler}
								className={styles.trueAddToFavorite}
								children={<FavoriteSharpIcon />}
							></Button>
						) : (
							<Button
								onClick={wishHandler}
								className={styles.falseAddToFavorite}
								children={<FavoriteBorderSharpIcon />}
							></Button>
						)}

					</Stack>

				</Box>

			</Box >

			<Container maxWidth="xl">
				<Typography sx={{ fontWeight: 'bold' }}>Customers also bought these</Typography>

				<Box className={styles.modelPageAlsoBuyBox}>

					{alsoBuy.map((el) => (<CatalogCardItem key={el.id} card={el} />))}

				</Box>
			</Container>
		</Container >
	)
};
