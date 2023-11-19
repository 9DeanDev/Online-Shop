import { Button, DatePicker, Form, Input, Radio, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../configs/axiosClient'

type Props = {}

export default function AddNewItem({ }: Props) {
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

    return (
        <div>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={data => console.log(data)}
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