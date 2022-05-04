import React, { useEffect, useState } from 'react';
import '../UserProfile.css'
import './EditProfile.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, submitEditUser } from "../../../redux/actions/userAC";
import $api from '../../../http';
import { SET_USER } from '../../../redux/actions/action.types';

const EditProfile = () => {
	const userData = useSelector(store => store.user)
	const dispatch = useDispatch()
	const [userProfile, setUserProfile] = useState(userData)
	const navigate = useNavigate()

	const submitEditProfile = async (e) => {
		e.preventDefault()
		dispatch(submitEditUser(userProfile))
		dispatch(setUser(userProfile))
	}

	const changeInputsValue = (e) => {
		setUserProfile(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
	}

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
						<div className='profileEmail'>{userData.email}</div>
						<div className="profileButton">
							<Link to='/profile/edit'><button className='buttonEdit'>Edit profile</button></Link>
							{userData.isMaker ? (<Link className='linkButton' to="/profile/maker"><button className='buttonFlag'>
								<img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonMaker' + '.png'} alt="ava" />
								Maker profile
							</button></Link>) : null}
							{userData.isCreator ? (<Link className='linkButton' to="/profile/creator"><button className='buttonFlag'>
								<img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonCreator' + '.png'} alt="ava" />
								Creator profile
							</button></Link>) : null}
							<Link className='linkButton' to="/profile"><button className='buttonFlag'>
								<img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonUser' + '.png'} alt="ava" />
								<p>User profile</p>
							</button></Link>
							<button onClick={() => logOutHandler()} className='buttonLogout'>Log out</button>
						</div>
					</div>

					<div className="profileActions">
						<div className="actionsNavigations">
							<div className='actionsItem'>Edit profile</div>
						</div>
						<div className="actionsItems">
							<form encType="multipart/form-data"
								onSubmit={submitEditProfile}>
								<div className="editItems">
									<div className="labelInput">
										<label htmlFor="firstName">First name</label>
										<input className='editInput' type="text" id='firstName' name='firstName'
											// onChange={(e) => dispatch(editingTypingProfile(e))}
											onChange={changeInputsValue}
											value={userProfile.firstName} />
									</div>

									<div className="labelInput">
										<label htmlFor="lastName">Last name</label>
										<input className='editInput' type="text" id='lastName' name='lastName'
											// onChange={(e) => dispatch(editingTypingProfile(e))}
											onChange={changeInputsValue}
											value={userProfile.lastName} />
									</div>

									<div className="labelInput">
										<label htmlFor="inputEmail">Your email</label>
										<input className='editInput' type="email" id='inputEmail' name='email'
											// onChange={(e) => dispatch(editingTypingProfile(e))}
											onChange={changeInputsValue}
											value={userProfile.email} />
									</div>

									<div className="labelInput">
										<label htmlFor="inputTel">Phone number</label>
										<input className='editInput' type="tel" id='inputTel' name='phone'
											// onChange={(e) => dispatch(editingTypingProfile(e))}
											onChange={changeInputsValue}
											value={userProfile.phone} />
									</div>

								</div>
								<button className='buttonFlag saveProfile'>
									<p>Save</p>
								</button>
							</form>

							<div className="labelInput addAvatar">
								<label htmlFor="inputAvatar">Аватар</label>
								<input type="file" id='inputAvatar' name='avatar' accept="image/*" />
								<button className='buttonFlag saveProfile'>
									<p>Add avatar</p>
								</button>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
