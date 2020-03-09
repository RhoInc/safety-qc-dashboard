export default function prepPulls() {
    let chart = this;
    //merge data from different metrics
    this.data.pulls = d3
        .merge(this.data.raw.map(m => m.raw.pulls)) // raw pulls is an array of arrays
        .map(function(pull) {
            pull.date = new Date(pull.created_at);
            pull.repo = pull.url.split('/')[5];
            pull.repo_url = 'https://github.com/RhoInc/' + pull.repo;
            // release.html = converter.makeHtml(release.body);
            return pull;
        });

    this.data.raw.forEach(function(d) {
        d.pulls = chart.data.pulls
            .filter(r => d.repo == r.repo)
            .sort((a, b) => b.date.getTime() - a.date.getTime());
        d.pull_count = d.pulls.length;
        d.has_pulls = d.pulls.length > 0;
        d.last_pull = d.pulls[0]['date'];
        d.last_pull_url = d.pulls[0]['url'];
        let today = new Date();
        let seconds_since_last_pull = (today - d.last_pull) / 1000;
        d.days_since_last_pull = Math.floor(seconds_since_last_pull / (60 * 60 * 24));
    });
}
