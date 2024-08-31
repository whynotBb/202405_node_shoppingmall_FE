import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import * as types from "../constants/order.constants";
import { useDispatch, useSelector } from "react-redux";
import { pointActions } from "../action/pointAction";

const OrderReceipt = ({ cartList, totalPrice }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [paymentAmount, setPaymentAmount] = useState(totalPrice);
    const { totalPoint } = useSelector((state) => state.point);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        dispatch(pointActions.getTotalPoints());
    }, []);
    const usePoint = (e) => {
        const value = e.target.value;
        // console.log("usePoint", value);
        if (value > totalPoint) {
            setInputValue(totalPoint);
            setPaymentAmount(totalPrice - totalPoint);
        } else {
            setInputValue(value);
            setPaymentAmount(totalPrice - value);
        }
    };
    const useAllPoint = () => {
        setInputValue(totalPoint);
        setPaymentAmount(totalPrice - totalPoint);
    };
    useEffect(() => {
        dispatch({
            type: types.SET_PAYMENT_AMOUNT,
            payload: Number(paymentAmount),
        });
        dispatch({ type: types.SET_USE_POINT, payload: Number(inputValue) });
    }, [inputValue]);
    return (
        <div className="receipt-container">
            <h3 className="receipt-title">주문 내역</h3>
            <ul className="receipt-list">
                {cartList === null ? (
                    <li>장바구니가 비어있습니다.</li>
                ) : (
                    cartList.map((item, index) => (
                        <li key={index}>
                            <div className="display-flex space-between">
                                <div>{item.productId.name}</div>
                                <div>
                                    ₩ {item.productId.price.toLocaleString(3)}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div className="display-flex space-between receipt-title">
                <div>
                    <strong>Total</strong>
                </div>
                <div>
                    <strong>₩ {totalPrice.toLocaleString(3)}</strong>
                </div>
            </div>
            {location.pathname.includes("/payment") && (
                <>
                    <div className="point_box">
                        <div className="display-flex space-between ">
                            <div>
                                <strong>보유포인트</strong>
                            </div>
                            <div>
                                <strong>{totalPoint?.toLocaleString(3)}</strong>
                            </div>
                        </div>
                        <div className="display-flex space-between ">
                            <div></div>
                            <div>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={usePoint}
                                />
                                <span
                                    className="btn_point"
                                    onClick={useAllPoint}
                                >
                                    전액사용
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="display-flex space-between receipt-title">
                        <div>
                            <strong>결제금액</strong>
                        </div>
                        <div>
                            <strong>₩ {paymentAmount.toLocaleString(3)}</strong>
                        </div>
                    </div>
                </>
            )}
            {cartList?.length > 0 && location.pathname.includes("/cart") && (
                <Button
                    variant="dark"
                    className="payment-button"
                    onClick={() => navigate("/payment")}
                >
                    결제 계속하기
                </Button>
            )}

            <div>
                가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및
                배송료는 확인되지 않습니다.
                <div>
                    30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가
                    배송 요금 읽어보기 반품 및 환불
                </div>
            </div>
        </div>
    );
};

export default OrderReceipt;
