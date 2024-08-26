import React from 'react';
import { Layout } from 'antd';

export const HeaderCompo = () => {
    const { Header } = Layout;
    return (
        <>
            <Header className="bg-blue-600">
                <div className="flex justify-center text-white">Todo App</div>
            </Header>
        </>
    );
};
