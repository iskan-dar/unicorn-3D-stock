import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';
import ViewPort from '../ViewPort/ViewPort';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    CardMedia,
    Container,
    Box,
    IconButton,
    Stack,
    Typography,
    CircularProgress,
} from '@mui/material';

export default function ModelPageImageBlock() {
    const [activeActions, setActiveActions] = useState(0);
    const model = useSelector((store) => store.model);

    const photosArr = model['Photos.photoUrl'];
    const previewLink = model['PreviewModels.previewModelLink'];

    if (photosArr && previewLink) {
        if (!photosArr.find((el) => el === 'previewIcon2.png')) {
            photosArr.push('previewIcon2.png');
        }
    }

    const changeMainPhoto = (e) => {
        const link = e.target.src.replace('http://localhost:4000/', '');
    };

    // PHOTO-SLIDER
    const mainPhotoRender = (array) => {
        if (array?.[`${activeActions}`] === 'previewIcon2.png') {
            return <ViewPort />;
        }

        if (activeActions < 0) {
            setActiveActions(array?.length - 1);
            return array?.[`${activeActions}`] ? (
                <CardMedia
                    component="img"
                    alt={`${model.itemTitle}-pic`}
                    width="600"
                    height="100%"
                    image={
                        'http://localhost:4000/' + array?.[`${activeActions}`]
                    }
                />
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: 'blue' }} />
                </Box>
            );
        }
        if (activeActions > array?.length - 1) {
            setActiveActions(0);
            return array?.[`${activeActions}`] ? (
                <CardMedia
                    component="img"
                    alt={`${model.itemTitle}-pic`}
                    width="600"
                    height="100%"
                    image={
                        'http://localhost:4000/' + array?.[`${activeActions}`]
                    }
                />
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: 'blue' }} />
                </Box>
            );
        }
        return array?.[`${activeActions}`] ? (
            <CardMedia
                component="img"
                alt={`${model.itemTitle}-pic`}
                width="600"
                height="100%"
                image={'http://localhost:4000/' + array?.[`${activeActions}`]}
            />
        ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: 'blue' }} />
            </Box>
        );
    };

    return (
        <Container>
            <Box className={styles.modelPageMainImg}>
                {mainPhotoRender(photosArr)}
            </Box>

            {/* МИНИАТЮРЫ ФОТО */}
            <Box component="div" className={styles.modelPageCarouselBox}>
                {/* КНОПКА НАЗАД */}
                <IconButton
                    className={styles.modelPageCarouselBtn}
                    onClick={() => setActiveActions((prev) => prev - 1)}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Stack direction="row" alignItems="center" spacing={2}>
                    {photosArr?.length
                        ? photosArr.map((el) => (
                              <Box key={el} onClick={(e) => changeMainPhoto(e)}>
                                  <img
                                      style={{
                                          width: '105px',
                                          height: '105px',
                                          objectFit: 'cover',
                                      }}
                                      src={'http://localhost:4000/' + el}
                                      alt="here"
                                      loading="lazy"
                                  />
                              </Box>
                          ))
                        : null}
                </Stack>

                {/* КНОПКА ВПЕРЕД */}
                <IconButton
                    className={styles.modelPageCarouselBtn}
                    onClick={() => setActiveActions((prev) => prev + 1)}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            {/* ОПИСАНИЕ */}
            <Typography
                className={styles.modelPageDescriptionTitle}
                component="div"
            >
                Description
            </Typography>

            <Typography>{model.description}</Typography>
        </Container>
    );
}
