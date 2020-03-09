
//delete the data/details/wikis folder before running!

let repos = ['hep-explorer', "aeexplorer", "ae-timelines", "safety-histogram", "safety-delta-delta", "safety-outlier-explorer", "safety-results-over-time"]
const git = require('simple-git/promise')
repos.forEach(function(repo){
    let org = repo == "hep-explorer"?"safetygraphics":"rhoinc"
    git().silent(true)
        .clone(`https://github.com/${org}/${repo}.wiki.git`, `data/details/wikis/${repo}`)
        .then(() => console.log(`${repo} wiki saved`))
        .catch((err) => console.error('failed: ', err));
})
