import React from 'react'
import useAuthStore from '../../../hooks/UseAuthStore'
import Logout from './Logout'
type Props = {}

export default function User({ }: Props) {
    const { loggedInUser } = useAuthStore((state: any) => state)
    return (
        <>
            {loggedInUser ? <b>{loggedInUser?.email} <Logout /></b> : <div>Not logged in</div>}
        </>

    )
}