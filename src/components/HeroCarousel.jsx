"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: '/assets/hero-1.svg', alt: 'smartwatch'},
  { imgUrl: '/assets/hero-2.svg', alt: 'bag'},
  { imgUrl: '/assets/hero-3.svg', alt: 'lamp'},
  { imgUrl: '/assets/hero-4.svg', alt: 'air fryer'},
  { imgUrl: '/assets/hero-5.svg', alt: 'chair'},
]

const HeroCarousel = () => {
  return (
    <div className=" relative sm:px-10 py-5 sm:pt-20 pb-5 max-w-[560px]
     h-[700px] w-full bg-[#dde2eb] rounded-[30px] sm:mx-auto">
     
      <Carousel
        showThumbs={false}
        //autoPlay
        infiniteLoop
         //interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image 
            src={image.imgUrl}
            alt={image.alt}
            width={480}
            height={480}
           // className="object-contain"
       
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image 
        src="assets/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  )
}

export default HeroCarousel