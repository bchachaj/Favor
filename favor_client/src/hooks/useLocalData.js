import { useState, useEffect } from 'react'
import jsonFromLocalFile from "./../utils/readSavedFile";
import subredditSelector from "./../utils/subredditSelector";

export default function useLocalData() {
    const [savedItems, setSavedItems] = useState([]);
    const [subs, setSubs] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await jsonFromLocalFile();
            setSavedItems(response);

            const subredditSelect = subredditSelector(response);
            setSubs(subredditSelect);
            
            setIsLoaded(true);
        }

        fetchData();
    }, []);

    return { subs , savedItems, isLoaded };
}
