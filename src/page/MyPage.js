import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { ColorRing } from "react-loader-spinner";

const MyPage = () => {
	const dispatch = useDispatch();
	const { orderList, loading, error } = useSelector((state) => state.order);

	// console.log("MyPage!!!", orderList);
	//오더리스트 들고오기 getOrderList
	useEffect(() => {
		dispatch(orderActions.getOrderList());
	}, []);
	if (!loading) return <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />;
	// 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
	if (!orderList)
		return (
			<Container>
				<div>주문한 상품이 없습니다</div>
			</Container>
		);

	return (
		<Container className="status-card-container">
			{orderList?.map((item, index) => (
				<OrderStatusCard key={index} item={item} />
			))}
		</Container>
	);
};

export default MyPage;
