import Legal from '../components/Legal';

export default function RefundPolicy() {
  return (
    <Legal
      canonical="/refund-policy"
      eyebrow="Refunds"
      title="Refund & Cancellation Policy"
      intro="Claireshine takes enquiries through this website, not payments. This page explains what that means for cancellations and refunds."
      updated="September 2026"
      sections={[
        { h: 'No payments are taken here', p: ['There is no checkout, subscription or payment step on this website. Sending the enquiry form costs nothing and charges nothing.'] },
        { h: 'An enquiry is not a transaction', p: ['Submitting an enquiry does not buy a service, hold a slot or create a payable obligation for either side. Nothing needs to be cancelled or refunded, because nothing has been paid.'] },
        { h: 'Where services are engaged', p: ['If we go on to work together, the payment schedule, notice period, cancellation terms and any refund position are set out in the proposal, agreement or invoice for that project. Those documents govern the commercial relationship.', 'Work already delivered or scheduled at the point of cancellation is treated as described in that agreement.'] },
        { h: 'Changing or withdrawing an enquiry', p: ['You can withdraw an enquiry at any time by replying to our email or writing to claireshine.marketing@gmail.com, and ask us to delete the details you sent.'] },
        { h: 'Contact', p: ['Email claireshine.marketing@gmail.com or call +91 88828 27091.'] },
      ]}
    />
  );
}
