import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSummary } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `${SITE_NAME} sets no cookies of its own. Learn what is stored in your browser and how to clear it.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      summary="What this site stores in your browser, what third parties may store, and how to remove it."
    >
      <LegalSummary>
        <ul className="list-disc space-y-1 pl-5">
          <li>{SITE_NAME} does not set any cookies of its own.</li>
          <li>
            It saves your progress, quiz scores, theme and policy acceptance in your
            browser’s local storage so the Site works as you expect. Nothing in it is sent
            to us.
          </li>
          <li>
            YouTube may set cookies only after you choose to play a video. There are no
            advertising or tracking cookies.
          </li>
        </ul>
      </LegalSummary>

      <h2>1. What cookies and local storage are</h2>
      <p>
        Cookies are small text files a website asks your browser to keep, and they are
        sent back to the website with each visit. Local storage is a similar browser
        feature that keeps data on your device, but it is not sent to any server
        automatically. Both can be cleared by you at any time.
      </p>

      <h2>2. What this site stores</h2>
      <p>
        The Site uses only local storage, and only for features you use directly. These
        entries are strictly necessary for those features and are never used for tracking
        or advertising.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>fs-learn-progress-v1</code>
            </td>
            <td>Local storage</td>
            <td>Remembers lessons you marked complete</td>
            <td>Until you clear it</td>
          </tr>
          <tr>
            <td>
              <code>fs-learn-quiz-v1</code>
            </td>
            <td>Local storage</td>
            <td>Remembers your quiz scores</td>
            <td>Until you clear it</td>
          </tr>
          <tr>
            <td>
              <code>theme</code>
            </td>
            <td>Local storage</td>
            <td>Remembers light, dark or system theme</td>
            <td>Until you clear it</td>
          </tr>
          <tr>
            <td>
              <code>fs-learn-consent-v1</code>
            </td>
            <td>Local storage</td>
            <td>Remembers that you accepted the policies, which version, and when</td>
            <td>Until you clear it or the policies change</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Third-party services</h2>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>What happens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>YouTube (Google)</td>
            <td>
              Video thumbnails load from <code>i.ytimg.com</code> without cookies. The
              player loads from <code>youtube-nocookie.com</code> only after you click
              play, and from then on Google may store cookies or local storage under its{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                cookie policy
              </a>
              .
            </td>
          </tr>
          <tr>
            <td>Vercel Speed Insights</td>
            <td>
              Measures page speed. It uses no cookies and no cross-site identifiers.
            </td>
          </tr>
          <tr>
            <td>Vercel hosting</td>
            <td>Serves the pages. No cookies are set for normal visits.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. The acceptance popup</h2>
      <p>
        Before you open a lesson, the Site asks you to accept the Terms and Conditions,
        the Privacy Policy and this Cookie Policy. Lessons stay hidden until you do. This
        popup is not an advertising or analytics consent banner, because the Site uses no
        non-essential cookies. Third-party cookies appear only after you act by clicking
        play on a video. If you clear your browser’s data, or if these policies change,
        you will be asked again.
      </p>

      <h2>5. How to control or delete stored data</h2>
      <ul>
        <li>
          <strong>Clear site data:</strong> in your browser’s settings, look for “Cookies
          and site data” or “Privacy”, find this site, and remove its data. This resets
          your progress and quiz scores.
        </li>
        <li>
          <strong>Block cookies:</strong> most browsers let you block third-party cookies.
          Videos may still play, but YouTube features that rely on cookies may not work.
        </li>
        <li>
          <strong>Private browsing:</strong> data saved in a private window is deleted
          when you close it.
        </li>
      </ul>

      <h2>6. Changes to this policy</h2>
      <p>
        If the Site starts using new cookies or storage, this page will be updated first
        and the “Last updated” date will change.
      </p>

      <p>
        See also the <Link href="/privacy">Privacy Policy</Link> and the{" "}
        <Link href="/terms">Terms and Conditions</Link>.
      </p>
    </LegalPage>
  );
}
