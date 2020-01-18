const subredditSelector = (items) => {
    // parse general data and create object for subreddit analysis
    const subAggregate = {}

    items.forEach(element => {
        const sub = element.subreddit.display_name;
        if (subAggregate[sub]) {
            subAggregate[sub].push(element.permalink)
        } else {
            subAggregate[sub] = [element.permalink];
        }
    });

    return subAggregate;

}


export default subredditSelector;