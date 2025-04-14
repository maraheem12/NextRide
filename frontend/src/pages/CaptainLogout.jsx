import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const captainLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        console.log(response.data)
        localStorage.removeItem('token')
        navigate('/captainLogin')
    })

  return (
    <> Captain Loggout Successfully </>
  )
}

export default captainLogout
