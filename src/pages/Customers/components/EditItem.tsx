import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, message } from 'antd'
import { useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'
import dayjs, { locale } from 'dayjs'
import { EditOutlined } from '@ant-design/icons';

type Props = {
    record: String[],
    getData: () => void
}

export default function EditItem({ record, getData }: Props) {
    const [initialValues, setInitialValues] = useState({ birthday: '' })
    const [editForm] = Form.useForm()

    const [openStatus, setOpenStatus] = useState<true | false>(false)

    const [idItem, setIditem] = useState({})
    const openEditForm = (item: any) => {
        setOpenStatus(true)
        setInitialValues(item)
        // editForm.setFieldsValue(item)
        setIditem(item.id)
    }

    const handleEditItem = async (data: any) => {
        let response = await axiosClient.patch(`/online-shop/customers/${idItem}`, data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        message.success('Update success')
        setOpenStatus(false)
        getData()
    }
    return (
        <div>
            <Button onClick={() => openEditForm(record)}>
                <EditOutlined />
            </Button>
            <Modal open={openStatus} title='UPDATE ITEM' okText='Update'
                onCancel={() => setOpenStatus(false)}
                onOk={() => editForm.submit()}
            >
                <Form form={editForm}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleEditItem}
                    initialValues={{
                        ...initialValues,
                        birthday: dayjs(new Date(initialValues.birthday))
                    }}
                >
                    <Form.Item label='First Name' name='firstName' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Name is required'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Last Name' name='lastName' hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Email' name='email' hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Phone' name='phoneNumber' hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Address' name='address' hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Birthday' name='birthday' hasFeedback >
                        <DatePicker format={'YYYY-MM-DD'} />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}