import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchItem from "../SearchItem/SearchItem";

const CollectionItems = () => {
    const catalogItems = useSelector((store) => store.catalogItems);
    const { colId } = useParams();

    const result = catalogItems.filter(el => el['Collection.id'] == colId)
    console.log(result);

    return (
        <>
            {result ? (
                <>
                    <Box className="wishContainer">
                        <Box className="wishListTitle" sx={{textAlign: 'center'}}>
                            Collection <br />
                            {result[0]?.['Collection.collectionName']} <br />
                        </Box>
                    </Box>
                    <Box className="sortedByCategories">
                        {result[0] &&
                            result.map((item) => (
                                <SearchItem key={item.id} item={item} />
                            ))}
                    </Box>
                </>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};

export default CollectionItems;
