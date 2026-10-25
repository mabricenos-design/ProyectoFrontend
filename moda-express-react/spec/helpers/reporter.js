import { SpecReporter } from "jasmine-spec-reporter";

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
      displayDuration: true,
      displaySuccessful: true,
      displayFailed: true
    },
    summary: {
      displaySuccessful: true,
      displayFailed: true,
      displayDuration: true
    }
  })
);