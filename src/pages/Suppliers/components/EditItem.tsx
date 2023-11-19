import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd'
import { useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'
import { EditOutlined } from '@ant-design/icons';
import useAuthStore from '../../../store/UseAuthStore';

type Props = {
    record: String[],
    getData: () => void
}

export default function EditItem({ record, getData }: Props) {
    const { access_token } = useAuthStore((state: any) => state)
    const [editForm] = Form.useForm()

    const [openStatus, setOpenStatus] = useState<true | false>(false)

    const [idItem, setIditem] = useState('')
    const openEditForm = (item: any) => {
        setOpenStatus(true)
        editForm.setFieldsValue(item)
        setIditem(item.id)
    }

    const handleEditItem = async (data: any) => {
        try {
            let response = await axiosClient.patch(`/online-shop/suppliers/${idItem}`, data, {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            message.success('Update success')
            setOpenStatus(false)
            getData()
        }
        catch (error: any) {
            console.log(error)
            if (error.response.status === 500)
                message.error('Something wrong')
            else
                message.error('You are not logged in yet')
        }
    }
    return (
        <div>
            <Button onClick={() => openEditForm(record)}>
                <EditOutlined />
            </Button>
            <Modal open={openStatus} title='UPDATE ITEM' okText='Update'
                onCancel={() => setOpenStatus(false)}
                onOk={() => editForm.submit()}>
                <Form form={editForm}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleEditItem}
                >
                    <Form.Item label='Name' name='name' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Name is required'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Phone' name='phoneNumber' hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Email' name='email' hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Address' name='address' hasFeedback>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}