import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table } from 'antd'
import AddNewItem from './Components/AddNewItem'

type Props = {}

export default function Orders({ }: Props) {
    const [orders, setOrders] = useState([])

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 1,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Shipped Date',
            dataIndex: 'shippedDate',
            key: 'shippedDate',
        },
        {
            title: 'Shipping Address',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
        },
        {
            title: 'Shipping City',
            dataIndex: 'shippingCity',
            key: 'shippingCity',
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
        },
        {
            title: 'Customer',
            // dataIndex: 'customer',
            key: 'customer',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.customer.id}
                    </>
                )
            }
        },
        {
            title: 'Employee',
            // dataIndex: 'employee',
            key: 'employee',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.employee.id}
                    </>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 1,
            render: (text: any, record: any, index: number) => {
                return (
                    <Space style={{ width: '1%' }}>
                        <Button type='primary'>Edit</Button>
                        <Button type='primary' danger>Delete</Button>
                    </Space>
                )
            }
        }
    ]

    useEffect(() => {
        const getData = async () => {
            let response = await axiosClient.get('/online-shop/orders')
            setOrders(response.data.reverse())
        }
        getData()
    }, [])

    return (
        <div>
            <AddNewItem />
            <Table dataSource={orders} columns={columns} />
        </div>
    )
}