import * as fs from 'fs'

export default function fetchTree() {
    const tree = fs.readFile("./tree.json", (err, data) => {
        if (err) throw err;
        return JSON.parse(tree)
    })
    // tree = "I cant fetch a json file"

}

