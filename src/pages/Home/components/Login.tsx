import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import useAuthStore from '../../../hooks/UseAuthStore'
type Props = {}

export default function Login({ }: Props) {
    const { login, loggedInUser } = useAuthStore((state: any) => state)
    const loginCheck = (data: any) => {
        login(data.username, data.password)
    }
    return (
        <>{
            !loggedInUser ?
                <Form labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={loginCheck}
                >
                    <Form.Item label='Username' name='username'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button htmlType='submit' type='primary'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                :
                <h1>Yoo... Now you can freely add, edit, and delete data</h1>
        }
        </>

    )
}