import React, { useEffect, useState } from 'react';
import { Col, Layout, Row } from 'antd';
import { FaSun } from 'react-icons/fa';
import { FiMoon } from 'react-icons/fi';
export const HeaderCompo = () => {
    const { Header } = Layout;
    const [theme, setTheme] = useState(false);
    const [themeColor, setThemeColor] = useState(localStorage.getItem('theme') || 'light');

    //theme change and theme persist
    useEffect(() => {
        document.documentElement.classList.toggle('dark', themeColor === 'dark');
        setTheme(themeColor === 'light' ? false : true);
        localStorage.setItem('theme', themeColor);
    }, [themeColor]);
    return (
        <>
            <Header className="bg-blue-600 !sticky">
                <Row gutter={(16, 16)} className="flex justify-center">
                    <Col span={20} className="flex justify-center">
                        <span className="ms-10 items-center mt-4 text-white text-sm font-bold md:text-xl">
                            Todo Application
                        </span>
                    </Col>
                    <Col span={4} className="mt-4">
                        <span
                            className="!float-right text-center cursor-pointer"
                            onClick={() => {
                                setTheme(!theme);
                                setThemeColor(themeColor === 'light' ? 'dark' : 'light');
                            }}>
                            {theme ? (
                                <FiMoon size={25} color="white" />
                            ) : (
                                <FaSun size={25} color="white" />
                            )}
                        </span>
                    </Col>
                </Row>
            </Header>
        </>
    );
};
