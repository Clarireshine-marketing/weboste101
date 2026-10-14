import Legal from '../components/Legal';

export default function PrivacyPolicy() {
  return (
    <Legal
      canonical="/privacy-policy"
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page explains what information this website collects, why it is collected and what happens to it afterwards. It describes the site as it is actually built — not a template."
      updated="September 2026"
      sections={[
        { h: 'Who this applies to', p: ['This policy covers visitors to the Claireshine website and people who send us an enquiry through it. Claireshine is a marketing and growth studio based in New Delhi, India.'] },
        { h: 'Information we collect', p: ['Only what you type into the enquiry form: your name, your email address, an optional phone number, the type of help you are looking for, and your message.', 'We do not ask for payment details, identity documents, health information or any other sensitive category of data. Please do not include them in your message.'] },
        { h: 'Why we collect it', p: ['To read your enquiry, understand what you need and reply to it. If a project follows, the same details are used to keep in touch about that work.', 'We do not sell your details and we do not add you to a marketing list from a form submission.'] },
        { h: 'What this website does not do', p: ['As built, this site does not run advertising pixels, remarketing tags or third-party analytics, and it does not build a profile of your browsing.', 'If analytics or advertising tools are added later, this policy and the cookie policy will be updated before they go live.'] },
        { h: 'How long we keep it', p: ['Enquiry correspondence is kept while the conversation is useful and for a reasonable period afterwards for our own records. You can ask us to delete it at any time.'] },
        { h: 'Third parties', p: ["Your enquiry reaches us by email, so it is stored in our email provider's systems. The site is served by a hosting provider, which may keep standard server logs such as IP address and request time for security and reliability.", 'The exact providers, their locations and their retention periods should be confirmed and named here before publication.'] },
        { h: 'Your rights', p: ['You can ask what we hold about you, ask for a correction, ask for deletion, or ask us to stop using your details. Email us and we will action it.'] },
        { h: 'Security', p: ['Access to enquiry correspondence is limited to the people at Claireshine who need it. No transfer over the internet can be guaranteed to be completely secure, so please keep sensitive material out of the form.'] },
        { h: 'Contact', p: ['Email claireshine.marketing@gmail.com or call +91 88828 27091. Location: New Delhi, Delhi, India.'] },
        { h: 'Changes to this policy', p: ['If how we handle information changes, this page changes with it and the date above is updated.'] },
      ]}
    />
  );
}
