import React, { useEffect, useRef, useState } from 'react';
import {
    Card,
    Col,
    Layout,
    Row,
    Input,
    Collapse,
    Badge,
    List,
    Popconfirm,
    Checkbox,
    Empty,
} from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { ReusableAddEditCompo } from './ReusableAddEditCompo';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

export const ContentCompo = () => {
    const { Content } = Layout;
    const { Search } = Input;
    const collapseRef = useRef(null);
    // const dispatch = useDispatch();
    const checkboxOptions = ['In Progress', 'Pending', 'Completed'];
    const [inProgressRec, setInProgressRec] = useState([]);
    const [pendingRec, setPendingRec] = useState([]);
    const [completedRec, setCompletedRec] = useState([]);
    const [progressCount, setProgressCount] = useState(0);
    const [pendingRecCount, setPendingRecCount] = useState(0);
    const [completedRecCount, setCompletedRecCount] = useState(0);
    const [searchVal, setSearchVal] = useState('');
    const [checkedList, setCheckedList] = useState(checkboxOptions);
    const titleText = useSelector(state => state.TitleSlice?.textVal);
    const descText = useSelector(state => state.TitleSlice?.descVal);
    const statustext = useSelector(state => state.TitleSlice?.statusVal);
    const ListItems = [
        {
            key: 1,
            title: 'Title 1',
            description: (
                <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos est voluptatibus
                    non aperiam. Nihil consectetur perferendis culpa dolorum? Laboriosam natus iure
                    eveniet, perspiciatis consequuntur fugiat nemo dolorum? Omnis, dolor voluptate?
                    <div className="my-2">Mon 26, Aug 2024 </div>
                </span>
            ),
            status: (
                <>
                    <Badge status="processing" className="me-2" />
                    In Progress
                </>
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
                    <div className="my-2">Mon 26, Aug 2024</div>
                </span>
            ),
            status: (
                <>
                    <Badge status="warning" className="me-2" />
                    Pending
                </>
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
                    <div className="my-2">Mon 26, Aug 2024</div>
                </span>
            ),
            status: (
                <>
                    <Badge status="success" className="me-2" />
                    Completed
                </>
            ),
        },
    ];

    //initial data
    useEffect(() => {
        if (!isEmpty(ListItems)) {
            const grpstatus = Object.groupBy(ListItems, ({ status }) => status.props.children[1]);
            let rec1 = grpstatus['In Progress'];
            let rec2 = grpstatus['Pending'];
            let rec3 = grpstatus['Completed'];
            setInProgressRec(rec1);
            setPendingRec(rec2);
            setCompletedRec(rec3);
        }
    }, []);

    useEffect(() => {
        if (titleText && descText) {
            const newItem = createNewItem(titleText, descText, statustext);
            if (statustext == 'In Progress') {
                setInProgressRec(prev => prev.filter(item => item.key !== newItem.key));
            } else if (statustext == 'Completed') {
                setCompletedRec(prev => prev.filter(item => item.key !== newItem.key));
            } else if (statustext == 'Pending') {
                setPendingRec(prev => prev.filter(item => item.key !== newItem.key));
            }

            if (statustext == 'Pending') {
                setPendingRec(prevList => [...prevList, newItem]);
            } else if (statustext == 'Completed') {
                setCompletedRec(prevList => [...prevList, newItem]);
            } else {
                setInProgressRec(prevList => [...prevList, newItem]);
            }
        }
    }, [titleText, descText, statustext]);

    //status count
    useEffect(() => {
        setProgressCount(inProgressRec?.length);
        setCompletedRecCount(completedRec?.length);
        setPendingRecCount(pendingRec?.length);
    }, [inProgressRec, pendingRec, completedRec]);

    //create new item func
    const createNewItem = (title, description, status) => ({
        key: dayjs().valueOf(),
        title,
        description: (
            <span>
                {description}
                <div className="my-2">{dayjs().format('ddd DD, MMM YYYY')}</div>
            </span>
        ),
        status: (
            <>
                <Badge
                    status={
                        statustext === 'Pending'
                            ? 'warning'
                            : statustext === 'Completed'
                            ? 'success'
                            : 'processing'
                    }
                    className="me-2"
                />
                {status}
            </>
        ),
    });

    //delete Func
    const deleteConfirm = (item, record) => {
        const removeData = record?.filter(d => d.key != item.key);

        if (item.status?.props.children[1] == 'Pending') {
            setPendingRec(removeData);
        } else if (item.status?.props.children[1] == 'Completed') {
            setCompletedRec(removeData);
        } else if (item.status?.props.children[1] == 'In Progress') {
            setInProgressRec(removeData);
        }
    };

    //checkbox Filter
    const handleCheckBoxChange = checkedValues => {
        setCheckedList(checkedValues);
    };
    const CollapseItems = [
        {
            key: 1,
            label: (
                <>
                    In Progress
                    <Badge count={progressCount} offset={[6, 1]} size="small" />
                </>
            ),
            children: (
                <Row gutter={(16, 16)} className="cursor-pointer list-items">
                    <Col span={24}>
                        {inProgressRec?.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={inProgressRec}
                                renderItem={item => {
                                    return (
                                        <List.Item
                                            key={item.key}
                                            actions={[
                                                <>
                                                    <Row gutter={(16, 16)}>
                                                        <Col span={24}>{item?.status}</Col>
                                                    </Row>
                                                    <Row
                                                        gutter={(16, 16)}
                                                        className="mt-3 visible-check">
                                                        <Col
                                                            span={24}
                                                            className="flex flex-1 gap-4">
                                                            <ReusableAddEditCompo
                                                                action="Edit"
                                                                item={item}
                                                                record={inProgressRec}
                                                                setupdateRecord={setInProgressRec}
                                                                localStorageKey="inprogress"
                                                            />
                                                            <span className="hover:scale-150">
                                                                <Popconfirm
                                                                    title="Delete the task"
                                                                    description="Are you sure to delete this task?"
                                                                    onConfirm={() =>
                                                                        deleteConfirm(
                                                                            item,
                                                                            inProgressRec
                                                                        )
                                                                    }
                                                                    // onCancel={cancel}

                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                    placement="bottomRight">
                                                                    <AiOutlineDelete
                                                                        size={20}
                                                                        color="red"
                                                                    />
                                                                </Popconfirm>
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </>,
                                            ]}>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.description}
                                                // className="hover:visible"
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            ),
        },
        {
            key: 2,
            label: (
                <>
                    Pending
                    <Badge count={pendingRecCount} offset={[6, 1]} size="small" />
                </>
            ),
            children: (
                <Row gutter={(16, 16)} className=" cursor-pointer list-items">
                    <Col span={24}>
                        {pendingRec?.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={pendingRec}
                                renderItem={item => {
                                    return (
                                        <List.Item
                                            key={item.key}
                                            actions={[
                                                <>
                                                    <Row gutter={(16, 16)}>
                                                        <Col span={24}>{item?.status}</Col>
                                                    </Row>
                                                    <Row
                                                        gutter={(16, 16)}
                                                        className="mt-3 visible-check">
                                                        <Col
                                                            span={24}
                                                            className="flex flex-1 gap-4">
                                                            <ReusableAddEditCompo
                                                                action="Edit"
                                                                item={item}
                                                                record={pendingRec}
                                                                setupdateRecord={setPendingRec}
                                                                localStorageKey="pending"
                                                            />
                                                            <span className="hover:scale-150">
                                                                <Popconfirm
                                                                    title="Delete the task"
                                                                    description="Are you sure to delete this task?"
                                                                    onConfirm={() =>
                                                                        deleteConfirm(
                                                                            item,
                                                                            pendingRec
                                                                        )
                                                                    }
                                                                    // onCancel={cancel}
                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                    placement="bottomRight">
                                                                    <AiOutlineDelete
                                                                        size={20}
                                                                        color="red"
                                                                    />
                                                                </Popconfirm>
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </>,
                                            ]}>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.description}
                                                // className="hover:visible"
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            ),
        },
        {
            key: 3,
            label: (
                <>
                    Completed
                    <Badge count={completedRecCount} offset={[6, 1]} size="small" />
                </>
            ),
            children: (
                <Row gutter={(16, 16)}>
                    <Col span={24}>
                        {completedRec?.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={completedRec}
                                renderItem={item => {
                                    return (
                                        <List.Item
                                            key={item.key}
                                            actions={[
                                                <>
                                                    <Row gutter={(16, 16)}>
                                                        <Col span={24}>{item?.status}</Col>
                                                    </Row>
                                                </>,
                                            ]}>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.description}
                                                // className="hover:visible"
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            ),
        },
    ];

    //Checkbox filter Collapse data
    const findArr = CollapseItems?.filter(d => checkedList?.includes(d?.label?.props?.children[0]));

    //onSearch
    const onSearch = val => {
        setSearchVal(val);
    };
    return (
        <>
            <Content className="max-h-full p-8 h-[90vh] !overflow-y-scroll">
                <Card bordered={false} className="h-auto w-full">
                    <Row gutter={(16, 16)}>
                        <Col xs={24} sm={24} md={10} lg={12} xl={12}>
                            <span className="font-sans font-bold text-xl flex justify-center md:float-right sm:mb-2">
                                To Do List Filter
                            </span>
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={12} xl={12}>
                            <Checkbox.Group
                                value={checkedList}
                                options={checkboxOptions}
                                onChange={handleCheckBoxChange}
                                className="ms-1 me-1 float-right"
                            />
                        </Col>
                    </Row>
                </Card>

                <Row gutter={(16, 16)} className="my-5">
                    <Col span={24} className="my-3" ref={collapseRef}>
                        {findArr?.length > 0 ? (
                            <Collapse
                                items={findArr}
                                expandIconPosition="end"
                                size="small"
                                className="!font-sans italic"
                            />
                        ) : (
                            <Empty />
                        )}
                    </Col>
                </Row>
                {findArr?.length > 0 && (
                    <Row gutter={(16, 16)}>
                        <ReusableAddEditCompo action="Add" />
                    </Row>
                )}
            </Content>
        </>
    );
};
