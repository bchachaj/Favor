import React, { useState, useEffect } from 'react'
import ReactHTMLParser from 'react-html-parser';
import ReactPlayer from 'react-player'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Collapse from '@material-ui/core/Collapse';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import ItemCard from './ItemCard';

const useStyles = makeStyles({
    linkOutButton: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    subTitle: {
        opacity: 0.6
    },
    contentHeader: {
        paddingLeft: '10px'
    },
    scrollAnchor: {
        position: "absolute",
        top: "-120px",
        left: 0
    }, 
    videoPadding: {
        paddingBottom: '56%'
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
    const isVReddit = item.domain === "v.redd.it";
    const isGfycat = item.domain === 'gfycat.com';
    const isHostedVid = item.media_embed.content;

    const scrollAnchor = `scroll-anchor-${item.id}`;
    let submissionBody;

    const vRedditTemplate = (item) => {
        if(item.removed_by_category === 'moderator') return <div>Removed by moderator</div>
        if(item.media === null) return; 
        return(<>
            <ReactPlayer controls width={'auto'} height={'auto'} url={item.media.reddit_video.fallback_url} /><br />
            <div className={classes.subTitle}>
                Media hosted on v.reddit does not have sound on account of Reddit API design.<br />
            </div>
        </>);
    };

    const imgTemplate = (item) => (
        <div className="sub-img-contain">
            <img src={item.url} alt="submission" />
        </div>
    );

    if (item.is_self) {
        // simple text
        submissionBody = ReactHTMLParser(item.selftext_html)
    } else if (isStreamable) {
        submissionBody = <div className={classes.videoPadding}><ReactPlayer controls width={'auto'} height={'auto'} url={item.url} /></div>
    } else if (hasImgExtension) {
        submissionBody = imgTemplate(item);
    } else if (isHostedVid) {
        submissionBody = <div className="video_wrapper">{ReactHTMLParser(item.media_embed.content)}</div>;
    } else if (isGfycat) {
        submissionBody = <ReactPlayer controls width={'auto'} height={'auto'} url={item.preview.reddit_video_preview.fallback_url} />
    } else if (isVReddit) {
        console.log(item)
        submissionBody = vRedditTemplate(item);
    } else {
        //simple link
        submissionBody = (<div><a href={item.url}>{item.url}</a></div>);
    }

    const toggleExpand = (e) => {
        setExpand(prev => !prev);
        if(!expand) {
            const scrollOpts = { behavior: 'smooth', inline: 'nearest'};
            const selectedEl = document.querySelector(`#${scrollAnchor}`);
            if(e.target.scrollIntoView) {
                setTimeout(() => {
                    selectedEl.scrollIntoView(scrollOpts)
                }, 200)
            }
        }
    };

    const handleClickAway = () => {
        // only allow clickaway if global 'expand all' not toggled
        // if(!expanded) {
        //     setExpand(false);
        // }
    }

    const toggleIcon = () => (
        !expand ? <ExpandMore /> : <ExpandLess />
    )

    const displayRelevantIcon = () => {
        //show default icon if no thumbnail available 
        if (item.thumbnail === 'default' || item.thumbnail === 'self') {
            return <Avatar variant="square"><BookmarkBorderIcon /></Avatar>
        } else {
            return <Avatar src={item.thumbnail} variant="square"/>
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <ItemCard>
                <div className="sub-top" onClick={(e) => toggleExpand(e)}>
                    {displayRelevantIcon()}
                    <h4 className={classes.contentHeader}>
                        <span className={classes.subTitle}>{item.subreddit.display_name}</span>
                        &nbsp;-&nbsp;{item.title}
                    </h4>
                </div>
                <span className="sub-toggle" onClick={(e) => toggleExpand(e)}>
                    <div id={scrollAnchor} className={classes.scrollAnchor}></div>
                    {toggleIcon()}
                </span>
                <Collapse in={expand} timeout={300}>
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