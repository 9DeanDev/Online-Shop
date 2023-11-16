import { Divider, Space } from 'antd'
import Login from './components/Login'
import Logout from './components/Logout'
import User from './components/User'

type Props = {}

export default function Home({ }: Props) {
    return (
        <div>
            <Login />
        </div>
    )
}