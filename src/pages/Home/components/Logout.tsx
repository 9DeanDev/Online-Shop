import React from 'react'
import useAuthStore from '../../../store/UseAuthStore'
import { Button, Form } from 'antd'

type Props = {}

export default function Logout({ }: Props) {
    const { logout, loggedInUser } = useAuthStore((state: any) => state)
    return (
        < Button type='primary' onClick={() => {
            logout()
        }}>
            Logout
        </Button >
    )
}