import React from 'react'
import useAuthStore from '../../../store/UseAuthStore'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'
import { Button, Space } from 'antd'
type Props = {}

export default function User({ }: Props) {
    const { loggedInUser } = useAuthStore((state: any) => state)
    return (
        <>
            {loggedInUser ? <b>{loggedInUser?.email} <Logout /></b> :
                <Space>
                    Not logged in.
                    <NavLink to='/'>
                        <Button type='primary'>
                            Login now
                        </Button>
                    </NavLink>
                </Space>}
        </>

    )
}