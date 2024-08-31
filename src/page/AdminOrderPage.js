import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderDetailDialog from "../component/OrderDetailDialog";
import OrderTable from "../component/OrderTable";
import * as types from "../constants/order.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";
import { ColorRing } from "react-loader-spinner";

const AdminOrderPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const loading = useSelector((state) => state.order.loading);
    // console.log("어드민 오더 페이지!!!!!", orders);
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        orderNum: query.get("orderNum") || "",
    });
    const [open, setOpen] = useState(false);
    const totalPageNum = useSelector((state) => state.order.totalPageNum);
    const tableHeader = [
        "#",
        "Order#",
        "Order Date",
        "User",
        "Order Item",
        "Address",
        "Total Price",
        "Status",
    ];

    useEffect(() => {
        // console.log("query바뀜", searchQuery);
        dispatch(orderActions.getOrders({ ...searchQuery }));
    }, [query]);

    useEffect(() => {
        if (searchQuery.orderNum === "") {
            delete searchQuery.orderNum;
        }
        const params = new URLSearchParams(searchQuery);
        const queryString = params.toString();
        // console.log("queryString", queryString);
        navigate("?" + queryString);
    }, [searchQuery]);

    const openEditForm = (order) => {
        setOpen(true);
        dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
    };

    const handlePageClick = ({ selected }) => {
        setSearchQuery({ ...searchQuery, page: selected + 1 });
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!loading)
        return (
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        );

    return (
        <div className="locate-center">
            <Container>
                <div className="mt-2 display-center mb-2">
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="오더번호"
                        field="orderNum"
                    />
                </div>

                <OrderTable
                    header={tableHeader}
                    data={orders}
                    openEditForm={openEditForm}
                />
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPageNum}
                    forcePage={searchQuery.page - 1}
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
                    className="display-center list-style-none"
                />
            </Container>

            {open && (
                <OrderDetailDialog open={open} handleClose={handleClose} />
            )}
        </div>
    );
};

export default AdminOrderPage;
