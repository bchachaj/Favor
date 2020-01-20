
const jsonFromLocalFile = async () => {
    const set = await fetch('/saved/saved_items.txt')
        .then((r) => r.text())
        .then((text) => {
            return convertToJSON(text)
        }).catch(e => console.log(e));
    return set;
};

const convertToJSON = (text) => {
    const string = text;
    const lines = string.split('\n');
    const set = lines.filter(line => line.length > 0).map((line) => {
        return JSON.parse(line);
    })
    return set;
}


export default jsonFromLocalFile; 