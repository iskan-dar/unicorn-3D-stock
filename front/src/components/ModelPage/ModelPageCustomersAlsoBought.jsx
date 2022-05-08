import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import CatalogCardItem from "../CatalogCardItem/CatalogCardItem";
import { Container, Typography, Box } from "@mui/material";

export default function ModelPageCustomersAlsoBought({ id }) {
    const [alsoBuy, setAlsoBuy] = useState([]);

    useEffect(() => {
        const modelId = id;
        axios
            .get("http://localhost:4000/items", modelId)
            .then((response) => setAlsoBuy(response.data));
    }, []);

    return (
        <Container maxWidth="xl">
            <Typography sx={{ fontWeight: "bold" }}>
                Customers also bought these
            </Typography>

            <Box className={styles.modelPageAlsoBuyBox}>
                {alsoBuy.map((el) => (
                    <CatalogCardItem key={el.id} card={el} />
                ))}
            </Box>
        </Container>
    );
}
