export default function makeMetrics() {
    let chart = this;
    let config = this.config;
    this.data.raw = this.data.raw.map(function(d) {
        let row_d = {};
        config.metrics.forEach(function(metric) {
            let cell_d = {};
            Object.keys(metric).forEach(function(attribute) {
                if (attribute != 'label') cell_d[attribute] = metric[attribute](d);
            });
            row_d[metric.label] = cell_d;
        });
        return row_d;
    });
}
