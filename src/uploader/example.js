const {
    login,
    upload
} = require('./index.js')
const fs = require('fs')
const Path = require('path');
let deleteFolder = function () {
    try {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file) => {
                let curPath = join(path, file)
                if (fs.statSync(curPath).isDirectory() === false) {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    } catch (err) {
        throw err
    }
}

function readDirSync(path) {
    let paths = []
    let pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        paths.push(Path.join(path, ele))
    })
    return paths
}
login('', '')
    .then(r => {
        let dirName = "D:/xxx"
        // must be a Dir
        const paths = readDirSync(dirName)
        let parts = []
        for (let key in paths) {
            parts.push({
                path: paths[key],
                title: `part${key}`,
                desc: ""
            })
        }
        upload(r.access_token, r.sid, r.mid, parts, 2, "example title", 171, ["tag1", "tag2"].join(','), "", "live url", )
            .then(() => {
                deleteFolder(dirName)
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch(err => {
        console.log(err)
    })