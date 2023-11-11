import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table } from 'antd'

type Props = {}

export default function Suppliers({ }: Props) {
    const [suppliers, setSuppliers] = useState([])

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'Phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'Address',
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
            let response = await axiosClient.get('/online-shop/suppliers')
            setSuppliers(response.data.reverse())
        }
        getData()
    }, [])

    return (
        <div>
            <Table dataSource={suppliers} columns={columns} />
        </div>
    )
}