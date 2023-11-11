import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd'
import { useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'

type Props = {
    record: String[],
    getData: () => void
}

export default function EditItem({ record, getData }: Props) {

    const [editForm] = Form.useForm()

    const [openStatus, setOpenStatus] = useState<true | false>(false)

    const [idItem, setIditem] = useState('')
    const openEditForm = (item: any) => {
        setOpenStatus(true)
        editForm.setFieldsValue(item)
        setIditem(item.id)
    }

    const handleEditItem = async (data: any) => {
        let response = await axiosClient.patch(`/online-shop/categories/${idItem}`, data, {
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
            <Button type='primary' onClick={() => openEditForm(record)}>
                Edit
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
                    <Form.Item label='Description' name='description' hasFeedback>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}