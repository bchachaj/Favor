import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

function TypeFilterControl({ toggleComments, toggleSubs, showComments, showSubs }) {
    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="start"
                    control={<Checkbox color="primary" 
                                       checked={showComments} 
                                       onClick={() => toggleComments()} />}
                    label="Show Comments"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="start"
                    control={<Checkbox color="primary" 
                                       checked={showSubs} 
                                       onClick={() => toggleSubs()} />}
                    label="Show Submissons"
                    labelPlacement="start"
                />

            </FormGroup>
        </FormControl>
    )
}

export default TypeFilterControl;