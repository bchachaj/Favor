import React, { useState, useEffect } from 'react'
import ReactHTMLParser from 'react-html-parser';
import ReactPlayer from 'react-player'
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

const Submission = React.memo(({ item, expanded }) => {
    const [expand, setExpand] = useState(expanded)
    const classes = useStyles();

    useEffect(() => {
        setExpand(expanded)
    }, [expanded])

    const image_pattern = (/\.(gif|jpg|jpeg|tiff|png)$/i);
    const hasImgExtension = image_pattern.test(item.url);
    const isStreamable = item.domain === "streamable.com";
    const isVReddit = item.domain === "streamable.com";
    const isHostedVid = item.media_embed.content;

    let submissionBody;

    const vRedditTemplate = (item) => (
        <>
            <ReactPlayer controls width={'auto'} url={item.media.reddit_video.fallback_url} /><br />
            <div className="v-disclaimer">
                Media hosted on v.reddit does not have sound on account of Reddit API design.<br />
            </div>
        </>
    );

    const imgTemplate = (item) => (
        <div className="sub-img-contain">
            <img src={item.url} alt="submission" />
        </div>
    );

    if (item.is_self) {
        // simple text
        submissionBody = ReactHTMLParser(item.selftext_html)
    } else if (isStreamable) {
        submissionBody = <ReactPlayer controls width={'auto'} url={item.url} />
    } else if (hasImgExtension) {
        submissionBody = imgTemplate(item);
    } else if (isHostedVid) {
        submissionBody = <div className="video_wrapper">{ReactHTMLParser(item.media_embed.content)}</div>;
    } else if (isVReddit) {
        submissionBody = vRedditTemplate(item);
    } else {
        //simple link
        submissionBody = (<div><a href={item.url}>{item.url}</a></div>);
    }

    const handleChange = () => {
        setExpand(prev => !prev);
    };

    const handleClickAway = () => {
        // only allow clickaway if global 'expand all' not toggled
        if(!expanded) {
            setExpand(false);
        }
    }

    const toggleIcon = () => (
        !expand ? <ExpandMore /> : <ExpandLess />
    )

    const displayRelevantIcon = () => {
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
                    {displayRelevantIcon()}
                    <h4>{item.title} - {item.subreddit.display_name}</h4>
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
                            color="default"
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