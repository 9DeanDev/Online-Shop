import React from 'react'
import useCartStore from '../../store/UseCartStore'
import { Button, Space, Table } from 'antd'
import numeral from 'numeral'
import Total from './components/Total'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/UseAuthStore'
import Purchase from './components/Purchase'

type Props = {}

export default function Cart({ }: Props) {
    const navigate = useNavigate()
    const { items, remove } = useCartStore((state: any) => state)
    const { loggedInUser } = useAuthStore((state: any) => state)
    console.log('>>>>', items)
    const columns: any = [
        {
            title: 'ID',
            key: 'id',
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.item.id}
                    </>
                )
            }
        },
        {
            title: 'Name',
            key: 'name',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {record.item.name}
                    </>
                )
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {numeral(record.item.price).format('0,0')}đ
                    </>
                )
            }
        },
        {
            title: 'Discount',
            key: 'discount',
            align: 'center',
            render: (text: any, record: any, index: number) => {
                return (
                    <>
                        {numeral(record.item.discount).format('0')}%
                    </>
                )
            }
        },
        {
            title: 'Quantity',
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
            title: 'Actions',
            key: 'actions',
            align: 'center',
            width: 1,
            render: (text: any, record: any, index: number) => {
                return (
                    <Space>
                        <Purchase />
                        <Button type='primary' danger onClick={() => { remove(record.item.id) }}>
                            Delete
                        </Button>
                    </Space>
                )
            }
        }
    ]
    return (
        <>
            {
                !loggedInUser ?
                    <h1>
                        <Link to='/'>Login</Link> now to see your cart *-*
                    </h1>
                    :
                    <div>
                        <b>
                            Your cart have {items.length} products now
                        </b>
                        <Table dataSource={items} columns={columns} />
                        {/* <Total /> */}
                    </div>
            }
        </>
    )
}