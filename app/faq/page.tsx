import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about staying with the collective.',
  alternates: { canonical: '/faq' },
};

const faqs = [
  {
    question: 'What are the check-in and check-out times?',
    answer:
      'They vary a little by property. Most houses welcome guests from mid-afternoon and ask you to leave by mid-morning. Each property page lists its exact times.',
  },
  {
    question: 'Can I bring my dog?',
    answer:
      'Some of our houses are dog-friendly and some are not. Look for the dog note on each property page, or ask us before you book.',
  },
  {
    question: 'Is parking available?',
    answer:
      'It depends on the property. Parking details are listed on each property page.',
  },
  {
    question: 'Do you serve breakfast?',
    answer:
      'Most houses include breakfast. Check the facilities list on the property page for details.',
  },
  {
    question: 'How do I book a room?',
    answer:
      'Every property links straight to its own booking page. You can also reach the house using the details on our contact page.',
  },
  {
    question: 'Is there Wi-Fi?',
    answer: 'Yes, all of our houses have Wi-Fi throughout.',
  },
];

export default function FaqPage() {
  return (
    <Container className="py-8 md:py-14">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Frequently asked questions
      </h1>
      <p className="text-lead-mobile md:text-lead text-muted mt-2">
        Common questions about staying with the collective.
      </p>

      <ul className="max-w-reading mt-10 md:mt-14">
        {faqs.map((item) => (
          <li key={item.question} className="border-border border-b py-4">
            <details>
              <summary className="cursor-pointer font-semibold">
                {item.question}
              </summary>
              <p className="text-muted mt-2">{item.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </Container>
  );
}
