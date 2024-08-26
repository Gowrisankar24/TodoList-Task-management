import React, { Children } from 'react';
import { Card, Col, Layout, Row, Input, Collapse, Badge, List } from 'antd';
export const ContentCompo = () => {
    const { Content } = Layout;
    const { Search } = Input;
    const ListItems = [
        {
            key: 1,
            title: 'Title 1',
            description: (
                <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos est voluptatibus
                    non aperiam. Nihil consectetur perferendis culpa dolorum? Laboriosam natus iure
                    eveniet, perspiciatis consequuntur fugiat nemo dolorum? Omnis, dolor voluptate?
                    <div className="my-2">Wed, Jul</div>
                </span>
            ),
        },
        {
            key: 2,
            title: 'Title 2',
            description: (
                <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos est voluptatibus
                    non aperiam. Nihil consectetur perferendis culpa dolorum? Laboriosam natus iure
                    eveniet, perspiciatis consequuntur fugiat nemo dolorum? Omnis, dolor voluptate?
                    <div className="my-2">Wed, Jul</div>
                </span>
            ),
        },
        {
            key: 3,
            title: 'Title 3',
            description: (
                <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos est voluptatibus
                    non aperiam. Nihil consectetur perferendis culpa dolorum? Laboriosam natus iure
                    eveniet, perspiciatis consequuntur fugiat nemo dolorum? Omnis, dolor voluptate?
                    <div className="my-2">Wed, Jul</div>
                </span>
            ),
        },
    ];
    const CollapseItems = [
        {
            key: 1,
            label: (
                <Badge count={2} offset={[15, 10]} size="small">
                    <span>Pending</span>
                </Badge>
            ),
            children: (
                <Row gutter={(16, 16)}>
                    <Col span={24}>
                        <List
                            itemLayout="horizontal"
                            dataSource={ListItems}
                            renderItem={item => {
                                return (
                                    <List.Item
                                        key={item.key}
                                        actions={[<span>Edit</span>, <span>Delete</span>]}>
                                        <List.Item.Meta
                                            title={item.title}
                                            description={item.description}
                                        />
                                    </List.Item>
                                );
                            }}
                        />
                    </Col>
                </Row>
            ),
        },
        {
            key: 2,
            label: (
                <Badge count={4} offset={[15, 10]} size="small">
                    <span>In Progress</span>
                </Badge>
            ),
            children: (
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis at nesciunt, modi
                    fugit ducimus impedit expedita, nemo ex id facere ratione placeat aliquid optio
                    doloremque harum accusamus praesentium adipisci esse?
                </p>
            ),
        },
        {
            key: 3,
            label: (
                <Badge count={5} offset={[15, 10]} size="small">
                    <span>Completed</span>
                </Badge>
            ),
            children: (
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis at nesciunt, modi
                    fugit ducimus impedit expedita, nemo ex id facere ratione placeat aliquid optio
                    doloremque harum accusamus praesentium adipisci esse?
                </p>
            ),
        },
    ];
    return (
        <>
            <Content className="max-h-full flex justify-center p-8">
                <Card bordered={false} className="w-11/12">
                    <Row gutter={(16, 16)}>
                        <Col span={24}>
                            <Search
                                placeholder="Search here"
                                // onSearch={onSearch}
                                // style={{
                                //     maxWidth: 800,
                                // }}
                                className="w-1/2 relative left-[25%] mb-2"
                            />
                            <div className="my-3">
                                <Collapse
                                    items={CollapseItems}
                                    size="small"
                                    className="!font-sans italic"
                                />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Content>
        </>
    );
};
