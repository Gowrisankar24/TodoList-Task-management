import React from 'react';
import { Flex, Layout } from 'antd';
import { HeaderCompo } from './Components/HeaderCompo';
import { ContentCompo } from './Components/Content/ContentCompo';
function App() {
    return (
        <>
            <Flex gap="middle" wrap>
                <Layout className="overflow-hidden">
                    <HeaderCompo />
                    <ContentCompo />
                </Layout>
            </Flex>
        </>
    );
}

export default App;
