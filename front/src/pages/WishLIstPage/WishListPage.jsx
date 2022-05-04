import React from 'react';
import SearchItem from "../../components/SearchItem/SearchItem";
import {Box} from "@mui/material";
import './WishListPage.css'
import {useDispatch, useSelector} from "react-redux";
import {getCatalogItems} from "../../redux/actions/catalogAC";
import {getUserWishes} from "../../redux/actions/wishAC";

const WishListPage = () => {

    const catalogItems = useSelector((store) => store.catalogItems);
    const user = useSelector((store) => store.user);
    const wishList = useSelector(store => store.wishes)

    const resultList = wishList?.map(item => {
      return   catalogItems.find(elem => elem.id === item.itemId)
    })

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCatalogItems());
        if (user.id) {
            dispatch(getUserWishes(user.id))
        }
    }, [dispatch, user.id]);

    return (
        <div>
            <div className="wishContainer">
                <div className="wishListTitle">
                    Wish List
                </div>
            </div>
            <Box className="sortedByCategories">
                { resultList.map((item) => (
                    <SearchItem key={item.id} item={item} />
                ))}
            </Box>
        </div>
    );
};

export default WishListPage;
