import { Droplet } from "lucide-react"
import React from "react"

const BloodGroupSection = () => {
  const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <section className="bg-[#E6E6E6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="mx-auto mb-5 block h-1.5 w-36 rounded-full bg-[#dc2626]" />

          <h2 className="font-head text-4xl font-black text-[#151515] md:text-5xl">
            Find Donor By Blood Group
          </h2>

          <p className="mt-6 text-[18px] leading-relaxed text-[#555]">
            Select the required blood group and quickly connect with nearby eligible donors for verified emergency requests.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-8">
          {groups.map((group) => (
            <button
              key={group}
              className="group flex flex-col items-center gap-5"
            >
              <span className="flex size-24 items-center justify-center rounded-full border-2 border-[#333] bg-white text-[#dc2626] transition group-hover:border-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white">
                <Droplet size={44} />
              </span>

              <span className="font-head text-2xl font-black text-[#151515]">
                {group}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BloodGroupSection