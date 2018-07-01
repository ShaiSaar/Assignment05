import * as fs from 'fs'
import * as util from 'util';

const readFileSync = util.promisify(fs.readFile);
const watchFileSync = util.promisify(fs.watchFile);

export default async function fetchTree() {
    const path = ".\/server\/models\/DB\/Json\/tree.json"

    try {
        const result = await readFileSync(path, {encoding: 'utf8'});

        return JSON.parse(result);
    } catch (e) {
        throw new Error(`Failed to read db file with error ${e}`);
    }

}

