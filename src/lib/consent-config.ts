import { LEGAL_LAST_UPDATED } from "./site";

/** localStorage key for the visitor's acceptance of the terms, privacy and cookie policies. */
export const CONSENT_KEY = "fs-learn-consent-v1";

/** Acceptance is tied to the policy date, so changing LEGAL_LAST_UPDATED asks everyone again. */
export const CONSENT_VERSION = LEGAL_LAST_UPDATED;

/**
 * Runs before the page paints. Marks <html data-consent> when the visitor has already
 * accepted, so lesson content is not blurred for them even for a moment.
 */
export const consentScript = `try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(
  CONSENT_KEY,
)})||"null");if(c&&c.version===${JSON.stringify(
  CONSENT_VERSION,
)})document.documentElement.dataset.consent="1"}catch(e){}`;
