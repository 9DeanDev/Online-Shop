import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table, message } from 'antd'
import Addnewitem from './components/Addnewitem'
import EditItem from './components/EditItem'
import { DeleteOutlined } from '@ant-design/icons'
import useAuthStore from '../../store/UseAuthStore'

type Props = {}

export default function Categories({ }: Props) {
    const { access_token } = useAuthStore((state: any) => state)
    const [categories, setCategories] = useState([])

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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

    const handleDeleteItem = async (idItem: any) => {
        try {
            if (window.confirm('Are you sure to delete this item?')) {
                let response = await axiosClient.delete(`/online-shop/categories/${idItem}`, {
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

    const getData = async () => {
        let response = await axiosClient.get('/online-shop/categories')
        setCategories(response.data.reverse())
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Addnewitem getData={getData} />
            <Table dataSource={categories} columns={columns} />
        </div>
    )
}