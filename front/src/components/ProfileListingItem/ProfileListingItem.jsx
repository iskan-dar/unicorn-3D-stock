import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileListingItem.css'

const ProfileListingItem = ({ item }) => {
	const navigate = useNavigate()
	return (
		<>
			<div className="listingItem">
				<div onClick={() => { navigate(`/models/${item.id}`) }} className="cartPicture">
					<img src={'http://localhost:4000/' + item?.['Photos.photoUrl']} alt="Картинка" />
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
						<div className="cartPlus">
							<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.414 14.0001L13.556 3.85808L12.142 2.44408L2 12.5861V14.0001H3.414ZM4.243 16.0001H0V11.7571L11.435 0.322083C11.6225 0.134612 11.8768 0.0292969 12.142 0.0292969C12.4072 0.0292969 12.6615 0.134612 12.849 0.322083L15.678 3.15108C15.8655 3.33861 15.9708 3.59292 15.9708 3.85808C15.9708 4.12325 15.8655 4.37756 15.678 4.56508L4.243 16.0001ZM0 18.0001H18V20.0001H0V18.0001Z" fill="white" />
							</svg>
						</div>
						Edit
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileListingItem;
