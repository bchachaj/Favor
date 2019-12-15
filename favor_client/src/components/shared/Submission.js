import React from 'react'
import ReactHTMLParser from 'react-html-parser';

export default function Submission({ item }) {
    // console.log(item)
    const subreddit = item.subreddit._path;
    const thumbnail = item.thumbnail;
    const title = item.title;
    console.log(thumbnail);

    let submissionBody;
    if (item.is_self) {
        submissionBody = ReactHTMLParser(item.selftext_html)
    } else {
        submissionBody = ReactHTMLParser(item.media_embed.content);
    }

    return (
        <div className="container">
            {item.title}<br />
            {submissionBody}

            {/* pane top  */}


            {/* expandable */}
        </div>
    )
}
