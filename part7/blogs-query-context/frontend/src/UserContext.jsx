import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => 
{
    return action
} 

const UserContext = createContext()

export const UserProvider = (props) =>
{
    const [user, userDispatch] = useReducer(userReducer, { username: '', token: '' })

    return (
        <UserContext.Provider value={[user, userDispatch] }>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => 
{
    const userAndDispatch = useContext(UserContext)
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

    if (user !== null)
    {
        return user;
    }

    return userAndDispatch[0]
}
  
export const useUserDispatch = () => 
{
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[1]
}
  
export default UserContext