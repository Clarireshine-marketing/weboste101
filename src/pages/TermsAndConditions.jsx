import Legal from '../components/Legal';

export default function TermsAndConditions() {
  return (
    <Legal
      canonical="/terms-and-conditions"
      eyebrow="Terms"
      title="Terms & Conditions"
      intro="These terms apply to your use of the Claireshine website. Using the site means you accept them."
      updated="September 2026"
      sections={[
        { h: 'Using this website', p: ['You may read, share and link to the pages on this site. You may not copy the site wholesale, resell its content or use it in a way that damages it or misleads others about who made it.'] },
        { h: 'Content is informational', p: ['The writing here describes how we work and what we offer. It is general information, not advice for your specific business, and it is not an offer capable of acceptance.'] },
        { h: 'Intellectual property', p: ['The Claireshine name, logo, copy, graphics and 3D objects on this site belong to Claireshine.', 'Client brand names, logos and project visuals shown in the work section remain the property of those brands and appear here to illustrate work we contributed to.'] },
        { h: 'Acceptable use', p: ['Do not attempt to break, overload, scrape at scale or gain unauthorised access to the site, and do not submit unlawful, abusive or deliberately false material through the form.'] },
        { h: 'External links', p: ['Links to other sites, including our social profiles, are provided for convenience. We do not control those sites and are not responsible for their content.'] },
        { h: 'Enquiries', p: ['Sending an enquiry starts a conversation. It does not create a contract, reserve capacity or commit either side to anything.', 'Where we go on to work together, the scope, fees, timelines and cancellation terms are set out in a separate proposal, agreement or invoice, which takes precedence over anything on this website.'] },
        { h: 'Material you send us', p: ["You confirm you have the right to share anything you send us — briefs, assets, logins or brand material — and that sharing it does not breach someone else's rights or an agreement you are bound by."] },
        { h: 'Limitation of liability', p: ['The site is provided as it is. To the extent permitted by law, Claireshine is not liable for loss arising from reliance on general information published here, or from the site being unavailable.'] },
        { h: 'Changes', p: ['We may update, restructure or remove pages, services and these terms. The current version is always the one on this page.'] },
        { h: 'Governing law', p: ['Claireshine operates from New Delhi, India.'] },
        { h: 'Contact', p: ['Email claireshine.marketing@gmail.com or call +91 88828 27091.'] },
      ]}
    />
  );
}
