import { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Button, Descriptions, DescriptionsProps, Divider, Drawer, Form, Input, InputNumber, Modal, Select, Table, message } from 'antd'
import { axiosClient } from '../../../configs/axiosClient'
import useAuthStore from '../../../store/UseAuthStore'
type Props = {
    record: any,
    productsData: any[],
    getData: () => void,
}

export default function EditItem({ record, productsData, getData }: Props) {
    let [form] = Form.useForm()
    const { access_token } = useAuthStore((state: any) => state)
    let [openModal, setOpenModal] = useState(false)
    let [ordersData, setOrdersData] = useState<any>()
    let [newOrdersData, setNewOrdersData] = useState<any>()
    const getOrdersData = async () => {
        let response = await axiosClient.get(`/online-shop/orders/${record.id}`)
        setOrdersData(response.data.orderDetails)
        console.log(ordersData)
    }
    const handleClickBtn = () => {
        setOpenModal(true)
        getOrdersData()

    }
    const addProductToOrder = async (data: any) => {
        let key = data.product.key
        console.log('key: ', key)
        console.log(productsData)
        console.log('data: ', data)
        newOrdersData = {
            'orderDetails': [...ordersData, {
                'productId': productsData[key].id,
                'quantity': data.quantity,
                'price': productsData[key].price,
                'discount': productsData[key].discount
            }]
        }
        console.log('check:', ordersData)
        try {
            let response = await axiosClient.patch(`/online-shop/orders/${record.id}`, newOrdersData, {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            message.success('Add product to order success')
            form.resetFields()
            getOrdersData()
            getData()
        }
        catch (error: any) {
            if (error.response.status === 500) {
                message.error('Something wrong')
            }
            if (error.response.status === 401) {
                message.error('You are not logged in yet')
            }
        }
    }
    const handleChangeQuantity = () => {

    }

    const handleDelete = async (data: any) => {
        newOrdersData = { 'orderDetails': ordersData.filter((item: any) => item.product.id !== data.product.id) }
        console.log(record)
        console.log(newOrdersData)
        if (window.confirm('Are you sure to remove this product?')) {
            try {
                let response = await axiosClient.patch(`/online-shop/orders/${record.id}`, newOrdersData, {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                })
                message.success('Remove product success')
                getOrdersData()
                getData()
            }
            catch (error: any) {
                if (error.response.status === 401) {
                    message.error('You are not logged in yet')
                }
                else message.error('Something wrong')
            }
        }
    }
    const columns: any = [
        {
            title: 'Product',
            key: 'name',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.product.name}
                    </>
                )
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'right'
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            align: 'center'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.quantity}
                    </>
                )
            }
        },
        {
            title: 'Total',
            key: 'Total',
            align: 'right',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {(record.price * record.quantity) * (100 - record.discount) / 100}đ
                    </>
                )
            }
        },
        {
            title: '',
            key: 'actions',
            width: 1,
            render: (text: any, record: any, index: number) => {
                return (
                    <Button type='primary' danger
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                )
            }
        },
    ]
    const items: DescriptionsProps['items'] = [
        {
            key: 1,
            label: 'Order ID',
            children: <>{record.id}</>
        },
        {
            key: 1,
            label: 'Status',
            children: <>{record.status}</>
        },
        {
            key: 1,
            label: 'Customer',
            children: <>{record.customer.firstName + record.customer.lastName}</>
        },
        {
            key: 1,
            label: 'Employee',
            children: <>{record.employee.firstName + record.employee.lastName}</>
        },
        {
            key: 1,
            label: 'Description',
            children: <>{record.description}</>
        },
    ]
    return (
        <>
            <Button onClick={handleClickBtn}><EditOutlined /></Button>
            <Drawer open={openModal} onClose={() => setOpenModal(false)} width='50%' title='Order Details'>
                <Descriptions title='Order Details' bordered items={items} column={2} />
                <Divider />
                <Table columns={columns} dataSource={ordersData} />
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} form={form} onFinish={addProductToOrder}>
                    <Form.Item label='Product' name='product'
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Select labelInValue
                            options={productsData.map((item: any, index: number) => {
                                return {
                                    value: index, label: `${item.name}, price: ${item.price}, discount: ${item.discount}`
                                }
                            })} />
                    </Form.Item>
                    <Form.Item label='Quantity' name='quantity' rules={[
                        {
                            required: true
                        },
                        {
                            type: 'number',
                            min: 1,
                            message: 'Quantity must be greater than 1'
                        }
                    ]}>
                        <InputNumber value='1' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 20 }}>
                        <Button type='primary' htmlType='submit'>
                            Add to order
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}