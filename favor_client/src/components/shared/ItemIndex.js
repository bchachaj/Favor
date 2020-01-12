import React, { useState } from 'react'
import Comment from './Comment';
import Submission from './Submission';

export default function ItemIndex({ items, showComments = true, showSubs = true }) {

    const generatedList = items.map((item, idx) => {
        if (item.hasOwnProperty('body') && showComments) {
            return <Comment item={item} key={idx} />
        } else if (!item.hasOwnProperty('body') && showSubs) {
            return <Submission item={item} key={idx} />
        }
    })

    return (
        <div className="item_index_wrapper">
            {generatedList}
        </div>
    )
}
