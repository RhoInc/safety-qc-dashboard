import prepReleases from './onInit/prepReleases';
import makeMetrics from './onInit/makeMetrics';
import prepPulls from './onInit/prepPulls';

export default function onInit() {
    prepReleases.call(this);
    prepPulls.call(this);
    makeMetrics.call(this);
}
