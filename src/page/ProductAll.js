import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";

const ProductAll = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.product.error);
    const [query, setQuery] = useSearchParams();
    const { productList, totalPageNum } = useSelector((state) => state.product);
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        name: query.get("name") || "",
    }); //검색 조건들을 저장하는 객체
    // 처음 로딩하면 상품리스트 불러오기
    console.log(productList);
    useEffect(() => {
        dispatch(productActions.getProductList());
    }, []);
    useEffect(() => {
        dispatch(productActions.getProductList({ ...searchQuery }));
    }, [query]);

    useEffect(() => {
        //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
        if (searchQuery.name === "") {
            delete searchQuery.name;
        }
        console.log("searchQuery", searchQuery);
        // 객체를 쿼리 형태로 만들고 URLSearchParams > 스트링으로 바꿔 사용한다.
        const params = new URLSearchParams(searchQuery);
        const query = params.toString();
        console.log(query);
        navigate("?" + query);
    }, [searchQuery, location]);

    const handlePageClick = ({ selected }) => {
        //  쿼리에 페이지값 바꿔주기
        console.log(selected);
        setSearchQuery({ ...searchQuery, page: selected + 1 });
    };
    return (
        <Container>
            <Row className="my-3">
                {productList.map((item, index) => (
                    <Col md={3} sm={12}>
                        <ProductCard item={item} key={index} />
                    </Col>
                ))}
            </Row>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPageNum}
                forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                className="display-center list-style-none paginationWrap"
            />
        </Container>
    );
};

export default ProductAll;
