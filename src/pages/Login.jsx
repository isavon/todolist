import React from 'react';
import { Card, Row } from 'antd';
import LoginForm from '../components/LoginForm';

const Login = () => 
    <Row justify="center" align="middle" className="login-form-wrapper">
        <Card>
            <LoginForm />
        </Card>
    </Row>

export default Login;