import { Button, Form, Input, InputNumber, Select, message } from 'antd'
import { useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'
import useAuthStore from '../../../store/UseAuthStore'

type Props = {
    getData: () => void
}

export default function Addnewitem({ getData }: Props) {
    const { access_token } = useAuthStore((state: any) => state)
    const [form] = Form.useForm()
    const [status, setStatus] = useState<'on' | 'off'>('off')

    const addNewItem = async (data: any) => {
        try {
            let response = await axiosClient.post('/online-shop/categories', data, {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            message.success('Create success')
            form.resetFields(['name', 'description'])
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
                <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                    <Button htmlType='submit'>
                        Add a new product
                    </Button>
                </Form.Item>
            </Form>
            <Button type='primary' onClick={() => setStatus(status === 'off' ? 'on' : 'off')} style={{ float: 'right' }}>
                {status === 'off' ? 'Add a new one' : 'Close form'}
            </Button>
        </div>
    )
}