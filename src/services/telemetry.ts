/**
 * Candidate extension point.
 *
 * The starter intentionally does not collect or transmit user behavior.
 * Define the event contract, persistence and delivery semantics as part of
 * the assignment. Do not put AI provider secrets in the mobile application.
 */
export interface TelemetryClient {
  track(event: unknown): Promise<void>;
  flush(): Promise<void>;
}

export const telemetry: TelemetryClient = {
  async track() {},
  async flush() {},
};
