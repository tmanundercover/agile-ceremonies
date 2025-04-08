import {configureToMatchImageSnapshot, MatchImageSnapshotOptions} from 'jest-image-snapshot';

const customConfig: MatchImageSnapshotOptions = {
    customDiffConfig: {
        threshold: 0.1
    },
    failureThreshold: 0.01,
    failureThresholdType: "percent"
};

expect.extend({
    toMatchImageSnapshot: configureToMatchImageSnapshot(customConfig)
});
