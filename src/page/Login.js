import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { GoogleLogin } from "@react-oauth/google";

import "../style/login.style.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useSelector((state) => state.user.error);

    const loginWithEmail = (event) => {
        event.preventDefault();
        //이메일,패스워드를 가지고 백엔드로 보내기
        dispatch(userActions.loginWithEmail({ email, password }));
    };

    const handleGoogleLogin = async (googleData) => {
        // 구글로 로그인 하기
        // console.log("googleData", googleData);
        dispatch(userActions.loginWithGoogle(googleData.credential));
    };

    // if (user) {
    //     navigate("/");
    // }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // 컴포넌트가 시작될때 에러가 있으면 지우기
    useEffect(() => {
        dispatch(userActions.clearError());
    }, [dispatch]);
    return (
        <>
            <Container className="login-area">
                {error && (
                    <div className="error-message">
                        <Alert variant="danger">{error}</Alert>
                    </div>
                )}
                <Form className="login-form" onSubmit={loginWithEmail}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </Form.Group>
                    <div className="display-space-between login-button-area">
                        <Button variant="danger" type="submit">
                            Login
                        </Button>
                        <div>
                            아직 계정이 없으세요?
                            <Link to="/register">회원가입 하기</Link>{" "}
                        </div>
                    </div>

                    <div className="text-align-center mt-2">
                        <p>-외부 계정으로 로그인하기-</p>
                        <div className="display-center">
                            {/* TODO
                                1. 구글로그인 버튼 가져오기
                                2. 구글 Oauth로그인을 위해 구글 api 가입 및 클라이언트키, 시크릿키 받아오기
                                3. 로그인 기능 구현
                                4. BE 
                                    a. 이미 로그인 한 적이 있는 유저 -> 로그인 시키고, 토큰값 주기
                                    b. 처음 로그인 시도한 유저 -> 유저정보 생성 > 토큰값 주기
                            */}
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    // console.log("Login Failed");
                                }}
                            />
                        </div>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default Login;
