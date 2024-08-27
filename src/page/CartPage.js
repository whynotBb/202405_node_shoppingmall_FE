import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";
import { ColorRing } from "react-loader-spinner";

const CartPage = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.cart);
	const { cartList, totalPrice } = useSelector((state) => state.cart);
	console.log("cart page : ", cartList);
	useEffect(() => {
		//카트리스트 불러오기
		dispatch(cartActions.getCartList());
	}, []);
	if (!loading) return <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />;
	return (
		<Container>
			<Row>
				<Col xs={12} md={7}>
					{cartList === null || cartList.length === 0 ? (
						<div className="text-align-center empty-bag">
							<h2>카트가 비어있습니다.</h2>
							<div>상품을 담아주세요!</div>
						</div>
					) : (
						cartList.map((item, index) => <CartProductCard item={item} key={index} />)
					)}
				</Col>
				<Col xs={12} md={5}>
					<OrderReceipt cartList={cartList} totalPrice={totalPrice} />
				</Col>
			</Row>
		</Container>
	);
};

export default CartPage;
