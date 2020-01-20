
import React, { useEffect, useState } from 'react'

export default function useChipFilter( savedItems ) {
    const [filters, setFilters] = useState([]);
    const [initState, setInitState] = useState([]);

    useEffect(() => {
        setInitState(savedItems);
    }, [savedItems]);
    
    const toggleChipFilter = (sub) => {
        if (filters.includes(sub)) {
            const updatedArr = filters.filter((el) => el !== sub);
            setFilters(updatedArr);
        } else {
            setFilters(filters => [...filters, sub]);
        }
    };
    
    const chipFilteredState = () => {
        if (filters.length === 0) return initState;
        return initState.filter((sub) => {
            return filters.includes(sub.subreddit.display_name)
        });
    }

    return { filters, toggleChipFilter, chipFilteredState };

}

