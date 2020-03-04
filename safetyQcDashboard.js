(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('webcharts')) :
    typeof define === 'function' && define.amd ? define(['d3', 'webcharts'], factory) :
    (global = global || self, global.safetyQcDashboard = factory(global.d3, global.webCharts));
}(this, (function (d3$1, webcharts) { 'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {

                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    Math.log10 = Math.log10 = Math.log10 || function (x) {
        return Math.log(x) * Math.LOG10E;
    };

    // https://github.com/wbkd/d3-extended
    d3$1.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };

    d3$1.selection.prototype.moveToBack = function () {
        return this.each(function () {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };

    function rendererSettings() {
        var settings = {
            sortable: false,
            searchable: false,
            exportable: false,
            issue_data: null,
            metrics: [{
                label: 'Repo',
                text: function text(d) {
                    return d.name;
                },
                link: function link(d) {
                    return d.html_url;
                },
                title: function title(d) {
                    return d.description;
                },
                color: function color(d) {
                    return null;
                }
            }, {
                label: 'Issues',
                text: function text(d) {
                    return d.open_issues_count;
                },
                link: function link(d) {
                    return d.html_url + "/issues";
                },
                title: function title(d) {
                    return null;
                },
                color: function color(d) {
                    return d.has_issues ? "green" : "red";
                }
            }, {
                label: 'Releases',
                text: function text(d) {
                    return d.release_count;
                },
                link: function link(d) {
                    return d.html_url + "/releases";
                },
                title: function title(d) {
                    return null;
                },
                color: function color(d) {
                    return d.has_releases ? "green" : "red";
                }
            }, {
                label: 'Days Since Release',
                text: function text(d) {
                    return d.days_since_last_release;
                },
                link: function link(d) {
                    return d.last_release_url;
                },
                title: function title(d) {
                    return "Last release was " + d.days_since_last_release + " days ago on " + d3.time.format('%x')(d.last_release);
                },
                color: function color(d) {
                    return d.days_since_last_release < 365 ? "green" : "yellow";
                }
            }]
        };

        settings.cols = settings.metrics.map(function (m) {
            return m.label;
        });
        return settings;
    }

    function syncSettings(settings) {
        // webcharts settings

        return settings;
    }

    function controlInputs() {
        return [];
    }

    function syncControlInputs(controlInputs, settings) {
        return controlInputs;
    }

    var configuration = {
        rendererSettings: rendererSettings,
        settings: Object.assign({}, rendererSettings()),
        syncSettings: syncSettings,
        controlInputs: controlInputs,
        syncControlInputs: syncControlInputs
    };

    function onInit() {
        console.log(this);
        var chart = this;
        var config = this.config;
        //merge data from different metrics
        this.data.releases = d3.merge(this.config.releases) // raw releases is an array of arrays
        .map(function (release) {
            release.date = new Date(release.created_at);
            release.name = release.url.split('/')[5];
            release.repo_url = 'https://github.com/RhoInc/' + release.repo;
            // release.html = converter.makeHtml(release.body);
            return release;
        });

        this.data.raw.forEach(function (d) {
            d.releases = chart.data.releases.filter(function (r) {
                return d.name == r.name;
            }).sort(function (a, b) {
                return b.date.getTime() - a.date.getTime();
            });
            console.log(d.releases);
            d.release_count = d.releases.length;
            d.has_releases = d.release_count > 0;
            d.last_release = d.releases[0]["date"];
            d.last_release_url = d.releases[0]["url"];
            var today = new Date();
            var seconds_since_last_release = (today - d.last_release) / 1000;
            d.days_since_last_release = Math.floor(seconds_since_last_release / (60 * 60 * 24));
        });

        this.data.raw = this.data.raw.map(function (d) {
            var row_d = {};
            config.metrics.forEach(function (metric) {
                var cell_d = {};
                Object.keys(metric).forEach(function (attribute) {
                    if (attribute != "label") cell_d[attribute] = metric[attribute](d);
                });
                row_d[metric.label] = cell_d;
            });
            return row_d;
        });
    }

    function onLayout() {}

    function onDraw() {
        this.tbody.selectAll("tr").selectAll("td").style("text-align", function (d) {
            return d.text.color ? "center" : null;
        }).text('').append("span").attr("class", function (d) {
            return d.text.color ? 'w3-badge w3-' + d.text.color : "label";
        }).append("a").text(function (d) {
            return d.text.text;
        }).attr("title", function (d) {
            return d.text.title;
        }).attr("href", function (d) {
            return d.text.link;
        });
    }

    function onDestroy() {
        this.listing.destroy();
    }

    var callbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onDraw: onDraw,
        onDestroy: onDestroy
    };

    function layout(element) {
        var container = d3$1.select(element);
        container.append('div').classed('wc-component', true).attr('id', 'wc-controls');
        container.append('div').classed('wc-component', true).attr('id', 'wc-chart');
    }

    function styles() {
        var styles = [];
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function safetyQcDashboard() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //layout and styles
        layout(element);
        styles();

        //Define chart.
        var mergedSettings = Object.assign({}, configuration.settings, settings);
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);
        var controls = webcharts.createControls(document.querySelector(element).querySelector('#wc-controls'), {
            location: 'top',
            inputs: syncedControlInputs
        });
        var table = webcharts.createTable(document.querySelector(element).querySelector('#wc-chart'), syncedSettings, null //controls
        );

        //Define chart callbacks.
        for (var callback in callbacks) {
            table.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        }return table;
    }

    return safetyQcDashboard;

})));
