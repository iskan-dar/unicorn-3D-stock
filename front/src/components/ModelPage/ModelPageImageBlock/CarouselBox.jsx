import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../style.module.css';
import ViewPort from '../../ViewPort/ViewPort';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Container, Box, IconButton, Stack, Typography } from '@mui/material';
import MainPhoto from './MainPhoto';
import { style } from '@mui/system';

export default function ModelPageImageBlock() {
    const [mainPhotoLink, setMainPhotoLink] = useState('');
    const model = useSelector((store) => store.model);
    const [value, setValue] = useState(0);

    const photosArr = model['Photos.photoUrl'];
    const previewLink = model['PreviewModels.previewModelLink'];

    const moveBehind = () => {
        console.log('mB',value, photosArr.length);
        value >= 0
            ? setValue(0)
            : setValue(value + 115)
    };
    const moveAhead = () => {
        console.log('mA',value, photosArr.length);
        console.log(photosArr.length * -100)
        value <= (photosArr.length - 5) * -115
            ? setValue(-115 * (photosArr.length - 5))
            : setValue(value - 115);
    };

    useEffect(() => {
        if (photosArr?.length) {
            setMainPhotoLink(photosArr[0]);
        }
    }, [photosArr]);

    if (photosArr && previewLink) {
        if (!photosArr.find((el) => el === 'previewIcon2.png')) {
            photosArr.push('previewIcon2.png');
        }
    }

    const changeMainPhoto = (e) => {
        const link = e.target.alt;
        setMainPhotoLink(link);
    };

    return (
        <Container>
            <Box className={styles.modelPageMainImg}>
                {mainPhotoLink !== 'previewIcon2.png' ? (
                    <MainPhoto mainPhotoLink={mainPhotoLink} />
                ) : (
                    <ViewPort />
                )}
            </Box>

            {/* МИНИАТЮРЫ ФОТО */}
            <Box component="div" className={styles.modelPageCarouselBox}>
                {/* КНОПКА НАЗАД */}
                <IconButton
                    // className={styles.modelPageCarouselBtn}
                    id="moveBehind"
                    onClick={moveBehind}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Stack className={styles.arr} direction="row" alignItems="center" spacing={2}>
                    {photosArr?.length
                        ? photosArr.map((el) => (
                              <Box
                                  key={el}
                                  className="glide"
                                  style={{ transform: `translateX(${value}%)` }}
                                  onClick={(e) => changeMainPhoto(e)}
                              >
                                  <img
                                      style={{
                                          width: '105px',
                                          height: '105px',
                                          objectFit: 'cover',
                                      }}
                                      src={'http://localhost:4000/' + el}
                                      alt={`${el}`}
                                      loading="lazy"
                                  />
                              </Box>
                          ))
                        : null}
                </Stack>

                {/* КНОПКА ВПЕРЕД */}
                <IconButton
                    // className={styles.modelPageCarouselBtn}
                    id="moveAhead"
                    onClick={moveAhead}
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
