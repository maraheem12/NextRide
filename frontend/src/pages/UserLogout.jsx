import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const userLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        console.log(response.data)
        localStorage.removeItem('token')
        navigate('/userLogin')
    })

  return (
    <> User Loggout Successfully </>
  )
}

export default userLogout
