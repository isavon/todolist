import React, { useEffect } from 'react';
import { Layout } from 'antd';
import './App.scss';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';

const App = () => 
<Layout>
    <Navbar />
    <Layout.Content className="main-layout">
        <AppRouter />
    </Layout.Content>
</Layout>

export default App;