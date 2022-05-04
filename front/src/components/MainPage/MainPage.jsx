import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from './MainPage.module.css';
import CollectionGrid from '../CollectionGrid/CollectionGrid';
import CatalogCardMainPage from '../CatalogCardMainPage/CatalogCardMainPage';
import { getCatalogItems } from '../../redux/actions/catalogAC';
import { v4 as uuidv4 } from 'uuid';

const MainPage = () => {
    const catalogItems = useSelector((store) => store.catalogItems);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box className={styles.mainPic} >
                    <Box
                        sx={{
                            position: 'absolute',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 10,
                        }}
                    >
                        <Box component="h2" sx={{ width: '10rem', mb: 0 }}>
                            Print your adventure
                        </Box>
                        <Box sx={{ width: '8rem', mt: 2, mb: 2, fontSize: 12 }}>
                            Introducing our brand new collection
                        </Box>
                        <Button
                            sx={{ bgcolor: 'secondary.main', color: 'white' }}
                        >
                            PLACE YOUR ORDER
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        width: '85%',
                    }}
                >
                    <Box className="1" sx={{ mt: '2rem' }}>
                        <Box
                            sx={{
                                m: '2rem 0 2rem',
                                fontSize: 22,
                                fontWeight: 'bold',
                            }}
                        >
                            Our collections
                        </Box>
                        <Box>
                            <CollectionGrid />
                        </Box>
                    </Box>
                    <Box className="2">
                        <Box
                            sx={{
                                m: '2rem 0 2rem',
                                fontSize: 22,
                                fontWeight: 'bold',
                            }}
                        >
                            Catalog
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {catalogItems &&
                                catalogItems.map((el) => (
                                    <CatalogCardMainPage
                                        key={uuidv4()}
                                        item={el}
                                    />
                                ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MainPage;
