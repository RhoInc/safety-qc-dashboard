const fs = require('fs');
//const read = require('read');
const fetch = require('node-fetch');
//const base64 = require('base-64');
//global.Headers = fetch.Headers;
//const repos = require('../data/repos.json');

exports.getPulls = function (headers, repos) {
    //Fetch each repo's releases.
    const releases = repos.map(repo => fetch(repo.pulls_url.replace('{/number}', '?state=all&per_page=1000'), { headers })); // fetch each repo's releases

    Promise.all(releases)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(json => {
            //Save releases.
            fs.writeFile('./data/pulls.json', JSON.stringify(json, null, 4), error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('All releases successfully saved to ./data/pulls.json!');
                    process.exit();
                }
            });

            return json;
        })
        .catch(error => {
            console.log(error);
        });
};
