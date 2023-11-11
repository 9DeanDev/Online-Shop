import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table } from 'antd'

type Props = {}

export default function Customers({ }: Props) {
    const [customers, setCustomers] = useState([])

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: any, index: number) => {
                return (
                    <Space>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Space>
                )
            }
        }
    ]

    useEffect(() => {
        const getData = async () => {
            let response = await axiosClient.get('/online-shop/customers')
            setCustomers(response.data.reverse())
        }
        getData()
    }, [])

    return (
        <div>
            <Table dataSource={customers} columns={columns} />
        </div>
    )
}