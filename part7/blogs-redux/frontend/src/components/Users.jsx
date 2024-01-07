import React, { useEffect, useState } from "react"
import { getAll } from "../services/users"

const User = ({user}) =>
{
    return <tr>
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
    </tr>
}

const Users = () => 
{
    const [users, setUsers] = useState([])

    useEffect(() => 
    {
        getAll().then(response => setUsers(response))
    }, [])

    return <div>
        <h1>USERS</h1>
        <table>
            <tbody>
            <tr>
                <th>Name</th>
                <th>blogs created</th>
            </tr>
            {users.map(u => <User key={u.name} user={u}/>)}
            </tbody>
        </table>        
    </div>
}

export default Users