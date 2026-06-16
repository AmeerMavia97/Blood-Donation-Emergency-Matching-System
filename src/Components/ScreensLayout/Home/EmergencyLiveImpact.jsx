import { ArrowUpRight, Clock, Droplet, HeartPulse } from "lucide-react"
import React from "react"

import img1 from '@/assets/section1.webp'
import img2 from '@/assets/section2.webp'
import img3 from '@/assets/section3.jpg'

const LiveImpactSection = () => {
  const stats = [
    { value: "42", label: "Requests today" },
    { value: "118", label: "Matched donors" },
    { value: "26", label: "Lives helped" },
  ]

  const feed = [
    { group: "O-", hospital: "Civil Hospital", units: "2 Units needed", time: "10 mins ago" },
    { group: "AB+", hospital: "Aga Khan Hospital", units: "1 Unit needed", time: "4 mins ago" },
    { group: "B+", hospital: "Liaquat National", units: "3 Units needed", time: "Just now" },
  ]

  return (
    <section className="bg-[#E6E6E6] py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-12">
        <div>
          <p className="mb-5 font-head text-sm font-black uppercase tracking-[0.25em] text-[#dc2626]">
            Live impact
          </p>

          <h2 className="font-head text-4xl font-black leading-tight text-[#151515] md:text-[40px]">
            Emergency blood requests, matched faster with verified donors.
          </h2>

          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-[#555]">
            BloodBridge keeps hospitals, attendants, and donors connected through verified emergency requests, eligibility checks, donor consent, and live request tracking.
          </p>

          {/* <div className="mt-10 grid max-w-xl grid-cols-3 gap-8 border-y border-black/10 py-7">
            {stats.map((item) => (
              <div key={item.label}>
                <h3 className="font-head text-4xl font-black text-[#dc2626] md:text-5xl">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#333]">
                  {item.label}
                </p>
              </div>
            ))}
          </div> */}

          <div className="mt-10 space-y-5">
            {feed.map((item) => (
              <div key={item.hospital} className="flex items-center gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#dc2626] font-head text-lg font-black text-white">
                  {item.group}
                </div>

                <div className="min-w-0 flex-1 border-b border-black/10 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-head text-xl font-black text-[#151515]">
                      {item.hospital}
                    </h4>

                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#777]">
                      <Clock size={13} />
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#555]">
                    <Droplet size={15} className="text-[#dc2626]" />
                    {item.units}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#dc2626] px-7 py-4 font-head text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#b91c1c]">
            View requests
            <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#dc2626]">
              <ArrowUpRight size={16} />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 pt-10">
            <img
              src={img1}
              alt="Blood donation"
              className="h-64 w-full rounded-[1.8rem] object-cover"
            />

            <img
              src={img2}
              alt="Hospital verification"
              className="h-64 w-full rounded-[1.8rem] object-cover"
            />
          </div>

          <div className="relative">
            <img
              src={img3}
              alt="Emergency support"
              className="h-[560px] w-full rounded-[1.8rem] object-cover"
            />

            <div className="absolute -left-10 bottom-10 hidden items-center gap-4 rounded-full bg-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] lg:flex">
              <span className="flex size-12 items-center justify-center rounded-full bg-[#dc2626] text-white">
                <HeartPulse size={24} />
              </span>

              <div>
                <h4 className="font-head text-lg font-black text-[#151515]">
                  24/7
                </h4>
                <p className="text-xs font-semibold text-[#555]">
                  Emergency matching
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveImpactSection