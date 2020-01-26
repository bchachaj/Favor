import React from 'react'
import Button from '@material-ui/core/Button';

export default function ExpandControl({ expanded, setExpanded }) {
    const controlLabel = expanded ? 'Collapse All' : 'Expand All';

    return (
        <Button onClick={() => setExpanded(prev => !prev)} 
                variant="outlined" 
                style={{ marginTop: '15px' }}>
            {controlLabel}
        </Button>
    )
}
