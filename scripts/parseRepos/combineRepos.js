const fs = require('fs');
let repos = ['hep-explorer', "aeexplorer", "ae-timelines", "safety-histogram", "safety-delta-delta", "safety-outlier-explorer", "safety-results-over-time"]
const d3 = require("d3");
var showdown = require('showdown'),

allRepos = []
repos.forEach(function(repo){
    let org = repo == "hep-explorer" ? "safetygraphics" : "rhoinc"
    
    //import the raw object
    let txt = fs.readFileSync(`./data/details/raw/${repo}.json`);
    let raw = JSON.parse(txt);
    let obj = {}
    obj.repo = raw.name;
    obj.raw = raw;
    obj.chunks = [
        {
            label: "Technical Specs",
            description: "Technical documentation including, functional specifications, regressions tests and risk assessments.",
            url: `https://www.github.com/${org}/${repo}/wiki/master/Technical-Documentation`,
            path: `data/details/wikis/${repo}/Technical-Documentation.md`,
            type: "md",
        },
        {
            label: "Data Guidelines",
            description: "Data Specifications for the charts.",
            url: `https://www.github.com/${org}/${repo}/wiki/master/Data-Guidelines`,
            path: `data/details/wikis/${repo}/Data-Guidelines.md`,
            type: "md"
        },
        {
            label: "API",
            description: "Technical specifications for API.",
            url: `https://www.github.com/${org}/${repo}/wiki/master/API`,
            path: `data/details/wikis/${repo}/API.md`,
            type: "md"
        },
        {
            label: "Chart Configuration",
            description: "Technical specifications for chart configuration.",
            url: `https://www.github.com/${org}/${repo}/wiki/master/configuation`,
            path: `data/details/wikis/${repo}/configuration.md`,
            type:"md"
        },
        {
            label: "Testing Logs",
            description: "Interactive log of QC for all code updates. Includes code reviews, feature testing and regression testing for all releases.",
            url: null,
            path: `data/details/logs/${repo}_all.txt`,
            type:"txt"
        }
    ]       
    obj.chunks.forEach(function(chunk){
        chunk.raw = fs.existsSync(chunk.path) ? fs.readFileSync(chunk.path, "utf8") : "Not Found"
        if(chunk.type == "md"){
            converter = new showdown.Converter();
            converter.setOption('tables', true);
            chunk.html = converter.makeHtml(chunk.raw);
        }else if(chunk.type=="txt"){
            chunk.json = chunk.raw.split('\n').map(row => row.split('\t'));
            chunk.head = chunk.json[0]
            chunk.body = chunk.json.filter(function(d,i){return i>0})
            chunk.html= "<table id='pull-table'><thead><tr>"
            chunk.head.forEach(function(head_cell){
                chunk.html = chunk.html + `<th>${head_cell}</th>`
            })
            chunk.html = chunk.html+"</tr></thead><tbody>"
            chunk.body.forEach(function(row){
                chunk.html = chunk.html + "<tr>"
                row.forEach(function(cell){
                    chunk.html = chunk.html+`<td>${cell}</td>`
                })
                chunk.html = chunk.html + "</tr>"
            })
            chunk.html = chunk.html + "</tbody></table>"
        }
    })
    allRepos.push(obj)
})

//write the combined json to a file        
fs.writeFile('data/allRepos.json', JSON.stringify(allRepos, null, 4), error => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Combined file saved!`);
    }
});