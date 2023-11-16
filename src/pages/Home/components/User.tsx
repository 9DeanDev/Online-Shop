import React from 'react'
import useAuthStore from '../../../hooks/UseAuthStore'
import Logout from './Logout'
type Props = {}

export default function User({ }: Props) {
    const { loggedInUser } = useAuthStore((state: any) => state)
    return (
        <>
            {loggedInUser ? <div>Welcom {loggedInUser?.email} <Logout /></div> : <div>Not logged in</div>}
        </>

    )
}