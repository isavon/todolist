import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { RoutePaths } from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setIsAuth, setIsLoaging, setUser } from '../store/reducers/authSlice';
import axios from 'axios';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.auth);

    const submitForm = async (values) => {
        try {
            dispatch(setIsLoaging(true));

            const { data } = await axios.get('./users.json');
            const user = data.find(item => item.username == values.username && item.password == values.password);

            if (user) {
                dispatch(setIsAuth(true));
                dispatch(setUser(user));
            } else {
                dispatch(setError('Wrong username or password!'));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setIsLoaging(false));
        }
    }

    useEffect(() => {
        dispatch(setError(''));
    }, []);

    return (
        <Form
            name="login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={submitForm}
        >
            {error && <Alert message={error} type="error" showIcon />}
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your Password" }]}
            >
                <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="Password" 
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>Log in</Button>
                Or <Link to={RoutePaths.MAIN}>Back Home</Link>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;