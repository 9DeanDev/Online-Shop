import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table, message } from 'antd'
import EditItem from './components/EditItem'
import Addnewitem from './components/Addnewitem'

type Props = {}

export default function Employees({ }: Props) {
    const [employees, setEmployees] = useState([])

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
            width: 1,
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <Space>
                        <EditItem record={record} getData={getData} />
                        <Button type='primary' danger
                            onClick={() => handleDeleteItem(record.id)}>
                            Delete
                        </Button>
                    </Space>
                )
            }
        }
    ]

    const getData = async () => {
        let response = await axiosClient.get('/online-shop/employees')
        setEmployees(response.data.reverse())
    }

    const handleDeleteItem = async (idItem: any) => {
        if (window.confirm('Are you sure to delete this item?')) {
            let response = await axiosClient.delete(`/online-shop/employees/${idItem}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            message.success('Delete success')
            getData()
        }
    }

    useEffect(() => {

        getData()
    }, [])

    return (
        <div>
            <Addnewitem getData={getData} />
            <Table dataSource={employees} columns={columns} />
        </div>
    )
}