import React from 'react';
import { Avatar, Col, Layout, Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authSlice';
import { setVisible } from '../store/reducers/modalSlice';
import { PlusOutlined } from '@ant-design/icons';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector(state => state.auth);
    const menuItems = isAuth 
        ? [{label: 'Logout', onClick: () => dispatch(logout())}]
        : [{label: 'Login', onClick: () => navigate(RoutePaths.LOGIN)}];

    return (
        <Layout.Header>
            <Row justify="space-between">
                <Col>
                    {isAuth && 
                        <Menu theme="dark" mode="horizontal" selectable={false} items={[
                            {label: 'New Todo List', icon: <PlusOutlined />, onClick: () => dispatch(setVisible(true))},
                        ]} />
                    }
                </Col>
                <Col style={{display: 'flex'}}>
                    {isAuth && <div className="logo"><Avatar>{user.username[0].toUpperCase()}</Avatar></div>}
                    <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems} />
                </Col>
            </Row>
        </Layout.Header>
    );
}

export default Navbar;