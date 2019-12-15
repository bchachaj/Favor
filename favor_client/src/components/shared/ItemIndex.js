import React from 'react'
import Comment from './Comment';
import Submission from './Submission';


export default function ItemIndex({ items }) {

    const generatedList = items.map((item, idx) => {
        if (item.hasOwnProperty('body')) {
            return <Comment item={item} key={idx} />
        } else {
            return <Submission item={item} key={idx} />
        }
    })

    return (
        <div>
            {generatedList}
        </div>
    )
}
