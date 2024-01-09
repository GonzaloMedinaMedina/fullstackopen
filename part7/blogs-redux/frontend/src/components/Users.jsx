import React, { useEffect, useState } from "react"
import { getAll } from "../services/users"
import { Link } from "react-router-dom"

const User = ({user}) =>
{
    const padding = {
        paddingRight: 5
    }

    return <tr className="text-center p-2">
        <td><Link className='bg-sky-500 hover:bg-sky-700 rounded-full p-1' style={padding} to={`/users/${user.id}`} state={user}>{user.name}</Link></td>
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

    return <div className="p-2 border-2 border-blue-500 bg-gray-200 rounded">
        <h1 className="font-bold text-xl">USERS</h1>
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