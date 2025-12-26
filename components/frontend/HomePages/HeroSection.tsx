"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const heroSlides = [
    {
      id: 1,
      type: "television",
      title: "Premium TVs",
      subtitle: "Experience Vivid Reality",
      description:
        "Discover unparalleled clarity with our newest OLED displays",
      buttonText: "Shop TVs",
      imagePath: "/banner/bannertv.jpg",
      bgColor: "from-gray-400/90 to-teal-450/90",
    },
    {
      id: 2,
      type: "refrigerator",
      title: "Intelligent Refrigeration",
      subtitle: "Smart Cooling Technology",
      description:
        "Preserve freshness longer with our AI-powered cooling systems",
      buttonText: "Explore Refrigerators",
      imagePath: "/banner/banner1.jpg",
      bgColor: "from-gray-600/90 to-blue-650/90",
    },
    {
      id: 3,
      type: "washingmachine",
      title: "Laundry Reimagined",
      subtitle: "Redefining Clean",
      description: "Revolutionary washing machines for the modern home",
      buttonText: "View Washing Machines",
      imagePath: "/banner/bannermachine.jpg",
      bgColor: "from-orange-100 to-orange-100",
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, heroSlides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section
      className="relative h-screen w-full overflow-hidden "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides container */}
      <div className="h-full w-full relative">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Background image with gradient overlay */}
            <div className="relative h-full w-full">
              <Image
                src={slide.imagePath}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover bg-cover bg-center h-full w-full"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFCwIxxfbg+QAAAABJRU5ErkJggg=="
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} mix-blend-multiply`}
              ></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="max-w-xl md:max-w-2xl lg:max-w-3xl space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  >
                    <p className="text-sm md:text-xl uppercase tracking-wider text-white font-medium mb-2">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-xl text-white mb-6 max-w-lg font-medium">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/category/${slide.type}`}>
                        <motion.button
                          className="group inline-flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </Link>

                      <Link href="/products">
                        <motion.button
                          className="group inline-flex items-center justify-center bg-transparent text-white border border-white/30 backdrop-blur-sm px-6 py-3 rounded-full font-medium text-sm md:text-base hover:bg-white/10 transition-all duration-300 cursor-pointer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View All Products
                          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation dots */}
        <div className="absolute left-0 right-0 bottom-8 flex justify-center items-center z-30">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 right-8 hidden md:flex items-center text-white/80 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="mr-3">Scroll to explore</div>
          <motion.div
            className="h-10 w-5 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white h-1.5 w-1.5 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
