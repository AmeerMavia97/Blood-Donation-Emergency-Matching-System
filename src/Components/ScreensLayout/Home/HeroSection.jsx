import { ArrowRight, Droplet, Zap } from 'lucide-react'
import React from 'react'
import image from '/heroblooddonation.jpeg'

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#e6e6e6] bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage:
          `linear-gradient(90deg, rgba(230,230,230,0.98) 0%, rgba(230,230,230,0.92) 38%, rgba(230,230,230,0.15) 62%, rgba(230,230,230,0) 100%), url(${image})`,
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-40 lg:px-8 lg:pb-28 lg:pt-48">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="md:ml-4">
            <p className="inline-flex items-center gap-2 text-xs font-bold mb-5 text-[#1f1f1f]">
              <span className="w-7 h-7 rounded-full bg-[#dc2626] text-white flex items-center font-para justify-center">
                <Zap size={15} />
              </span>
              Verified emergency blood matching
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[68px] font-black leading-[1.1] tracking-tight text-[#151515]">
              Donate Blood.
              <br />
              Save Lives Faster.
            </h1>

            <p className="mt-7 text-[16.5px] text-[#4b4b4b] max-w-xl leading-relaxed">
              BloodBridge connects urgent blood requests with verified nearby donors through eligibility checks, hospital verification, and privacy-first donor consent.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-7 py-4 font-head text-white text-[16px] font-semibold hover:bg-[#b91c1c]">
                Request Blood
                <span className="w-6 h-6 rounded-full bg-white text-[#dc2626] flex items-center justify-center">
                  <ArrowRight size={14} />
                </span>
              </button>

              <button className="inline-flex bg-white/80 backdrop-blur items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold font-head text-[#151515] hover:bg-white">
                Become Donor
                <Droplet size={16} className="text-[#dc2626]" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 max-w-lg gap-8 border-t border-black/10 pt-6">
              <Stat title="15K+" desc="Registered donors" />
              <Stat title="250+" desc="Verified hospitals" />
              <Stat title="98%" desc="Successful matches" />
            </div>
          </div>

          <div className="hidden lg:block min-h-[420px]" />
        </div>
      </div>
    </section>
  )
}

const Stat = ({ title, desc }) => (
  <div>
    <h4 className="text-2xl font-head font-black text-[#151515]">{title}</h4>
    <p className="text-xs text-[#525252] mt-1">{desc}</p>
  </div>
)

export default HeroSection