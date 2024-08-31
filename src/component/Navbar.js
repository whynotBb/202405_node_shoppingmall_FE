import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUser } from "@fortawesome/free-regular-svg-icons";
import {
    faBars,
    faBox,
    faSearch,
    faShoppingBag,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { productActions } from "../action/productAction";

const Navbar = ({ user }) => {
    const dispatch = useDispatch();
    const { cartItemQty } = useSelector((state) => state.cart);
    // console.log("cartItemCount", cartItemQty);
    const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
    const [showSearchBox, setShowSearchBox] = useState(false);
    const menuList = ["All", "Top", "Dress", "Pants"];
    const [width, setWidth] = useState(0);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState({
        name: searchParams.get("name") || "",
        category: searchParams.get("category") || "",
    });

    useEffect(() => {
        const params = new URLSearchParams(searchQuery);
        navigate("?" + params.toString());
    }, [searchQuery, navigate]);

    useEffect(() => {
        const params = Object.fromEntries([...searchParams.entries()]);
        dispatch(productActions.getProductList(params));
        // console.log("searchParams", searchParams);
    }, [searchParams, dispatch]);

    const onCheckEnter = (event) => {
        if (event.key === "Enter") {
            setSearchQuery({
                ...searchQuery,
                name: event.target.value,
            });
            event.target.value = "";
        }
    };

    const logout = () => {
        dispatch(userActions.logout());
    };

    return (
        <div>
            {showSearchBox && (
                <div className="display-space-between mobile-search-box w-100">
                    <div className="search display-space-between w-100">
                        <div>
                            <FontAwesomeIcon
                                className="search-icon"
                                icon={faSearch}
                            />
                            <input
                                type="text"
                                placeholder="제품검색123"
                                onKeyPress={onCheckEnter}
                            />
                        </div>
                        <button
                            className="closebtn"
                            onClick={() => setShowSearchBox(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
            <div className="side-menu" style={{ width: width }}>
                <button className="closebtn" onClick={() => setWidth(0)}>
                    &times;
                </button>

                <div className="side-menu-list" id="menu-list">
                    {menuList.map((menu, index) => (
                        <button key={index}>{menu}</button>
                    ))}
                </div>
            </div>
            {user && user.level === "admin" && (
                <Link to="/admin/product?page=1" className="link-area">
                    ADMIN {">"}
                </Link>
            )}
            <div className="nav-header">
                <div className="burger-menu hide">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => setWidth(250)}
                    />
                </div>

                <div>
                    <div className="display-flex">
                        {user ? (
                            <div onClick={logout} className="nav-icon">
                                <FontAwesomeIcon icon={faUser} />
                                {!isMobile && (
                                    <span style={{ cursor: "pointer" }}>
                                        로그아웃
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div
                                onClick={() => navigate("/login")}
                                className="nav-icon"
                            >
                                <FontAwesomeIcon icon={faUser} />
                                {!isMobile && (
                                    <span style={{ cursor: "pointer" }}>
                                        로그인
                                    </span>
                                )}
                            </div>
                        )}
                        <div
                            onClick={() => navigate("/cart")}
                            className="nav-icon"
                        >
                            <FontAwesomeIcon icon={faShoppingBag} />
                            {!isMobile && (
                                <span style={{ cursor: "pointer" }}>
                                    쇼핑백
                                    <i className="shopping_bag_badge">
                                        {cartItemQty || 0}
                                    </i>
                                </span>
                            )}
                        </div>
                        <div
                            onClick={() => navigate("/account/purchase")}
                            className="nav-icon"
                        >
                            <FontAwesomeIcon icon={faBox} />
                            {!isMobile && (
                                <span style={{ cursor: "pointer" }}>
                                    내 주문
                                </span>
                            )}
                        </div>
                        <div
                            onClick={() => navigate("/event")}
                            className="nav-icon"
                        >
                            <FontAwesomeIcon icon={faCalendarCheck} />
                            {!isMobile && (
                                <span style={{ cursor: "pointer" }}>
                                    출석체크
                                </span>
                            )}
                        </div>
                        {isMobile && (
                            <div
                                className="nav-icon"
                                onClick={() => setShowSearchBox(true)}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="nav-logo">
                <Link to="/">
                    <img width={50} src="/image/logo.svg" alt="logo.svg" />
                </Link>
            </div>
            <div className="nav-menu-area">
                <ul className="menu">
                    {menuList.map((menu, index) => (
                        <li key={index}>
                            <span
                                onClick={() =>
                                    navigate(`/?category=${menu.toLowerCase()}`)
                                }
                            >
                                {menu}
                            </span>
                        </li>
                    ))}
                </ul>
                {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
                    <div className="search-box landing-search-box ">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="제품검색"
                            onKeyPress={onCheckEnter}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
