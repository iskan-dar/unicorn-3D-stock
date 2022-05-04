import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.css';

function TagComponent({ tag, tags, setTags }) {
	const deleteHandler = ({ id }) => {
		setTags(tags.filter((tag) => tag.id !== id))
	};
	return (
		<Box className={styles.tagComponentTagCard}>
			<Box component="span" className={styles.tagComponentTagName}>{tag.tagTitle}</Box>
			<IconButton className={styles.tagComponentTagCloseIcon} onClick={() => { deleteHandler(tag) }}>
				<CloseIcon />
			</IconButton>
		</Box >
	);
};

export default TagComponent;
