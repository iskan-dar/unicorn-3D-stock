import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import styles from './CollectionGrid.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	height: '10rem',
	color: theme.palette.text.secondary,
	borderRadius: '10px',
}));

export default function CollectionGrid() {
	const catalogItems = useSelector((store) => store.catalogItems);
	const navigate = useNavigate()

	const result = catalogItems.filter((el, i, a) => a.findIndex((el2) => (el2['Collection.collectionName'] === el['Collection.collectionName'])) === i);
	console.log(result);

	const clickHandler = (e) => {
		console.log(e.target.parentNode.id)
		navigate(`/collection/${e.target.parentNode.id}`)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<Item
						className={`${styles.collectionCard} ${styles.collection1}`}
						id={result[2]?.['Collection.id']}
					>
						{result[2]?.['Collection.collectionName']}
						<Button
							onClick={clickHandler}
							size="small"
							className={styles.collectionButton}
						>
							view
						</Button>
					</Item>
				</Grid>
				<Grid item xs={7}>
					<Item
						className={`${styles.collectionCard} ${styles.collection2}`}
						id={result[1]?.['Collection.id']}
					>
						{result[1]?.['Collection.collectionName']}
						<Button
							onClick={clickHandler}
							size="small"
							className={styles.collectionButton}
						>
							view
						</Button>
					</Item>
				</Grid>
				<Grid item xs={7}>
					<Item
						className={`${styles.collectionCard} ${styles.collection3}`}
						id={result[0]?.['Collection.id']}
					>
						{result[0]?.['Collection.collectionName']}
						<Button
							onClick={clickHandler}
							size="small"
							className={styles.collectionButton}
						>
							view
						</Button>
					</Item>
				</Grid>
				<Grid item xs={5}>
					<Item
						className={`${styles.collectionCard} ${styles.collection4}`}
					>
						Dreads <br /> collection <br />
						<Button
							size="small"
							className={styles.collectionButton}
						>
							view
						</Button>
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
}
