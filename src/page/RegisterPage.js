import React, {useState} from 'react';
import {Container, Form, Button, Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {userActions} from '../action/userAction';
import '../style/register.style.css';
import api from '../utils/api';
const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        policy: false,
    });
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [policyError, setPolicyError] = useState(false);
    const error = useSelector((state) => state.user.error);

    const register = async (event) => {
        event.preventDefault();
        console.log(formData);

        const {email, name, password, confirmPassword, policy} = formData;
        // 비번 중복확인 일치하는지 확인
        if (password !== confirmPassword) {
            setPasswordError('비밀번호를 확인해주세요.');
            return;
        }
        // 이용약관에 체크했는지 확인
        if (!policy) {
            setPolicyError(true);
            return;
        }

        // FormData에 있는 값을 가지고 백엔드로 넘겨주기
        //성공후 로그인 페이지로 넘어가기
        setPasswordError('');
        setPolicyError(false);
        dispatch(userActions.registerUser({email, name, password}, navigate));
        // try {
        //     const response = await api.post('/user', {email, name, password});
        //     if (response.status === 200) {
        //         console.log('success!');
        //         navigate('/login');
        //     } else {
        //         console.log('fail!');
        //     }
        // } catch (error) {
        //     console.log('error!', error.message);
        // }
    };

    const handleChange = (event) => {
        event.preventDefault();
        // 값을 읽어서 FormData에 넣어주기
        // console.log(event.target.id, event.target.value, event.target.checked);
        // const id = event.target.id;
        // const value = event.target.value;
        // 아래와 같이 불러올 수 있다.
        const {id, value, checked} = event.target;
        if (id === 'policy') {
            setFormData({
                ...formData,
                [id]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    return (
        <Container className='register-area'>
            {error && (
                <div>
                    <Alert variant='danger' className='error-message'>
                        {error}
                    </Alert>
                </div>
            )}
            <Form onSubmit={register}>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' id='email' placeholder='Enter email' onChange={handleChange} required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' id='name' placeholder='Enter name' onChange={handleChange} required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        id='password'
                        placeholder='Password'
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        onChange={handleChange}
                        required
                        isInvalid={passwordError}
                    />
                    <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Check
                        type='checkbox'
                        label='이용약관에 동의합니다'
                        id='policy'
                        onChange={handleChange}
                        isInvalid={policyError}
                    />
                </Form.Group>
                <Button variant='danger' type='submit'>
                    회원가입
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
