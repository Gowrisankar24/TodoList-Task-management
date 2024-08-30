import React, { useState } from 'react';
import { Badge, Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { descTextAction, statusAction, titleTextAction } from '../../reducer/TitleSlice';
import { debounce } from 'lodash';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import dayjs from 'dayjs';
export const ReusableAddEditCompo = ({ action, item, record, setupdateRecord }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [descText, setDescText] = useState('');
    const [selectVal, setSelectVal] = useState('');
    // const titleText = useSelector(state => state.TitleSlice.textVal);
    // const descText = useSelector(state => state.TitleSlice.descVal);
    const titleTextChange = e => {
        let val = e?.target?.value;
        val?.length > 0 && setTitleText(val);
    };
    const descChange = e => {
        let val = e?.target?.value;
        if (val.length > 0) {
            setDescText(val);
        }
    };
    const hanldeAdd = () => {
        if (action === 'Edit') {
            const updatedList = record?.filter(d => d.key !== item.key);
            setupdateRecord(updatedList);
            message.success('List Updated successfully');
            dispatch(descTextAction(descText));
            dispatch(titleTextAction(titleText));
            dispatch(statusAction(selectVal));
            setIsModalVisible(false);
        } else {
            if (titleText?.length > 0 && descText?.length > 0) {
                message.success('List Added successfully');
                dispatch(descTextAction(descText));
                dispatch(titleTextAction(titleText));
                setIsModalVisible(false);
                dispatch(statusAction('In Progress'));
                const newItem = {
                    key: dayjs().valueOf(),
                    title: titleText,
                    description: descText,
                    status: 'In Progress',
                };
                // localStorage.setItem('data', JSON.stringify(newItem));
            }
        }
    };
    return (
        <>
            {action === 'Edit' ? (
                <span
                    className="hover:scale-150"
                    onClick={() => {
                        setIsModalVisible(true);
                        setTitleText(item?.title);
                        setDescText(item?.description.props.children[0]);
                        // setSelectVal('Pending');
                        form.setFieldsValue({
                            title: item?.title,
                            description: item?.description.props.children[0],
                            status: item?.status.props.children[1],
                        });
                    }}>
                    <HiOutlinePencilAlt size={20} color={'blue'} />
                </span>
            ) : (
                <span className="fixed bottom-3 right-5">
                    <Button
                        className="rounded-[50%] w-16 h-16 bg-blue-500 hover:!bg-blue-500"
                        onClick={() => {
                            setIsModalVisible(true);
                            setTitleText('');
                            setDescText('');
                            form?.resetFields();
                        }}>
                        <FaPlus size={25} color="white" />
                    </Button>
                </span>
            )}
            <Modal
                title={action === 'Edit' ? 'Edit Task' : 'Add Todo'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
                closeIcon={<IoArrowBackCircleSharp size={40} className="" />}>
                <Row gutter={(16, 16)}>
                    <Col span={24}>
                        <Form
                            form={form}
                            layout="vertical"
                            className="space-y-5"
                            onFinish={hanldeAdd}>
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter Title!',
                                    },
                                ]}>
                                <Input
                                    value={titleText}
                                    onChange={titleTextChange}
                                    placeholder="Enter the Title"
                                    className="mt-4"
                                />
                            </Form.Item>
                            <Form.Item name="description">
                                <TextArea
                                    rows={4}
                                    placeholder="Enter the description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter description!',
                                        },
                                    ]}
                                    value={descText}
                                    onChange={descChange}
                                />
                            </Form.Item>
                            {action === 'Edit' ? (
                                <Form.Item name="status">
                                    <Select
                                        value={selectVal}
                                        onChange={val => setSelectVal(val)}
                                        options={[
                                            {
                                                label: (
                                                    <>
                                                        <Badge status="warning" className="me-2" />
                                                        Pending
                                                    </>
                                                ),
                                                value: 'Pending',
                                            },
                                            {
                                                label: (
                                                    <>
                                                        <Badge
                                                            status="processing"
                                                            className="me-2"
                                                        />
                                                        In Progress
                                                    </>
                                                ),
                                                value: 'In Progress',
                                            },
                                            {
                                                label: (
                                                    <>
                                                        <Badge status="success" className="me-2" />
                                                        Completed
                                                    </>
                                                ),
                                                value: 'Completed',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            ) : (
                                ''
                            )}
                        </Form>
                    </Col>
                </Row>
                <Row gutter={(16, 16)} className="mt-3">
                    <Col span={12}>
                        <Button size="large" onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            size="large"
                            className="float-right"
                            onClick={hanldeAdd}>
                            {action === 'Edit' ? 'Update' : 'Add'}
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};
