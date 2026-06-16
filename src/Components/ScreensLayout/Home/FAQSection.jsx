import { HelpCircle } from "lucide-react"
import React from "react"

const FAQSection = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Any healthy eligible donor can donate after basic checks like age, weight, last donation date, and medical condition.",
    },
    {
      question: "How does BloodBridge match donors?",
      answer:
        "The system checks blood group, location, availability, eligibility, and donation cooldown before showing matching donors.",
    },
    {
      question: "Is donor privacy protected?",
      answer:
        "Yes. Donor contact details are only shared after the donor accepts the request and gives consent.",
    },
    {
      question: "Who verifies emergency requests?",
      answer:
        "Requests can be verified by hospital verifiers or admins before donors are contacted.",
    },
    {
      question: "Can donors decline a request?",
      answer:
        "Yes. Donors can accept or decline every request based on their availability.",
    },
  ]

  return (
    <section className="bg-[#E6E6E6] py-18">
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 font-head text-sm font-black uppercase tracking-[0.25em] text-[#dc2626]">
              <HelpCircle size={17} />
              FAQ
            </p>

            <h2 className="font-head text-4xl font-black leading-tight text-[#151515] md:text-5xl">
              Common questions about blood donation matching.
            </h2>

            <p className="mt-6 text-[17px] leading-relaxed text-[#555]">
              Simple answers for donors, attendants, hospitals, and volunteers using BloodBridge during emergency blood requests.
            </p>
          </div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {faqs.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <h3 className="font-head text-xl font-black text-[#151515]">
                    {item.question}
                  </h3>

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#151515] text-lg font-bold text-white transition group-open:bg-[#dc2626]">
                    +
                  </span>
                </summary>

                <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-[#555]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection