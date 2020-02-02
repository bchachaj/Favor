
import { useEffect, useState } from 'react'

export default function useChipFilter( savedItems ) {
    const [activeFilters, setActiveFilters] = useState([]);
    const [initState, setInitState] = useState([]);

    useEffect(() => {
        setInitState(savedItems);
    }, [savedItems]);
    
    const toggleChipFilter = (sub) => {
        if (activeFilters.includes(sub)) {
            const updatedArr = activeFilters.filter((el) => el !== sub);
            setActiveFilters(updatedArr);
        } else {
            setActiveFilters(activeFilters => [...activeFilters, sub]);
        }
    };
    
    const chipFilteredState = () => {
        if (activeFilters.length === 0) return initState;
        return initState.filter((sub) => {
            return activeFilters.includes(sub.subreddit.display_name)
        });
    }

    return { activeFilters, toggleChipFilter, chipFilteredState };

}

