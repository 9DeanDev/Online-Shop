import { Button, DatePicker, Form, Input, Radio, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'
import useAuthStore from '../../../store/UseAuthStore'

type Props = {
    getData: () => void
}

export default function AddNewItem({ getData }: Props) {
    const [form] = Form.useForm()
    const { access_token } = useAuthStore((state: any) => state)
    const [customers, setCustomers] = useState([])
    const [employees, setEmployees] = useState([])
    const [status, setStatus] = useState<'on' | 'off'>('off')
    const getDataCustomers = async () => {
        let response = await axiosClient.get('/online-shop/customers')
        setCustomers(response.data)
    }

    const getDataEmployees = async () => {
        let response = await axiosClient.get('/online-shop/employees')
        setEmployees(response.data)
    }

    useEffect(() => {
        getDataCustomers()
        getDataEmployees()
    }, [])
    const addNewItem = async (data: any) => {
        try {
            let dataFinal = { ...data, orderDetails: [] }
            let response = await axiosClient.post('/online-shop/orders', dataFinal, {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            message.success('Add new order success')
            form.resetFields()
            getData()
        }
        catch (error: any) {
            console.log(error)
            if (error.response.status === 500) {
                message.error('Something wrong')
            }
            else message.error('You are not logged in yet')
        }
    }
    return (
        <div>
            <Form form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={addNewItem}
                style={{ display: status === 'off' ? 'none' : 'block' }}
            >
                <Form.Item label='Customer' name='customerId' hasFeedback
                    rules={[
                        {
                            required: true, message: 'Customer is required'
                        }
                    ]}>
                    <Select options={customers.map((item: any) => {
                        return {
                            value: item.id, label: item.firstName + ' ' + item.lastName
                        }
                    })} />
                </Form.Item>
                <Form.Item label='Employee' name='employeeId' hasFeedback
                    rules={[
                        {
                            required: true, message: 'Employee is required'
                        }
                    ]}>
                    <Select options={employees.map((item: any) => {
                        return {
                            value: item.id, label: item.firstName + ' ' + item.lastName
                        }
                    })} />
                </Form.Item>
                <Form.Item label='Description' name='description' hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button htmlType='submit'>
                        Create a new order
                    </Button>
                </Form.Item>
            </Form>
            <Button type='primary' style={{ float: 'right' }} onClick={() => setStatus(status === 'off' ? 'on' : 'off')}>
                {status === 'off' ? 'Add a new one' : 'Close form'}
            </Button>
        </div>
    )
}