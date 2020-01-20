import React from 'react'
import LazyLoad from 'react-lazyload';
import Typography from '@material-ui/core/Typography';

import Comment from './Comment';
import Submission from './Submission';
import BackToTop from '../shared/BackToTop';

const lazyWrapper = (item, idx) => {
    return (
        <LazyLoad height={150} offset={15} key={idx} >
            {item}
        </LazyLoad>
    );
};

export default function ItemIndex({ items }) {

    const generatedList = items.map((item, idx) => {
        if (item.hasOwnProperty('body')) {
            return lazyWrapper(<Comment item={item} />, idx);
        } else if (!item.hasOwnProperty('body')) {
            return lazyWrapper(<Submission item={item} />, idx);
        }
    })

    const listItem = (<>
                        <Typography color="textSecondary" gutterBottom>
                            Viewing {generatedList.length} items
                        </Typography>
                        { generatedList }
                     </>);

    return (
        // <BackToTop>
            <div className="item_index_wrapper">
                {generatedList.length > 0 ? listItem : "No Content to display"}
            </div>
        // </BackToTop>
    )
}


