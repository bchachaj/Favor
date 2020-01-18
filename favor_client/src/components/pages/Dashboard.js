import React, { useEffect, useState } from 'react'
import Navbar from './../shared/Navbar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ItemIndex from './../shared/ItemIndex';

export default function Dashboard({ savedItems }) {
    const [showComments, setShowComments] = useState(true);
    const [showSubs, setShowSubs] = useState(true);

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };
    const toggleSubs = () => {
        setShowSubs(prev => !prev);
    };

    return (
        <>
            <Navbar link="/subreddits" linkLabel={"Subreddits"} />

            <Card>
                <CardContent>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="start"
                                control={<Checkbox color="primary" checked={showComments} onClick={() => toggleComments()} />}
                                label="Show Comments"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox color="primary" checked={showSubs} onClick={() => toggleSubs()} />}
                                label="Show Submissons"
                                labelPlacement="start"
                            />

                        </FormGroup>
                    </FormControl>
                </CardContent>
            </Card>
            <ItemIndex items={savedItems} showComments={showComments} showSubs={showSubs} />
        </>
    )
}
