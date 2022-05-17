import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModel, setModelData } from '../../redux/actions/modelAC';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import styles from './style.module.css';

import ModelPageImageBlock from './ModelPageImageBlock';
import ModelPageForm from './ModalPageForm';
import ModelPageCustomersAlsoBought from './ModelPageCustomersAlsoBought';
import CarouselBox from './ModelPageImageBlock/CarouselBox'

export default function ModelPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const model = useSelector((store) => store.model);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        const modelId = id;
        dispatch(setModel(modelId));
    return () => {
        dispatch(setModelData({}));
    }
    }, [id]);

    return (
        <Container className={styles.myMainContainer} maxWidth="xl">
            <Box
                sx={{
                    width: '100%',
                    marginBottom: '125px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <CarouselBox />
                <ModelPageForm model={model} user={user} />
            </Box>
            <ModelPageCustomersAlsoBought id={id} />
        </Container>
    );
}
