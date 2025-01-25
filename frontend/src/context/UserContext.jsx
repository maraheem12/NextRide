import React, { createContext } from 'react'
import {State} from 'react'
export const UserDataContext = createContext

const userContext = ({children}) => {
    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:'' 
        }
    })
  return (
    <div>
        <UserDataContext.Provider value={{name: 'John Doe'}}>
          {children}
        </UserDataContext.Provider>

    </div>
  )
}

export default userContext
