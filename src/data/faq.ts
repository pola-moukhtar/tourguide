export interface FAQItem { id: string; question: string; answer: string; isPlaceholder: boolean }

export const faq: readonly FAQItem[] = [
  { id: 'faq-placeholder', question: 'What should I know before booking?', answer: 'Add an answer once the guide’s booking details are confirmed.', isPlaceholder: true },
];
