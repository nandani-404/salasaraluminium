/**
 * Server-rendered FAQ list built on native <details>/<summary>.
 *
 * Deliberately not a client component. The browser handles expand and collapse
 * natively, so every answer is present in the initial HTML and readable with
 * JavaScript disabled — which is also the condition Google requires before it
 * will trust FAQPage markup. The previous accordion mounted its answers through
 * React state, so the text only existed after hydration.
 */
export interface Faq {
  question: string;
  answer: string;
}

export default function FaqList({
  faqs,
  /** Index of the entry to render already open. Set to -1 for all closed. */
  defaultOpen = 0,
}: {
  faqs: Faq[];
  defaultOpen?: number;
}) {
  if (!faqs?.length) return null;

  return (
    <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
      {faqs.map((faq, i) => (
        <details key={faq.question} open={i === defaultOpen} className="group py-1">
          <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-4 min-h-11 text-base font-bold text-[#0B1F3A] hover:text-[#8A6408] transition-colors">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="shrink-0 mt-0.5 text-[#8A6408] text-xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-8 text-base text-[#475569] leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
