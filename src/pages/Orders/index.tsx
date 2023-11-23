import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table } from 'antd'
import AddNewItem from './Components/AddNewItem'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import moment from 'moment'
import EditItem from './Components/EditItem'
import useAuthStore from '../../store/UseAuthStore'
type Props = {}

export default function Orders({ }: Props) {
    const { access_token } = useAuthStore((state: any) => state)
    const [orders, setOrders] = useState([])
    let [productsData, setProductsData] = useState<any>([])
    const getProductsData = async () => {
        let response = await axiosClient.get('/online-shop/products')
        setProductsData(response.data)
    }
    const handleDelete = async (id: any) => {
        if (window.confirm("Are you sure to delete this order?")) {
            let response = await axiosClient.delete(`/online-shop/orders/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            getData()
        }
    }
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
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.orderDetails.length}
                    </>
                )
            },
        },
        {
            title: 'Total',
            // dataIndex: 'createdDate',
            key: 'total',
            align: 'right',
            render: (text: any, record: any, index: number) => {
                var total = 0
                for (let i = 0; i < record.orderDetails.length; i++) {
                    total = total + (record.orderDetails[i].price * record.orderDetails[i].quantity) * (100 - record.orderDetails[i].discount) / 100
                }
                return (
                    <>
                        {total}đ
                    </>
                )
            },
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
                        <EditItem record={record} productsData={productsData} getData={getData} />
                        <Button danger onClick={() => handleDelete(record.id)}><DeleteOutlined /></Button>
                    </Space>
                )
            }
        }
    ]
    const getData = async () => {
        let response = await axiosClient.get('/online-shop/orders')
        setOrders(response.data.reverse())
    }
    useEffect(() => {
        getData()
        getProductsData()
    }, [])

    return (
        <div>
            <AddNewItem getData={getData} />
            <Table dataSource={orders} columns={columns} />
        </div>
    )
}