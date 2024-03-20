import React from 'react'

const ResetPassword = ({ params }:{params:{password_token:string}}) => {
    return (
        <div>{params.password_token}</div>
    )
}
export default ResetPassword