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

    return <div className="p-2 border-2 border-blue-500 bg-gray-200 rounded">
        <h1 className="font-bold text-xl">{user.username}</h1>
        <div className="p-2 border-2 border-black bg-gray-300 w-fit rounded">
            <h2 className="font-semibold text-l">Added blogs</h2>
            <ul>
                {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
            </ul>
        </div>
    </div>
}

export default UserBlogs