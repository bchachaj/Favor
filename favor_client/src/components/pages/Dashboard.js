import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import jsonFromLocalFile from './../../utils/readSavedFile';
import ItemIndex from './../shared/ItemIndex';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginLeft: theme.spacing(2),
    },

}));

export default function Dashboard() {
    const [savedItems, setSavedItems] = useState([]);
    const [showComments, setShowComments] = useState(true);
    const [showSubs, setShowSubs] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const response = await jsonFromLocalFile();
            setSavedItems(response);
        }
        fetchData();

    }, [])

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };
    const toggleSubs = () => {
        setShowSubs(prev => !prev);
    };
    return (
        <div className="container">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Favor
                    </Typography>
                    <Link to="/subreddits"><Button className={classes.menuButton} variant="contained" color="inherit">Subreddits</Button></Link>
                </Toolbar>
            </AppBar>

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
        </div >
    )
}
