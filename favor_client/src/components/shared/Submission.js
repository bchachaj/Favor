import React, { useState } from 'react'
import ReactHTMLParser from 'react-html-parser';
import ReactPlayer from 'react-player'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { ExpandMore, ExpandLess, Stars } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import ItemCard from './ItemCard';

const useStyles = makeStyles({
    linkOutButton: {
        marginTop: "15px",
        marginBottom: "15px"
    }
});

const Submission = React.memo(({ item }) => {
    const [expand, setExpand] = useState(false)
    const classes = useStyles();

    const image_pattern = (/\.(gif|jpg|jpeg|tiff|png)$/i);
    const hasImgExtension = image_pattern.test(item.url);

    let submissionBody;

    // TODO: 
    // refactor

    if (item.is_self) {
        submissionBody = ReactHTMLParser(item.selftext_html)
    } else if (item.domain === "v.redd.it") {
        submissionBody = (
            <>
                <ReactPlayer controls width={'auto'} url={item.media.reddit_video.fallback_url} /><br />
                <div className="v-disclaimer">
                    Media hosted on v.reddit does not have sound on account of Reddit API design.<br />
                </div>
            </>
        );
    } else if (item.domain === "streamable.com") {
        submissionBody = <ReactPlayer controls width={'auto'} url={item.url} />
    } else if (hasImgExtension) {
        submissionBody = (
            <div className="sub-img-contain">
                <img src={item.url} alt="submission" />
            </div>
        );
    } else if (item.media_embed.content) {
        submissionBody = <div className="video_wrapper">{ReactHTMLParser(item.media_embed.content)}</div>;
    } else {
        submissionBody = (<div><a href={item.url}>{item.url}</a></div>);
    }

    const handleChange = () => {
        setExpand(prev => !prev);
    };

    const handleClickAway = () => {
        setExpand(false);
    }

    const toggleIcon = () => (
        !expand ? <ExpandMore /> : <ExpandLess />
    )

    const toggleThumbnail = () => {
        if (item.thumbnail === 'default' || item.thumbnail === 'self') {
            return <Stars fontSize="large" />
        } else {
            return <Avatar src={item.thumbnail} />
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <ItemCard>
                <div className="sub-top">
                    {toggleThumbnail()}
                    <h4>{item.title}</h4>
                </div>
                <span className="sub-toggle" onClick={() => handleChange()}>
                    {toggleIcon()}
                </span>
                <Collapse in={expand}>
                    <CardContent>
                        <div className={`container sub-body-contain sub-expanded`}>
                            {submissionBody}
                        </div>
                        <Button size="small"
                            variant="contained"
                            color="primary"
                            target="_blank"
                            className={classes.linkOutButton}
                            href={`https://reddit.com${item.permalink}`} >Visit original submission</Button>
                    </CardContent>
                </Collapse>
            </ItemCard>
        </ClickAwayListener>
    )
});

export default Submission;