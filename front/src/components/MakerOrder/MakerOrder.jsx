import React from 'react';
import './MakerOrder.css'
import { useNavigate } from "react-router-dom";

const MakerOrder = ({ order }) => {

	const navigate = useNavigate()

	return (
		<>
			<div className="orderItem">
				<div className="orderPicture" onClick={() => { navigate(`/models/${order['PhysicalCopy.itemId']}`) }}>
					<img className='pictureOrder' src={'http://localhost:4000/' + order?.photoUrl} alt="rfhnbyrf" />
					<div className="orderCount">
						+ {order?.quantity}
					</div>
				</div>
				<div className="orderStatus">
					<p>Order track number: {order?.orderNumber}</p>
					<p>{order?.itemTitle}</p>
					<div className="orderData">
						<p>Order date: {order?.createdAt.slice(0, 10)}</p>
						<p>Color: {order?.['PhysicalCopy.color']}</p>
						<p>Scale: {order?.['PhysicalCopy.scale']}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default MakerOrder;
