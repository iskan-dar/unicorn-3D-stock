import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addModelToCart } from "../../redux/actions/cartAC";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Typography,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import { deleteWish, saveWish } from "../../redux/actions/wishAC";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: "white",
                },
            },
        },
    },
});

export default function ModalPageForm({ model, user }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [inputs, setInputs] = useState({});
    const [totalCost, setTotalCost] = useState({ value: 0 });
    const [quantity, setQuantity] = useState({ value: Number(1) }); // счетчик количества
    const [wished, setWished] = useState(false);
    const wishes = useSelector((store) => store.wishes);

    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: "top",
        horizontal: "center",
    });

    useEffect(() => {
        if (model.digitalPrice) {
            setTotalCost({ value: model.digitalPrice });
        }
    }, [model.digitalPrice]);

    useEffect(() => {
        return inputs.scale
            ? setTotalCost({
                  value: (
                      parseFloat(model.digitalPrice + inputs.scale) *
                      Number(quantity.value)
                  ).toFixed(2),
              })
            : setTotalCost({
                  value: (
                      parseFloat(model.digitalPrice) * Number(quantity.value)
                  ).toFixed(2),
              });
    }, [inputs.scale, model.digitalPrice, quantity.value]);

    useEffect(() => {
        setWished(wishes.find((el) => el.itemId == id));
    }, [id, wishes]);

    const { vertical, horizontal, snackOpen } = snackState;

    const handleSnackClick = (newState) => () => {
        setSnackState({ snackOpen: true, ...newState });
    };

    const handleSnackClose = () => {
        setSnackState({ ...snackState, snackOpen: false });
    };

    const wishHandler = () => {
        dispatch(saveWish(user.id, id));
    };

    const unWishHandler = () => {
        const targetWish = wishes.find((el) => el.itemId === +id);
        dispatch(deleteWish(targetWish.id));
    };

    // Выбор цвета модели
    const colorSelectHandler = (event) => {
        setInputs((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    // Выбор масштаба модели
    const scaleSelectHandler = (event) => {
        setInputs((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
        setTotalCost({ value: model.digitalPrice + event.target.value });
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

        dispatch(addModelToCart(event, formData));
        setInputs({});
        setQuantity({ value: Number(1) });
        setTotalCost({ value: Number(model.digitalPrice) });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                component='form'
                onSubmit={addToCartHandler}
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Typography className={styles.modelPageModelTitle}>
                    {model.itemTitle}
                </Typography>

                {model.digitalPrice ? (
                    <Typography
                        className={styles.modelPageModelTotalCost}
                        variant='h4'
                    >
                        {totalCost.value} USD
                    </Typography>
                ) : (
                    <Box>
                        {" "}
                        <CircularProgress sx={{ color: "blue" }} />{" "}
                    </Box>
                )}

                <Card className={styles.modelPageModelBuyDigital}>
                    <CardContent>
                        <Stack spacing={1} direction='row'>
                            <LibraryAddCheckOutlinedIcon
                                sx={{ color: "blue" }}
                            />

                            <Typography variant='h6' component='b'>
                                Digital copy available
                            </Typography>
                        </Stack>

                        <Typography color='#6B7280'>
                            You can buy a Digital version of this model. The
                            priceis fixed, the ability to select options is not
                            available.
                        </Typography>
                    </CardContent>

                    <Box className={styles.modelPageModelBuyDigitalBtn}>
                        <Button className={styles.modelPageBuyButton}>
                            {" "}
                            Buy digital for {model.digitalPrice} USD{" "}
                        </Button>
                    </Box>
                </Card>

                {/* COLOR SELECTOR */}
                <Box className={styles.attrBox}>
                    <Stack
                        spacing={1}
                        direction='row'
                        style={{ marginBottom: "30px" }}
                    >
                        <LibraryAddCheckOutlinedIcon sx={{ color: "blue" }} />

                        <Typography variant='h6' component='b'>
                            Physical copy
                        </Typography>
                    </Stack>
                    <Typography sx={{ marginBottom: "15px" }}>
                        {" "}
                        Color{" "}
                    </Typography>
                    <FormControl
                        sx={{
                            color: "#1F2937",
                            marginBottom: "40px",
                            width: "100%",
                            backgroundColor: "#141517",
                            color: "#FFFFFF",
                            borderRadius: "12px",
                        }}
                        size='small'
                    >
                        <Select
                            name='color'
                            id='color-select'
                            value={inputs.color ?? "Choose option"}
                            renderValue={(selected) => selected}
                            onChange={colorSelectHandler}
                            className={styles.modelPageSelect}
                        >
                            <MenuItem value={model?.["PhysicalCopies.color"]}>
                                {model?.["PhysicalCopies.color"]}
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {/* SCALE SELECTOR */}
                    <Typography sx={{ marginBottom: "15px" }}>
                        {" "}
                        Scale{" "}
                    </Typography>
                    <FormControl
                        sx={{
                            marginBottom: "40px",
                            width: "100%",
                            backgroundColor: "#141517",
                            color: "#FFFFFF",
                            borderRadius: "12px",
                        }}
                        size='small'
                    >
                        <Select
                            name='scale'
                            id='scale-select'
                            value={inputs.scale ?? "Choose option"}
                            renderValue={(selected) => selected}
                            onChange={scaleSelectHandler}
                            className={styles.modelPageSelect}
                        >
                            <MenuItem
                                value={Number(model?.["PhysicalCopies.price"])}
                            >
                                {model?.["PhysicalCopies.scale"]} -{" "}
                                {model?.["PhysicalCopies.price"]} $
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Typography> Quantity </Typography>

                    <Box className={styles.modelPageCounter} component='div'>
                        <IconButton
                            color='inherit'
                            disabled={quantity.value === 1}
                            onClick={() => {
                                setQuantity({
                                    value: quantity.value - Number(1),
                                });
                            }}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography> {quantity.value} </Typography>
                        <IconButton
                            color='inherit'
                            disabled={!inputs.scale}
                            onClick={() => {
                                setQuantity({
                                    value: quantity.value + Number(1),
                                });
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Stack
                        spacing={2}
                        direction='row'
                        container='true'
                        justifyContent='center'
                    >
                        <Button
                            disabled={!inputs.scale || !inputs.color}
                            type='submit'
                            className={styles.modelPageAddToCartButton}
                            size='large'
                            variant='contained'
                            onClick={handleSnackClick({
                                vertical: "top",
                                horizontal: "right",
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
                            <Alert
                                onClose={handleSnackClose}
                                severity='success'
                                sx={{ width: "100%" }}
                            >
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
            </Box>
        </ThemeProvider>
    );
}
