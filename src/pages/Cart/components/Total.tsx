import React from 'react'
import useCartStore from '../../../store/UseCartStore'
import numeral from 'numeral'
import { IoCartOutline } from "react-icons/io5";
import { Flex } from 'antd';
type Props = {}

export default function Total({ }: Props) {
    const { items } = useCartStore((state: any) => state)
    let total = 0
    for (const i of items) {
        let sum = i.item.price * i.quantity * (100 - i.item.discount) / 100
        total += sum
    }
    return (
        <div style={{ color: 'white', fontSize: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', display: 'flex' }}>
            <div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', display: 'flex', position: 'relative' }}>
                <IoCartOutline />
                <div style={{ fontSize: '16px', height: '10px', width: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '-5px', right: '-5px' }}>
                    {items.length}
                </div>
            </div>
            <h4 style={{ color: 'white', margin: '0 10px' }}>Total: {numeral(total).format('0,0')}đ</h4>
        </div>

    )
}