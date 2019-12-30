import React from 'react'
import ReactHTMLParser from 'react-html-parser';
import ReactPlayer from 'react-player'

export default function Submission({ item }) {
    // console.log(item)
    const subreddit = item.subreddit._path;
    const thumbnail = item.thumbnail;
    const title = item.title;
    // console.log(thumbnail);
    // console.log(item, item.media_embed);
    console.dir(item);
    console.warn(item.domain);

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

    return (
        <div className="container sub-contain">
            <h4>{item.title}</h4>
            <img src={item.thumbnail} alt="thumbnail" />
            <div className="sub-body-contain">
                {submissionBody}
            </div>

            {/* pane top  */}

            {isImage(item)}
            {/* expandable */}
        </div>
    )
}
