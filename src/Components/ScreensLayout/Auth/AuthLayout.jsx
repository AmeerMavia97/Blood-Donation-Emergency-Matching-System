import React from 'react'

const AuthLayout = ({ children, title, des, wide = false }) => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-[#f4f4f4] px-5 py-16">
            <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-md'} rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_25px_90px_rgba(0,0,0,0.08)] sm:p-9`}>
                <div className="mb-8 text-center flex flex-col justify-center items-center">
                    <span className="x-auto mb-5 pr-2 flex size-11 items-center justify-center py-2">
                        <img src={'/BloodLogo.png'} alt="BloodBridge" />
                    </span>
                    <h1 className="font-head text-4xl font-black text-[#151515]">{title}</h1>
                    <p className="mt-3 text-sm leading-relaxed text-[#555]">{des}</p>
                </div>
                {children}
            </div>
        </section>
    )
}

export default AuthLayout
