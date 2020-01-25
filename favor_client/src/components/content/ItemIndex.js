import React, { useEffect } from 'react'
import LazyLoad from 'react-lazyload';
import Typography from '@material-ui/core/Typography';

import Comment from './Comment';
import Submission from './Submission';

const lazyWrapper = (item, idx) => {
    return (
        <LazyLoad height={250} offset={100} key={idx} once={true}>
            {item}
        </LazyLoad>
    );
};

export default function ItemIndex({ items, expanded }) {
    const generatedList = items.map((item, idx) => {
        if (item.hasOwnProperty('body')) {
            // return lazyWrapper(<Comment item={item} />, idx);
            return <Comment item={item} key={idx}/>
        } else if (!item.hasOwnProperty('body')) {
            return lazyWrapper(<Submission item={item} expanded={expanded} />, idx);
            // return <Submission item={item} expanded={expanded} key={idx}/>
        }
    })

    // useEffect(() => {}, [expanded])

    const listItem = (<>
                        <Typography color="textSecondary" gutterBottom>
                            Viewing {generatedList.length} items
                                        </Typography>
                        {generatedList}
                    </>);

    return (
        <div className="item_index_wrapper">
            {generatedList.length > 0 ? listItem : "No Content to display"}
        </div>
    )
}


