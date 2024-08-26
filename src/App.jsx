import React from 'react';
import { Flex, Layout } from 'antd';
import { HeaderCompo } from './Components/HeaderCompo';
import { ContentCompo } from './Components/Content/ContentCompo';
function App() {
    const { Header, Footer, Sider, Content } = Layout;
    return (
        <>
            <Flex gap="middle" wrap>
                <Layout>
                    <HeaderCompo />
                    <ContentCompo />
                </Layout>
            </Flex>
        </>
    );
}

export default App;
