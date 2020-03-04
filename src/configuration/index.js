import rendererSettings from './rendererSettings';
import syncSettings from './syncSettings';
import controlInputs from './controlInputs';
import syncControlInputs from './syncControlInputs';

export default {
    rendererSettings,
    settings: Object.assign({}, rendererSettings()),
    syncSettings,
    controlInputs,
    syncControlInputs
};
