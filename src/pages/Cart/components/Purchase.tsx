import { Button, Form, Modal, Radio } from 'antd'
import React from 'react'
import useCartStore from '../../../store/UseCartStore'
import { useState } from 'react'
type Props = {}

export default function Purchase({ }: Props) {

    const [status, setStatus] = useState(false)
    const { items } = useCartStore((state: any) => state)
    const [products, setProducts] = useState()

    return (
        <div>
            <Button type='primary' onClick={() => setStatus(true)}>
                Buy
            </Button>
            <Modal title='Purchase' open={status} onCancel={() => setStatus(false)}>
                {/* <div>
                    {items.item.name}
                </div>
                <div>
                    {items.item.description}
                </div> */}
                <Form>
                    <Form.Item label='Payment Type' name='paymentType' hasFeedback>
                        <Radio.Group>
                            <Radio.Button value='Credit-card'>
                                CREDIT CARD
                            </Radio.Button>
                            <Radio.Button value='CASH'>
                                CASH
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}