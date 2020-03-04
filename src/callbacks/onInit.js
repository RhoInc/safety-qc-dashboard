export default function onInit() {
    console.log(this)
    let chart = this;
    let config = this.config
    //merge data from different metrics
    this.data.releases = d3.merge(this.config.releases) // raw releases is an array of arrays
    .map(function(release){
        release.date = new Date(release.created_at);
        release.name = release.url.split('/')[5];
        release.repo_url = 'https://github.com/RhoInc/' + release.repo;
       // release.html = converter.makeHtml(release.body);
       return release
    })

    this.data.raw.forEach(function(d){
        d.releases = chart.data.releases
        .filter(r=>d.name==r.name)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        console.log(d.releases)
        d.release_count = d.releases.length;
        d.has_releases = d.release_count > 0;
        d.last_release = d.releases[0]["date"]
        d.last_release_url = d.releases[0]["url"]
        let today = new Date()
        let seconds_since_last_release = (today - d.last_release) / 1000
        d.days_since_last_release = Math.floor(seconds_since_last_release / (60 * 60 * 24))  
    })

    this.data.raw = this.data.raw.map(function(d) {
        let row_d = {};
        config.metrics.forEach(function(metric) {
            let cell_d = {};
            Object.keys(metric).forEach(function(attribute){
                if(attribute != "label") cell_d[attribute] = metric[attribute](d)    
            })
            row_d[metric.label] = cell_d;
        });
        return row_d;
    });
}
