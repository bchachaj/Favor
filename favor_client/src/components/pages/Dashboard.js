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

    return (
        <div className="container">
            <div className="nav-bar">
                <Link to="/subreddits"><button className="button-outline">Subreddits</button></Link>
            </div >

            <ItemIndex items={savedItems} />
        </div >
    )
}
