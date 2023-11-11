import { Button, Card, DatePicker, Form, Input, InputNumber, Radio, Select } from 'antd'
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
                <Form.Item label='Created Date' name='createdDate' hasFeedback>
                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                </Form.Item>
                <Form.Item label='Shipped Date' name='shippedDate' hasFeedback>
                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                </Form.Item>
                <Form.Item label='Status' name='status' hasFeedback>
                    <Select options={
                        [
                            {
                                value: 1, label: 'CANCEL'
                            },
                            {
                                value: 2, label: 'WAITING'
                            },
                            {
                                value: 3, label: 'COMPLETED'
                            },
                        ]
                    } />
                </Form.Item>
                <Form.Item label='Description' name='description' hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item label='Shipping Address' name='shippingAddress' hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item label='Shipping City' name='shippingCity' hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item label='Payment Type' name='paymentType' hasFeedback>
                    <Radio.Group>
                        <Radio.Button value='Credit-card'>
                            Credit-card
                        </Radio.Button>
                        <Radio.Button value='CASH'>
                            CASH
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
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
                {/* <Form.Item label='Order Details' name='orderDetails'>
<Form.Item>

</Form.Item>
                </Form.Item> */}
                <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="year"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <Input placeholder="Input birth year" />
                    </Form.Item>
                    <Form.Item
                        name="month"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <Input placeholder="Input birth month" />
                    </Form.Item>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button htmlType='submit'>
                        Create a new order
                    </Button>
                </Form.Item>
            </Form>
            <Button type='primary' style={{ float: 'right' }} onClick={() => setStatus(status === 'off' ? 'on' : 'off')}>
                Add a new one
            </Button>
        </div>
    )
}