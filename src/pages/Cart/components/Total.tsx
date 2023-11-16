import React from 'react'
import useCartStore from '../../../hooks/UseCartStore'
import numeral from 'numeral'

type Props = {}

export default function Total({ }: Props) {
    const { items } = useCartStore((state: any) => state)
    let total = 0
    for (const i of items) {
        let sum = i.item.price * i.quantity * (100 - i.item.discount) / 100
        total += sum
    }
    return (
        <h4 style={{ color: 'white' }}>Total: {numeral(total).format('0,0.00')}đ</h4>
    )
}