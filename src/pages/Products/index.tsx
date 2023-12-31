import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../configs/axiosClient'
import { Button, Space, Table, message } from 'antd'
import Addnewitem from './components/Addnewitem'
import EditItem from './components/EditItem'
import numeral from 'numeral'
import useCartStore from '../../store/UseCartStore'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import useAuthStore from '../../store/UseAuthStore'
type Props = {}

export default function Products({ }: Props) {
    const { access_token } = useAuthStore((state: any) => state)
    console.log(access_token)
    const { add } = useCartStore((state: any) => state)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {numeral(text).format('0,0')}đ
                    </>
                )
            }
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {numeral(text).format('0,0')}%
                    </>
                )
            }
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            align: 'center',
        },
        {
            title: 'Category',
            // dataIndex: 'categories',
            key: 'category',
            render: (text: any, record: any, index: number) => {
                return (
                    <span>
                        {record.category.name}
                    </span>
                )
            }
        },
        {
            title: 'Supplier',
            dataIndex: 'suppliers',
            key: 'supplier',
            render: (text: any, record: any, index: number) => {
                return (
                    <span>
                        {record.supplier.name}
                    </span>
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
                        <EditItem categories={categories} suppliers={suppliers} record={record} getData={getDataProducts} />
                        <Button type='default' danger
                            onClick={() => handleDeleteItem(record.id)}>
                            <DeleteOutlined />
                        </Button>
                        <Button type='primary' onClick={() => {
                            add(record)
                        }}><ShoppingCartOutlined /></Button>
                    </Space>
                )
            }
        }
    ]

    const getDataProducts = async () => {
        let response = await axiosClient.get('/online-shop/products')
        setProducts(response.data.reverse())
    }
    const handleDeleteItem = async (idItem: any) => {
        try {
            if (window.confirm('Are you sure to delete this item?')) {
                let response = await axiosClient.delete(`/online-shop/products/${idItem}`, {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                })
                message.success('Delete success')
                getDataProducts()
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
        getDataProducts()
    }, [])

    useEffect(() => {
        const getData = async () => {
            let response = await axiosClient.get('/online-shop/categories')
            setCategories(response.data)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            let response = await axiosClient.get('/online-shop/suppliers')
            setSuppliers(response.data)
        }
        getData()
    }, [])
    return (
        <div>
            <Addnewitem categories={categories} suppliers={suppliers} getData={getDataProducts} />
            <Table dataSource={products} columns={columns} />
        </div>
    )
}