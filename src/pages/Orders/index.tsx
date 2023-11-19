import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table } from 'antd'
import AddNewItem from './Components/AddNewItem'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import moment from 'moment'
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {moment(text).format("DD/MM/YYYY HH:ss")}
                    </>
                )
            }
        },
        {
            title: 'Cart',
            // dataIndex: 'createdDate',
            key: 'cart',
        },
        {
            title: 'Total',
            // dataIndex: 'createdDate',
            key: 'total',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Customer',
            // dataIndex: 'customer',
            key: 'customer',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.customer.firstName} {record.customer.lastName}
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
                        {record.employee.firstName} {record.employee.lastName}
                    </>
                )
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 1,
            render: (text: any, record: any, index: number) => {
                return (
                    <Space style={{ width: '1%' }}>
                        <Button ><EditOutlined /></Button>
                        <Button danger><DeleteOutlined /></Button>
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