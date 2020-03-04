import './util/polyfills';
import './util/moveTo';
import configuration from './configuration/index';
import { createControls, createTable } from 'webcharts';
import callbacks from './callbacks/index';

//layout and styles
import layout from './layout';
import styles from './styles';

export default function safetyQcDashboard(element = 'body', settings = {}) {
    //layout and styles
    layout(element);
    styles();

    //Define chart.
    const mergedSettings = Object.assign(
        {},
        configuration.settings,
        settings
    );
    const syncedSettings = configuration.syncSettings(mergedSettings);
    const syncedControlInputs = configuration.syncControlInputs(
        configuration.controlInputs(),
        syncedSettings
    );
    const controls = createControls(document.querySelector(element).querySelector('#wc-controls'), {
        location: 'top',
        inputs: syncedControlInputs
    });
    const table = createTable(
        document.querySelector(element).querySelector('#wc-chart'),
        syncedSettings,
        null //controls
    );

    //Define chart callbacks.
    for (const callback in callbacks)
        table.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    return table;
}
