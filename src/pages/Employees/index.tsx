import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table, message } from 'antd'
import EditItem from './components/EditItem'
import Addnewitem from './components/Addnewitem'
import { DeleteOutlined } from '@ant-design/icons'
import useAuthStore from '../../store/UseAuthStore'
import moment from 'moment'

type Props = {}

export default function Employees({ }: Props) {
    const { access_token } = useAuthStore((state: any) => state)
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
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {moment(text).format("DD/MM/YYYY")}
                    </>
                )
            }
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
                        <Button type='default' danger
                            onClick={() => handleDeleteItem(record.id)}>
                            <DeleteOutlined />
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
        try {
            if (window.confirm('Are you sure to delete this item?')) {
                let response = await axiosClient.delete(`/online-shop/employees/${idItem}`, {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                })
                message.success('Delete success')
                getData()
            }
        }
        catch (error: any) {
            console.log(error)
            if (error.response.status === 500)
                message.error('Something wrong')
            else
                message.error('You are not logged in yet')
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