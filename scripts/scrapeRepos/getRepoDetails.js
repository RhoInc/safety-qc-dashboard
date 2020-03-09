const fetch = require('node-fetch');
const fs = require('fs');

exports.getRepoDetails = function(org, repo, headers){
    let root = `https://api.github.com/repos/${org}/${repo}`
    let paths = ["","/pulls", "/releases", "/issues"]
    let requests = paths.map(p => fetch(root + p +"?per_page=1000&state=all", {headers}))
    
    Promise.all(requests)
    .then(responses => {
        return Promise.all(responses.map(response => response.json()));
    }).then(array => {
        let json = array[0]
        json["pulls"] = array[1]
        json["releases"] = array[2]
        json["issues"] = array[3]
        return json
    }).then(json => {
        fs.writeFile(`./data/details/${repo}.json`, JSON.stringify(json, null, 4), error => {
            if (error) {
                console.log(error);
            } else {
                console.log(`${repo} saved!`);
            }
        });
    })
}