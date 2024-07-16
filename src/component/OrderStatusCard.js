import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

function formatDate(dateString) {
	const date = new Date(dateString);

	// 연도, 월, 일, 시간, 분을 직접 추출하여 형식을 맞추기
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	// 원하는 형식으로 문자열 반환
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const OrderStatusCard = ({ item }) => {
	// console.log("orderItem!!!", item);
	const dateString = item.createdAt;
	const formattedDate = formatDate(dateString);
	return (
		<div>
			<Row className="status-card">
				<Col xs={2}>
					<img src={item.items[0].productId.image} alt="" height={96} />
				</Col>
				<Col xs={8} className="order-info">
					<div>
						<strong>주문번호: {item.orderNum}</strong>
					</div>

					<div className="text-12">{formattedDate}</div>

					<div>
						{item.items[0].productId.name} {item.items.length > 1 && `외  ${item.items.length - 1} 개`}
					</div>
					<div>₩ {item.totalPrice.toLocaleString(3)}</div>
				</Col>
				<Col md={2} className="vertical-middle">
					<div className="text-align-center text-12">주문상태</div>
					<Badge bg={badgeBg[item.status]}>{item.status}</Badge>
				</Col>
			</Row>
		</div>
	);
};

export default OrderStatusCard;
