import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSummary } from "@/components/LegalPage";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your information. No accounts, no forms, no ad trackers, and your progress stays in your browser.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary={`What ${SITE_NAME} collects, what it does not, and the rights you have under Indian and US law.`}
    >
      <LegalSummary>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            You can use the whole site without an account. We never ask for your name,
            email, phone number or payment details.
          </li>
          <li>
            Your lesson progress, quiz scores and theme choice are saved only in your own
            browser. They are never sent to us.
          </li>
          <li>
            Our host (Vercel) keeps standard technical logs and anonymous performance
            data. YouTube receives your IP address when video thumbnails or videos load.
          </li>
          <li>We do not sell, rent or share personal information for advertising.</li>
        </ul>
      </LegalSummary>

      <h2>1. Who this policy covers</h2>
      <p>
        This policy applies to the website at <a href={SITE_URL}>{SITE_URL}</a> (the
        “Site”), operated as a free, non-commercial learning resource. “We”, “us” and
        “our” mean the operator of the Site. “You” means anyone who visits it.
      </p>
      <p>
        It is written to meet the requirements of India’s Information Technology Act, 2000
        and the Information Technology (Reasonable Security Practices and Procedures and
        Sensitive Personal Data or Information) Rules, 2011, the Digital Personal Data
        Protection Act, 2023 and its Rules (“DPDP Act”), and applicable United States
        laws, including the California Online Privacy Protection Act (CalOPPA), the
        California Consumer Privacy Act as amended by the CPRA (CCPA), other US state
        privacy laws, and the Children’s Online Privacy Protection Act (COPPA).
      </p>

      <h2>2. Information we do not collect</h2>
      <p>
        The Site has no sign-up, login, comments, contact form or newsletter. We do not:
      </p>
      <ul>
        <li>
          ask for or store your name, email address, phone number or postal address;
        </li>
        <li>collect passwords, financial information, government IDs or biometrics;</li>
        <li>
          collect any “sensitive personal data or information” as defined in the 2011
          Indian rules;
        </li>
        <li>
          use advertising networks, ad pixels, fingerprinting or cross-site tracking;
        </li>
        <li>
          build profiles of you, make automated decisions about you, or sell or share
          personal information for cross-context behavioural advertising.
        </li>
      </ul>

      <h2>3. Information stored on your device</h2>
      <p>
        To remember where you are in the course, the Site saves a small amount of data in
        your browser’s <code>localStorage</code>. This data stays on your device. We
        cannot see it, and it is not sent to our servers.
      </p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>What it holds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>fs-learn-progress-v1</code>
            </td>
            <td>Which lessons you marked as complete</td>
          </tr>
          <tr>
            <td>
              <code>fs-learn-quiz-v1</code>
            </td>
            <td>Your module quiz scores</td>
          </tr>
          <tr>
            <td>
              <code>theme</code>
            </td>
            <td>Light, dark or system theme</td>
          </tr>
          <tr>
            <td>
              <code>fs-learn-consent-v1</code>
            </td>
            <td>
              That you accepted these policies, which version, and when, so we do not ask
              again
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        You can delete this data at any time by clearing site data in your browser
        settings. See the <Link href="/cookies">Cookie Policy</Link> for details.
      </p>

      <h2>4. Information collected automatically</h2>
      <h3>Hosting logs</h3>
      <p>
        The Site is hosted by Vercel Inc. Like any web server, Vercel’s systems
        automatically receive technical information when your browser requests a page: IP
        address, browser and device type, the page requested, the referring page, and the
        date and time. This is used to deliver pages, keep the service secure and prevent
        abuse. We do not use it to identify individual visitors. Vercel handles this data
        under the{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel Privacy Policy
        </a>
        .
      </p>
      <h3>Performance measurement</h3>
      <p>
        We use Vercel Speed Insights to measure how fast pages load (Core Web Vitals). It
        records the page path, loading and responsiveness timings, and general device and
        connection information. It does not use cookies and does not identify or track you
        across websites.
      </p>

      <h2>5. Third-party content</h2>
      <h3>YouTube videos</h3>
      <p>
        Lessons show thumbnails of recommended YouTube videos. These images are loaded
        from Google’s servers (<code>i.ytimg.com</code>), so Google receives your IP
        address and browser information when a lesson page loads. The video player itself
        loads only after you click play, and uses YouTube’s privacy-enhanced mode (
        <code>youtube-nocookie.com</code>). Once you play a video, Google may store
        cookies or similar data on your device under the{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>
        . We do not receive or share any record of which videos you watch.
      </p>
      <h3>External links</h3>
      <p>
        Lessons link to official documentation and other websites. We do not control those
        sites and are not responsible for their content or privacy practices. Read their
        policies before giving them any information.
      </p>

      <h2>6. How we use information</h2>
      <p>The limited technical information described above is used only to:</p>
      <ul>
        <li>deliver the Site and its features to you;</li>
        <li>keep the Site secure, detect abuse and fix errors;</li>
        <li>understand and improve page speed;</li>
        <li>comply with the law.</li>
      </ul>
      <p>
        Under the DPDP Act, this processing relies on legitimate uses, including your
        voluntary use of the Site, and is limited to what is needed for those purposes.
      </p>

      <h2>7. Sharing and sale</h2>
      <p>
        We do not sell, rent or trade personal information, and we do not “share” it for
        cross-context behavioural advertising as those terms are defined in the CCPA.
        Technical data is handled only by the service providers named above (Vercel and,
        for videos, Google) for the purposes described. We may disclose information if
        required by law, court order or a lawful request from a government authority.
      </p>

      <h2>8. Retention</h2>
      <p>
        Data in your browser stays until you clear it. Hosting logs and performance data
        are kept by Vercel for limited periods under its own retention schedule and then
        deleted. We do not keep separate copies.
      </p>

      <h2>9. Security</h2>
      <p>
        The Site is served only over HTTPS, and we rely on the security practices of our
        hosting provider. No method of transmission or storage is completely secure, so we
        cannot guarantee absolute security. Because we do not hold accounts or personal
        profiles, there is very little personal data that could be exposed.
      </p>

      <h2>10. Your rights</h2>
      <h3>India (DPDP Act)</h3>
      <p>
        As a Data Principal you have the right to information about processing, to
        correction and erasure of your personal data, to grievance redressal and to
        nominate another person to exercise your rights. You may also approach the Data
        Protection Board of India.
      </p>
      <h3>United States</h3>
      <p>
        Depending on your state (for example California, Virginia, Colorado, Connecticut,
        Texas and others), you may have the right to know what personal information is
        collected, to access, correct or delete it, to opt out of its sale or sharing, and
        not to be discriminated against for using these rights.
      </p>
      <h3>How to use these rights</h3>
      <p>
        We do not hold any personal data that is linked to you, so there is nothing for us
        to look up, correct or delete. You stay in full control:
      </p>
      <ul>
        <li>clear the Site’s data in your browser to erase your saved progress;</li>
        <li>
          contact Vercel or Google through their privacy pages for data they hold under
          their own policies.
        </li>
      </ul>

      <h2>11. Do Not Track and Global Privacy Control</h2>
      <p>
        Because the Site does not track you across websites or sell or share personal
        information, it behaves the same whether or not your browser sends a Do Not Track
        or Global Privacy Control signal. Either way, no cross-site tracking takes place.
      </p>

      <h2>12. Children</h2>
      <p>
        The Site is meant for adults and older teenagers learning to code. It is not
        directed at children under 13, and we do not knowingly collect personal
        information from them (COPPA). Under the DPDP Act a child is anyone under 18. We
        do not knowingly process children’s personal data, and we do not track, monitor
        behaviour or target advertising at children. Users under 18 should use the Site
        with the involvement of a parent or guardian.
      </p>

      <h2>13. International visitors</h2>
      <p>
        The Site is operated from India and hosted on Vercel’s global network, so
        technical data may be processed in the United States, India or other countries
        where Vercel operates. By using the Site you understand that this may happen.
      </p>

      <h2>14. Changes to this policy</h2>
      <p>
        We may update this policy when the Site or the law changes. The “Last updated”
        date at the top shows when it last changed. Continuing to use the Site after an
        update means you accept the revised policy.
      </p>

      <p>
        See also the <Link href="/terms">Terms and Conditions</Link> and the{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>
    </LegalPage>
  );
}
