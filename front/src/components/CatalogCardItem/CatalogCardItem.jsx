import React from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardMedia,
} from '@mui/material';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

function CatalogCardItem({ card }) {

	const navigate = useNavigate()

	const paramsHandler = () => {
		navigate(`/models/${card.id}`)
	}

	return (
		<Box className={style.catalogCardItemContainer}>
			<Card className={style.catalogCardItem}>
				<CardMedia
					component="img"
					alt={`${card.itemTitle}-pic`}
					image={'http://localhost:4000/' + card?.['Photos.photoUrl']}
				></CardMedia>
				<CardActions className={style.catalogCardItemButtonGroup}>
					<Button
						size="small"
						className={style.catalogCardItemPriceLabel}
					>
						{card.digitalPrice} USD
					</Button>
					<Button
						size="small"
						className={style.catalogCardItemButton}
						onClick={paramsHandler}
					>
						{card.itemTitle}
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}

export default CatalogCardItem;
