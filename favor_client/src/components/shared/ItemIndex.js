import React, { useState } from 'react'
import LazyLoad from 'react-lazyload';

import Comment from './Comment';
import Submission from './Submission';


const lazyWrapper = (item, idx) => {
    return (
        <LazyLoad height={100} offset={15} key={idx} >
            {item}
        </LazyLoad>
    );
};

export default function ItemIndex({ items, showComments = true, showSubs = true }) {

    const generatedList = items.map((item, idx) => {
        if (item.hasOwnProperty('body') && showComments) {
            return lazyWrapper(<Comment item={item} />, idx);
        } else if (!item.hasOwnProperty('body') && showSubs) {
            return lazyWrapper(<Submission item={item} />, idx);
        }


    })


    return (
        <div className="item_index_wrapper">
            {generatedList.length > 0 ? generatedList : "No Content to display"}
        </div>
    )
}
