import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    console.log(item);
    const showProduct = (id) => {
        // 상품 디테일 페이지로 가기
        navigate(`/product/${id}`);
    };
    return (
        <div className="card" onClick={() => showProduct(item._id)}>
            <img src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>₩ {item.price.toLocaleString(3)}</div>
        </div>
    );
};

export default ProductCard;
