import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";
import ProductTable from "../component/ProductTable";
import { logRoles } from "@testing-library/react";

const AdminProduct = () => {
    const navigate = useNavigate();
    const { productList, totalPageNum } = useSelector((state) => state.product);
    console.log("admin!!!!!!!!!", productList, totalPageNum);
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        name: query.get("name") || "",
    }); //검색 조건들을 저장하는 객체

    const [mode, setMode] = useState("new");
    const tableHeader = [
        "#",
        "Sku",
        "Name",
        "Price",
        "Stock",
        "Image",
        "Status",
        "",
    ];
    // 페이지 열리면 상품 보여주기
    useEffect(() => {
        dispatch(productActions.getProductList({ ...searchQuery }));
    }, [query]);

    useEffect(() => {
        //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
        if (searchQuery.name === "") {
            delete searchQuery.name;
        }
        console.log(searchQuery);
        // 객체를 쿼리 형태로 만들고 URLSearchParams > 스트링으로 바꿔 사용한다.
        const params = new URLSearchParams(searchQuery);
        const query = params.toString();
        console.log(query);
        navigate("?" + query);
    }, [searchQuery]);

    const deleteItem = (id) => {
        //아이템 삭제하가ㅣ
    };

    const openEditForm = (product) => {
        //edit모드로 설정하고
        // 아이템 수정다이얼로그 열어주기
    };

    const handleClickNewItem = () => {
        //new 모드로 설정하고
        setMode("new");
        // 다이얼로그 열어주기
        setShowDialog(true);
    };

    const handlePageClick = ({ selected }) => {
        //  쿼리에 페이지값 바꿔주기
        console.log(selected);
        setSearchQuery({ ...searchQuery, page: selected + 1 });
    };
    // searchbox 의 값을 읽어온다. > 엔터 치면, searchQuery 객체가업데이트됨 > searchQuery 객체 안에 아이템 기준으로 url 을 새로 생성하여 호출한다. &name = 스트레이트+팬츠
    // url 쿼리 읽어오기 > url 쿼리 기준으로 BE에 검색조건과 함께 호출
    return (
        <div className="locate-center">
            <Container>
                <div className="mt-2">
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="제품 이름으로 검색"
                        field="name"
                    />
                </div>
                <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
                    Add New Item +
                </Button>

                <ProductTable
                    header={tableHeader}
                    data={productList}
                    deleteItem={deleteItem}
                    openEditForm={openEditForm}
                />
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

            <NewItemDialog
                mode={mode}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </div>
    );
};

export default AdminProduct;
