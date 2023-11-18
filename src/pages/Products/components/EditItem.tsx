import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd'
import { useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'
import { EditOutlined } from '@ant-design/icons';
type Props = {
    categories: String[],
    suppliers: String[],
    record: String[],
    getData: () => void
}

export default function EditItem({ categories, suppliers, record, getData }: Props) {

    const [editForm] = Form.useForm()

    const [openStatus, setOpenStatus] = useState<true | false>(false)

    const [idItem, setIditem] = useState('')
    const openEditForm = (item: any) => {
        setOpenStatus(true)
        editForm.setFieldsValue(item)
        setIditem(item.id)
    }

    const handleEditItem = async (data: any) => {
        let response = await axiosClient.patch(`/online-shop/products/${idItem}`, data, {
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
                    <Form.Item label='Price' name='price' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Price is required'
                            },
                            {
                                type: 'number', min: 1, message: 'Price must be over zero'
                            }
                        ]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Discount' name='discount' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Discount is required'
                            },
                            {
                                type: 'number', min: 0, message: 'Discount cannot under zero'
                            }
                        ]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Stock' name='stock' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Stock is required'
                            },
                            {
                                type: 'number', min: 1, message: 'Stock must be over zero'
                            }
                        ]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Category' name='categoryId' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Category is required'
                            }
                        ]}>
                        <Select options={
                            categories.map((item: any) => {
                                return {
                                    value: item.id, label: item.name
                                }
                            })
                        } />
                    </Form.Item>
                    <Form.Item label='Supplier' name='supplierId' hasFeedback
                        rules={[
                            {
                                required: true, message: 'Supplier is required'
                            }
                        ]}>
                        <Select options={
                            suppliers.map((item: any) => {
                                return {
                                    value: item.id, label: item.name
                                }
                            })
                        } />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}