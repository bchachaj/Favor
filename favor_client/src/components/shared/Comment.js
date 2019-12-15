import React from 'react'

export default function Comment({ item }) {
    return (
        <div className="container">
            Comment
            <span>{item.body}</span>
        </div>
    )
}
