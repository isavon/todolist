import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../routes';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Result 
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => navigate(RoutePaths.MAIN)}>Back Home</Button>}
        />
    );
}

export default PageNotFound;