import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
    // 리듀서에서 orderNum 가져오기
    const { orderNum } = useSelector((state) => state.order);
    // console.log(orderNum);
    //만약 주문번호가 없는상태로 이페이지에 왔다면 다시 메인페이지로 돌아가기
    if (orderNum === "") {
        return (
            <Container className="confirmation-page">
                <h1>주문 실패</h1>
                <div>
                    메인 페이지로 돌아가세요.
                    <Link to="/">메인페이지로 돌아가기</Link>
                </div>
            </Container>
        );
    }

    return (
        <Container className="confirmation-page">
            <img
                src="/image/greenCheck.png"
                width={100}
                className="check-image"
                alt="greenCheck.png"
            />
            <h2>예약이 완료됬습니다!</h2>
            <div>예약번호:{orderNum}</div>
            <div>
                예약 확인은 내 예약 메뉴에서 확인해주세요
                <div className="text-align-center">
                    <Link to={"/account/purchase"}>내 예약 바로가기</Link>
                </div>
            </div>
        </Container>
    );
};

export default OrderCompletePage;
