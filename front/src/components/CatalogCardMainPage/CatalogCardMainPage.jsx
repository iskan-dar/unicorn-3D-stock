import React from 'react';
import { useNavigate } from 'react-router-dom'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardMedia,
} from '@mui/material';
import style from './style.module.css';

function CatalogCardMainPage({ item }) {
	const navigate = useNavigate()
	const clickHandler = () => {
		navigate(`/models/${item.id}`)
	}

	return (
		<Box onClick={clickHandler} className={style.catalogCardItemContainer}>
			<Card className={style.catalogCardItem}>
				<CardMedia
					sx={{ height: '280px', width: '280px' }}
					component="img"
					alt="random-pic"
					image={'http://localhost:4000/' + item?.['Photos.photoUrl']}
				></CardMedia>
				<CardActions className={style.catalogCardItemButtonGroup}>
					<Button
						size="small"
						className={style.catalogCardItemPriceLabel}
					>
						{item?.digitalPrice} USD
					</Button>
					<Button
						size="small"
						className={style.catalogCardItemButton}
					>
						{item?.itemTitle}
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}

export default CatalogCardMainPage;
