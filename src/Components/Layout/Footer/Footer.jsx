import { Droplets } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative z-10 px-5 pb-8 pt-5 lg:px-8 bg-[#E6E6E6]">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/65 p-8 shadow-2xl shadow-neutral-950/10 backdrop-blur-xl md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <NavLink to="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center">
              {/* <Droplet size={25} /> */}
              <img src={'/BloodLogo.png'} alt="" />
            </span>

            <div className="hidden sm:block leading-none">
              <h4 className="font-head text-xl font-black uppercase tracking-tight text-[#151515]">
                BloodBridge
              </h4>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">
                Donate Blood
              </p>
            </div>
          </NavLink>
            <p className="mt-5 max-w-md font-para text-sm leading-7 text-neutral-600">Emergency blood matching platform for verified requests, eligible donors, consent-based contact sharing and fulfillment tracking.</p>
          </div>
          <FooterLinks title="Quick Links" items={['Home','Donate','Requests','Hospitals']} />
          <FooterLinks title="Legal" items={['Privacy Policy','Terms','Safety Rules','Contact']} />
          <div>
            <h3 className="font-head text-lg font-black uppercase">Social</h3>
            <div className="mt-5 flex gap-3">
              {/* {[Twitter, Instagram].map((Icon, index) => <span key={index} className="flex size-10 items-center justify-center rounded-full bg-neutral-950 text-white"><Icon size={17}/></span>)} */}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-950/10 pt-6 font-para text-xs text-neutral-500">© 2026 BloodBridge. All rights reserved.</div>
      </div>
    </footer>
  )
}

const FooterLinks = ({ title, items }) => (
  <div>
    <h3 className="font-head text-lg font-black uppercase">{title}</h3>
    <div className="mt-5 space-y-3">
      {items.map((item) => <a key={item} href="#home" className="block font-para text-sm text-neutral-600 hover:text-red-600">{item}</a>)}
    </div>
  </div>
)

export default Footer
