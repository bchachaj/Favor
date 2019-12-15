import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import jsonFromLocalFile from './../../utils/readSavedFile';


export default function Dashboard() {
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await jsonFromLocalFile();
            setSavedItems(response);
        }

        fetchData();

    }, [])


    const allItems = savedItems;
    let reactElements = allItems.map((item, idx) => (<div key={idx} className="container">{item.title}</div>))

    return (
        <div className="container">
            Dashboard

            <div className="container link_container">
                <Link to="/comments"><button className="button-outline">Comments</button></Link>
                <Link to="/submissions"><button className="button-outline">Submissions</button></Link>
            </div >

            <div>
                {reactElements}
            </div>
        </div >
    )
}
