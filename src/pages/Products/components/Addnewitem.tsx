import { Button, Form, Input, InputNumber, Select, message } from 'antd'
import { useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'

type Props = {
    categories: String[],
    suppliers: String[],
    getData: () => void
}

export default function Addnewitem({ categories, suppliers, getData }: Props) {
    const [form] = Form.useForm()
    const [status, setStatus] = useState<'on' | 'off'>('off')

    const addNewItem = async (data: any) => {
        let response = await axiosClient.post('/online-shop/products', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        message.success('Create success')
        form.resetFields(['name', 'price', 'description', 'discount', 'stock'])
        getData()
    }
    return (
        <div>
            <Form form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ display: status === 'off' ? 'none' : 'block' }}
                onFinish={addNewItem}>
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
                <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                    <Button htmlType='submit'>
                        Add a new product
                    </Button>
                </Form.Item>
            </Form>
            <Button type='primary' onClick={() => setStatus(status === 'off' ? 'on' : 'off')} style={{ float: 'right' }}>
                {status === 'off' ? 'Add new' : 'Close form'}
            </Button>
        </div>
    )
}