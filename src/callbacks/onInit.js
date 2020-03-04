import prepReleases from "./onInit/prepReleases";
import makeMetrics from "./onInit/makeMetrics";

export default function onInit() {
    prepReleases.call(this)
    makeMetrics.call(this)
}
