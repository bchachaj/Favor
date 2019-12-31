import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import jsonFromLocalFile from './../../utils/readSavedFile';
import ItemIndex from './../shared/ItemIndex';

export default function Dashboard() {
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await jsonFromLocalFile();
            setSavedItems(response);
        }

        fetchData();

    }, [])

    // const allItems = savedItems;
    // let reactElements = allItems.map((item, idx) => (<div key={idx} className="container">{item.title}</div>))

    return (
        <div className="container">
            Dashboard

            <div className="">
                {/* <Link to="/comments"><button className="button-outline">Comments</button></Link> */}
                {/* <Link to="/submissions"><button className="button-outline">Submissions</button></Link> */}
                <Link to="/subreddits"><button className="button-outline">Subreddits</button></Link>
            </div >

            <ItemIndex items={savedItems} />
        </div >
    )
}
