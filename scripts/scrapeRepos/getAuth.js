const read = require('read');
const base64 = require('base-64');
const fetch = require('node-fetch');
global.Headers = fetch.Headers;
const getRepoDetails = require('./getRepoDetails').getRepoDetails;

const pw = process.argv[2];
const headers = new Headers();

let repos = ['hep-explorer',"aeexplorer","ae-timelines", "safety-histogram","safety-delta-delta", "safety-outlier-explorer","safety-results-over-time"]
 
if (pw) {
    headers.append('Authorization', 'Basic ' + base64.encode('jwildfire@gmail.com' + ':' + pw));
    repos.forEach(function (repo) {
        getRepoDetails(repo=="hep-explorer"?"safetygraphics":"rhoinc", repo, headers)
    })
} else {
    read({ prompt: 'Username: ' }, function (error, username) {
        if (error) {
            console.log('Error: ' + error);
            return;
        }

        read({ prompt: 'Password: ', silent: true }, function (error, password) {
            if (error) {
                console.log('Error: ' + error);
                return;
            }
            //Define fetch headers.
            headers.append('Authorization', 'Basic ' + base64.encode(username + ':' + password));
            repos.forEach(function (repo) {
                getRepoDetails(repo == "hep-explorer" ? "safetygraphics" : "rhoinc", repo, headers)
            })
        });
    });
}


