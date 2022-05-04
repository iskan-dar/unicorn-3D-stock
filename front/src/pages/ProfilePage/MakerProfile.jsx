import React from 'react';
import './UserProfile.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MakerOrder from "../../components/MakerOrder/MakerOrder";
import { getCatalogItems } from "../../redux/actions/catalogAC";
import { getOrdersMaker } from "../../redux/actions/makerOrdersAC";
import $api from '../../http';
import { SET_USER } from '../../redux/actions/action.types';

const MakerProfile = () => {

	const userData = useSelector(store => store.user)
	const makerOrders = useSelector(store => store.makerOrders)
	const withOrderList = makerOrders.filter(item => item.orderNumber)
	const catalogItems = useSelector(store => store.catalogItems)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const resultList = withOrderList?.map(item => {
		let findItem = catalogItems.find(elem => item['PhysicalCopy.itemId'] === elem['PhysicalCopies.itemId'])
		return { ...item, photoUrl: findItem['Photos.photoUrl'], digitalPrice: findItem.digitalPrice, description: findItem.description, itemTitle: findItem.itemTitle }
	})

	React.useEffect(() => {
		dispatch(getCatalogItems());
		dispatch(getOrdersMaker(userData.id));
	}, [dispatch, userData.id]);

	const logOutHandler = () => {
		$api.post('/auth/logout').then((res) => {
			localStorage.removeItem('token');
			dispatch({ type: SET_USER, payload: {} });
			navigate('/auth/login');
		})
	}

	return (
		<>
			<div className="profileContainer">
				<div className='profileTitle'>My Profile</div>
				<div className="profileContent">
					<div className="profileInfo">
						{userData.avatarUrl ? (<img className='avatar' src={'http://localhost:4000/' + userData.avatarUrl + '.jpg'} />) :
							(<div className="avatar">{userData.firstName?.[0] + userData.lastName?.[0]}</div>)}
						<div className='profileName'>{userData.firstName} {userData.lastName}</div>
						<div className='profileEmail'>Maker</div>
						<div className="profileButton">
							<Link to='/profile/edit'><button className='buttonEdit'>Edit profile</button></Link>
							{userData.isMaker ? (<Link className='linkButton' to="/profile/maker"><button className='buttonFlag'>
								<img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonMaker' + '.png'} alt="ava" />
								Maker profile</button></Link>) : null}
							{userData.isCreator ? (<Link className='linkButton' to="/profile/creator"><button className='buttonFlag'>
								<img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonCreator' + '.png'} alt="ava" />
								Creator profile</button></Link>) : null}
							<button onClick={() => logOutHandler()} className='buttonLogout'>Log out</button>
						</div>
					</div>

					<div className="profileActions">
						<div className="actionsNavigations">
							<div className='actionsItem' >Orders</div>
						</div>
						<div className="actionsItems">
							<div className='itemProfileContent'>
								{resultList.map(cart => <MakerOrder order={cart} key={cart.id} />)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MakerProfile;
