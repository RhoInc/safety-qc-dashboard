const fs = require('fs');
let raw = fs.readFileSync("data/allRepos.json")
let json =  JSON.parse(raw);

json.forEach(function(repo){
    let content = ""
    repo.chunks.forEach(function (chunk) {
        content = content +`<h2>${chunk.label} </h2>\n
        <div class="summary">${chunk.description} <a href="${chunk.url}">see original</a> </div>\n
        <div class="details">${chunk.html}</div>`
    })


    let template = fs.readFileSync("reports/template.html", "utf8")
    let repo_template = template
    .replace(/--fname--/g,repo.repo)
    .replace("--chunks--", content)
    
    fs.writeFile(`reports/${repo.repo}.html`, repo_template, error => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Combined file saved!`);
        }
    });

    //pdf versions
    var pdf = require('html-pdf');
    var options = { format: 'Letter' };
    pdf.create(repo_template, options).toFile(`./reports/pdf/${repo.repo}.pdf`, function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });

})