import { LEGAL_LAST_UPDATED } from "./site";

/** localStorage key for the visitor's acceptance of the terms, privacy and cookie policies. */
export const CONSENT_KEY = "fs-learn-consent-v1";

/** Acceptance is tied to the policy date, so changing LEGAL_LAST_UPDATED asks everyone again. */
export const CONSENT_VERSION = LEGAL_LAST_UPDATED;
