import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function About({ }: Props) {
    return (
        <>
            <h3>ABOUT</h3>
            <p>
                This page is my first mini project with React.
            </p>
            <p>
                The APIs are supported by Softech Aptech -
                Professional programmer training center.
            </p>
            <i>
                <b>
                    <p>
                        Login my website by this account:
                    </p>
                    <p>
                        Username: tungnt@softech.vn
                    </p>
                    <p>
                        Password: 123456789
                    </p>
                    <Link to='/'>Try it now</Link>
                </b>
            </i>
        </>
    )
}