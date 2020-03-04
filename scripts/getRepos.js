const fs = require('fs');
//const read = require('read');
const fetch = require('node-fetch');
//const base64 = require('base-64');
//global.Headers = fetch.Headers;
const getReleases = require('./getReleases').getReleases;
const getPulls = require('./getPulls').getPulls;


exports.getRepos = function(headers) {
    fetch('https://api.github.com/users/RhoInc/repos?per_page=1000', { headers })
        .then(response => response.json())
        .then(json => {
            //Save repos.
            fs.writeFile('./data/repos.json', JSON.stringify(json, null, 4), error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('All repos successfully saved to ./data/repos.json!');
                }
            });

            return json;
        })
        /*
        .then(repos => {
            //Get each repo's releases.
            getReleases(headers, repos);
            
            return repos
        })
        */
        .then(repos => {
            console.log('getting PRs')
            //Get each repo's releases.
            getPulls(headers, repos);
        })
        .catch(error => {
            console.log(error);
        });
};
