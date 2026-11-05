/**
 * Runs before paint: marks <html class="js"> (script-only states, such as the home page's
 * lesson-part switcher) and <html data-returning> when the visitor has progress or a
 * recent lesson, so the home page shows "Welcome back" instead of the hero without a jump.
 */
export const returningScript = `document.documentElement.classList.add("js");try{var a=localStorage.getItem("fs-learn-progress-v1"),b=localStorage.getItem("fs-learn-last-v1");if((a&&a.length>2)||(b&&b.length>2))document.documentElement.dataset.returning=""}catch(e){}`;
