export default function rendererSettings() {
    let settings = {
        sortable: false,
        searchable: false,
        exportable: false,
        metrics: [
            {
                label: 'Repo',
                text: function(d) {
                    return d.repo;
                },
                link: function(d) {
                    return d.raw.html_url;
                },
                title: function(d) {
                    return d.raw.description;
                },
                color: function(d) {
                    return null;
                }
            },
            {
                label: 'Issues',
                text: function(d) {
                    return d.raw.open_issues_count;
                },
                link: function(d) {
                    return d.raw.html_url + '/issues';
                },
                title: function(d) {
                    return null;
                },
                color: function(d) {
                    return d.raw.has_issues ? 'green' : 'red';
                }
            },
            {
                label: 'Releases',
                text: function(d) {
                    return d.release_count;
                },
                link: function(d) {
                    return d.raw.html_url + '/releases';
                },
                title: function(d) {
                    return null;
                },
                color: function(d) {
                    return d.has_releases ? 'green' : 'red';
                }
            },
            {
                label: 'Days Since Release',
                text: function(d) {
                    return d.days_since_last_release;
                },
                link: function(d) {
                    return d.last_release_url;
                },
                title: function(d) {
                    return (
                        'Last release was ' +
                        d.days_since_last_release +
                        ' days ago on ' +
                        d3.time.format('%x')(d.last_release)
                    );
                },
                color: function(d) {
                    return d.days_since_last_release < 180 ? 'green' : 'yellow';
                }
            },
            {
                label: 'Pulls',
                text: function(d) {
                    return d.pull_count;
                },
                link: function(d) {
                    return d.html_url + '/pulls';
                },
                title: function(d) {
                    return null;
                },
                color: function(d) {
                    return d.has_pulls ? 'green' : 'red';
                }
            }
        ]
    };

    settings.cols = settings.metrics.map(m => m.label);
    return settings;
}
