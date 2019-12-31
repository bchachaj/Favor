import React, { useState } from 'react'
import ReactHTMLParser from 'react-html-parser';
import ReactPlayer from 'react-player'

export default function Submission({ item }) {
    const [expand, setExpand] = useState("");

    const subreddit = item.subreddit._path;
    // const thumbnail = item.thumbnail;
    const title = item.title;

    let thumbnail;

    if (item.thumbnail === 'default' || item.thumbnail === 'self') {
        thumbnail = 'default.png'
    } else {
        thumbnail = item.thumbnail;
    }

    let submissionBody;
    if (item.is_self) {
        submissionBody = ReactHTMLParser(item.selftext_html)
    } else if (item.domain === "v.redd.it") {
        submissionBody = <ReactPlayer controls width={'auto'} url={item.media.reddit_video.fallback_url} />
    } else if (item.domain === "streamable.com") {
        submissionBody = <ReactPlayer controls width={'auto'} url={item.url} />
    }
    else if (item.media_embed.content) {
        submissionBody = <div className="video_wrapper">{ReactHTMLParser(item.media_embed.content)}</div>;
    } else if (item.domain == 'i.redd.it') {
        // submissionBody = (<div><img src={item.url} alt="reddit image" /></div>)
    }
    else {
        submissionBody = (<div><a href={item.url}>{item.url}</a></div>);
    }

    const isImage = (item) => {
        const image_pattern = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        const hasImgExtension = image_pattern.test(item.url);
        if (hasImgExtension) {
            console.log(item.url)
            return (
                <div className="sub-img-contain">
                    <img src={item.url} alt="submission" />
                </div>
            );
        }
    }

    const subToggle = () => {
        console.log(expand, setExpand)
        if (expand === "sub-expanded") {
            setExpand("")
        } else {
            setExpand("sub-expanded")
        }
    }

    return (
        <div className="container sub-contain">
            <div className="sub-top">
                <img src={thumbnail} alt="thumbnail" />
                <h4>{item.title}</h4>
            </div>
            <span className="sub-toggle" onClick={() => subToggle()}>
                >>>
            </span>
            <div className={`container sub-body-contain ${expand}`}>
                {submissionBody}
                {isImage(item)}
            </div>

        </div>
    )
}
