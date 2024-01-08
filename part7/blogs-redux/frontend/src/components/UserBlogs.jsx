import React, { useEffect, useState } from "react"
import { getAll } from "../services/users"
import { useParams } from "react-router-dom";

const UserBlogs = () => 
{
    const id = useParams().id;
    const [user, setUser] = useState(null)

    useEffect(() => 
    {
        getAll().then(response => 
        {
            const result = response.find(a => a.id === id)
            setUser(result);
        })
    }, [])
    
    if (user === null || user === undefined)
        return null;

    return <div>
        <h1>{user.username}</h1>
        <h2>added blogs</h2>
        <ul>
            {user.blogs.map(b => <li>{b.title}</li>)}
        </ul>
    </div>
}

export default UserBlogs