import * as React from 'react';
import ShoppingCartItem from '../../components/ShoppingCartItem/ShoppingCartItem';

import './ShoppingCartPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getCartItemsByUser, postAddOrderCart} from "../../redux/actions/cartAC";
import {useNavigate} from "react-router-dom";
import {getCatalogItems} from "../../redux/actions/catalogAC";

const ShoppingCartPage = () => {

    const userData = useSelector(store => store.user)
    const cartList = useSelector(store => store.cart)
    const notOrderList = cartList.filter(item => !item.orderNumber)
    const catalogItems = useSelector(store => store.catalogItems)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const cartListFilter = cartList.filter(el => !el.orderNumber)
    // console.log('cartListFilter================', cartListFilter)

    React.useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getCartItemsByUser(userData.id));
    }, [dispatch, userData.id]);

    const addOrderCart = (e) => {
        e.preventDefault()
        dispatch(postAddOrderCart(userData.id, cartListFilter))
        navigate('/profile')
    }

    const resultList = notOrderList?.map(item => {
        let findItem = catalogItems.find(elem => item['PhysicalCopy.itemId'] === elem['PhysicalCopies.itemId'])
        return  {...item, photoUrl: findItem?.['Photos.photoUrl'], digitalPrice:  findItem?.digitalPrice, description:findItem?.description , itemTitle: findItem?.itemTitle}
    })

    const modelsPrice = resultList.reduce((sum, current) => {
       return sum + (current?.digitalPrice * current.quantity)
       // return  sum + current.digitalPrice
    },0)

    const optionsPrice = resultList.reduce((sum, current) => {
        return sum + ( +current['PhysicalCopy.price'] * current.quantity)
        // return  sum + current.digitalPrice
    },0)

    return (
        <>
            <div className="shoppingCardContainer">
                <div className="shoppingCardTitle">Shopping Cart</div>
                <div className="cartActions">
                    <div className="cartActionsItem">
                        <div className="circleActionsItem activeCircle">1</div>
                    </div>
                    <div className="cartActionsItem activeActionsItem">Card</div>
                    <div className="cartActionsItem">
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1997 4.59865L8.0354 0.960119C7.83577 0.785693 7.81534 0.482461 7.98976 0.282832C8.16419 0.0832033 8.46742 0.0627726 8.66705 0.237199L13.787 4.71082C13.7884 4.71197 13.7897 4.71312 13.791 4.71428C13.8935 4.80231 13.9585 4.9329 13.9585 5.07865C13.9585 5.25719 13.861 5.41295 13.7164 5.49565L8.66756 9.91967C8.46818 10.0944 8.16492 10.0744 7.99021 9.875C7.8155 9.67561 7.8355 9.37235 8.03488 9.19765L12.1878 5.55865L0.841075 5.55865C0.575978 5.55865 0.361074 5.34375 0.361074 5.07865C0.361074 4.81356 0.575978 4.59865 0.841075 4.59865L12.1997 4.59865Z" fill="#919EAB"/>
                        </svg>
                    </div>
                    <div className="cartActionsItem">
                        <div className="circleActionsItem">2</div>
                    </div>
                    <div className="cartActionsItem">Customer Information</div>
                    <div className="cartActionsItem">
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1997 4.59865L8.0354 0.960119C7.83577 0.785693 7.81534 0.482461 7.98976 0.282832C8.16419 0.0832033 8.46742 0.0627726 8.66705 0.237199L13.787 4.71082C13.7884 4.71197 13.7897 4.71312 13.791 4.71428C13.8935 4.80231 13.9585 4.9329 13.9585 5.07865C13.9585 5.25719 13.861 5.41295 13.7164 5.49565L8.66756 9.91967C8.46818 10.0944 8.16492 10.0744 7.99021 9.875C7.8155 9.67561 7.8355 9.37235 8.03488 9.19765L12.1878 5.55865L0.841075 5.55865C0.575978 5.55865 0.361074 5.34375 0.361074 5.07865C0.361074 4.81356 0.575978 4.59865 0.841075 4.59865L12.1997 4.59865Z" fill="#919EAB"/>
                        </svg>
                    </div>
                    <div className="cartActionsItem">
                        <div className="circleActionsItem">3</div>
                    </div>
                    <div className="cartActionsItem ">Payment</div>
                </div>

                <div className="shoppingCartContent">
                    <div className="shoppingList">

                        {resultList.map(item =>
                            <ShoppingCartItem item={item} key={item.id}/>
                        )}
                    </div>

                    <div className="orderSummary">
                        <div className="orderSummaryContent">
                            <div className="orderSummaryHeader">
                                Order Summary
                            </div>
                            <div className="orderPrice">
                                <p>Models price</p>
                                <p className='boltPrice'>${modelsPrice.toFixed(2)}</p>
                            </div>
                            <div className="orderPrice">
                                <p>Options Price</p>
                                <p className='boltPrice'>${optionsPrice.toFixed(2)}</p>
                            </div>
                            <div className="orderPrice bolt">
                                <p>Order Total</p>
                                <p className='boltPrice'>${(modelsPrice + optionsPrice).toFixed(2)}</p>
                            </div>


                            <form onSubmit={ addOrderCart}>
                                <div className="noteOrder">
                                    <div className="nodeOrderTitle">
                                        Write a note
                                    </div>
                                    <textarea className='noteOrderArea' name="noteOrder" id="" cols="30" rows="10" placeholder='Text here' ></textarea>
                                </div>
                                <button  className='proceed' >Proceed to Checkout</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCartPage;
