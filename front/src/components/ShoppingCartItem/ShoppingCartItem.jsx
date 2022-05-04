import React from 'react';

import './ShoppingCartItem.css'
import { useDispatch, useSelector } from "react-redux";
import { postAddQuantityItem, postDeleteItemCart, postDeleteQuantityItem } from "../../redux/actions/cartAC";
import { useNavigate } from "react-router-dom";


const ShoppingCartItem = ({ item, deleteItem }) => {

	const userData = useSelector(store => store.user)
	const cartList = useSelector(store => store.cart)
	const dispatch = useDispatch()

	// console.log('cartList',cartList )

	const deleteItemCart = (itemId) => {
		dispatch(postDeleteItemCart(userData.id, cartList, itemId))
	}


	const addQuantityItem = (itemId) => {
		dispatch(postAddQuantityItem(userData.id, itemId))
	}

	const deleteQuantityItem = (itemId) => {
		dispatch(postDeleteQuantityItem(userData.id, itemId))
	}

	const navigate = useNavigate()

	return (
		<>
			<div className="ShoppingCartItem">
				<div className="cartPicture" onClick={() => { navigate(`/models/${item['PhysicalCopy.itemId']}`) }}>
					<img src={'http://localhost:4000/' + item?.photoUrl} alt="Картинка" />
				</div>
				<div className="cartInformation">
					<div className="cartTitle">
						{item?.itemTitle}
					</div>
					<div className="cartDescription">
						{item?.description}
					</div>
					<div className="cartItemPrice">
						${item?.digitalPrice}
					</div>
				</div>

				<div className="cartFunctionalIcon">
					<div className="countFunctional">
						<div className='catrMinus' onClick={() => deleteQuantityItem(item.id)}>
							<svg width="17" height="4" viewBox="0 0 17 4" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 3.95988V0.879883H6.92H10.04H16.92V3.95988H10.04H6.92H0Z" fill="white" />
							</svg>
						</div>

						<div className="cartCount">
							{item.quantity}
						</div>

						<div className="cartPlus" onClick={() => addQuantityItem(item.id)}>
							<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 9.96V6.88H6.92V0H10.04V6.88H16.92V9.96H10.04V16.84H6.92V9.96H0Z" fill="white" />
							</svg>
						</div>
					</div>

					<div className="otherIcon">
						<div className="delIcon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10 11C11.657 11 13 12.343 13 14C13 14.85 12.647 15.616 12.08 16.162L10.17 18H13V20H7V18.276L10.693 14.721C10.883 14.538 11 14.283 11 14C11 13.448 10.552 13 10 13C9.448 13 9 13.448 9 14H7C7 12.343 8.343 11 10 11ZM16 11V15H18V11H20V20H18V17H14V11H16ZM2 10C2 12.527 3.171 14.78 5 16.246V18.662C2.011 16.933 0 13.702 0 10H2ZM10 0C15.185 0 19.449 3.947 19.95 9H17.938C17.446 5.054 14.08 2 10 2C7.25 2 4.824 3.387 3.385 5.5H6V7.5H0V1.5H2V4C3.824 1.57 6.729 0 10 0Z" fill="white" />
							</svg>
						</div>
						<div className="delIcon" onClick={() => deleteItemCart(item.id)}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 4H20V6H18V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V6H0V4H5V1C5 0.734784 5.10536 0.48043 5.29289 0.292893C5.48043 0.105357 5.73478 0 6 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V4ZM16 6H4V18H16V6ZM7 2V4H13V2H7Z" fill="white" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShoppingCartItem;
