import React from 'react'

export default function UserRow({ user, index }) {
    return (

        <tr key={user._id} className="border-b dark:border-gray-700">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{user.name || "N/A"}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2 capitalize">{user.role}</td>
            <td className="px-4 py-2">
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2">
                    Delete
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Edit
                </button>
            </td>
        </tr>

    )
}
