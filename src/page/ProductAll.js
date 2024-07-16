import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Navbar } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";

const ProductAll = () => {
	const dispatch = useDispatch();
	const { productList } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(productActions.getProductList());
	}, []);
	return (
		<Container>
			<Row className="my-3">
				{productList.map((item, index) => (
					<Col md={3} sm={12} key={index}>
						<ProductCard item={item} key={index} />
					</Col>
				))}
			</Row>
			{/* <ReactPaginate
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
            /> */}
		</Container>
	);
};

export default ProductAll;
