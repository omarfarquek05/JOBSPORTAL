import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
    <section className=" flex items-center justify-center w-full flex-col pb-5">
      <div className="mx-auto max-w-[1440px] relative flex w-full  flex-col justify-between 
      gap-12 overflow-hidden bg-green-90 bg-pattern bg-cover bg-center bg-no-repeat px-6 py-12
       text-white sm:flex-row sm:gap-12 sm:py-24 lg:px-20 xl:max-h-[598px] 2xl:rounded-5xl">

        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-4">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]">Welcome To Jobs Mela</h2>
          <p className="regular-16 text-gray-10">Available jobs</p>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Image src="/phones.png" alt="phones" width={550} height={870} />
        </div>
      </div>
    </section>
  )
}

export default Banner