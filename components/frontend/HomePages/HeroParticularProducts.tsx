"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import Link from "next/link";

const TvParticularProducts = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "smart-tvs",
      label: "Smart TVs",
      categorySlug: "television",
      content: {
        title: "Smart TVs",
        description:
          "Experience entertainment like never before with our range of cutting-edge Smart TVs. Connect to your favorite streaming services, control with voice commands, and enjoy crisp, vibrant displays.",
        features: [
          "4K & 8K Resolution",
          "Voice Assistant Compatible",
          "Streaming Apps Built-in",
          "WiFi & Bluetooth Connectivity",
        ],
        imageSrc: "/tv/samsung-4k-ultra-hd-tv.png",
      },
    },
    {
      id: "oled-tvs",
      label: "OLED TVs",
      categorySlug: "television",
      content: {
        title: "OLED TVs",
        description:
          "Discover perfect blacks and infinite contrast with our premium OLED TVs. Each pixel illuminates independently for the most realistic and immersive viewing experience possible.",
        features: [
          "Self-illuminating Pixels",
          "Perfect Black Levels",
          "Ultra-thin Design",
          "Wide Viewing Angle",
        ],
        imageSrc: "/tv/lg-tv.jpg",
      },
    },
    {
      id: "qled-tvs",
      label: "QLED TVs",
      categorySlug: "television",
      content: {
        title: "QLED TVs",
        description:
          "Our QLED TVs use quantum dot technology to deliver over a billion colors with incredible brightness. Ideal for bright rooms and daytime viewing with exceptional color volume.",
        features: [
          "Quantum Dot Technology",
          "High Brightness",
          "Anti-reflection Screen",
          "Powerful Upscaling",
        ],
        imageSrc: "/tv/samsung-smart-tv-wallpaper-preview.jpg",
      },
    },
    {
      id: "projectors",
      label: "Projectors",
      categorySlug: "television",
      content: {
        title: "Home Projectors",
        description:
          "Transform any room into a cinema with our state-of-the-art home projectors. From compact portable options to professional-grade 4K projectors, find the perfect match for your space.",
        features: [
          "4K UHD Resolution",
          "Short-throw Options",
          "High Lumens",
          "Wireless Connectivity",
        ],
        imageSrc: "/tv/lgtv.avif",
      },
    },
  ];

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  } as const;

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  const indicatorVariants = {
    initial: { left: 0 },
    animate: (activeTab: number) => ({
      left: `calc(${(activeTab * 100) / tabs.length}% + 8px)`,
      width: `calc(${100 / tabs.length}% - 16px)`,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <section className="py-16 bg-[#14404B]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white  mb-4">
            Explore Our TV & Entertainment Range
          </h2>
          <p className="text-lg text-white  max-w-3xl mx-auto">
            Discover the perfect entertainment setup for your home with our
            premium selection of TVs and home theater equipment.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto hide-scrollbar rounded-full bg-white  p-2 shadow-lg mb-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex-1 cursor-pointer min-w-0 px-4 py-3 text-sm md:text-base font-medium rounded-full z-10 transition-all  duration-300 
                  ${
                    activeTab === index
                      ? "text-white bg-[#0C2730]"
                      : "text-teal-800   hover:text-white hover:bg-[#0C2730] "
                  }`}
              >
                {tab.label}
              </button>
            ))}
            <motion.div
              className="absolute top-2 bottom-2 bg-[#0C2730] rounded-full"
              variants={indicatorVariants}
              initial="initial"
              animate="animate"
              custom={activeTab}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className=" rounded-2xl shadow-xl overflow-hidden bg-white">
          {tabs.map(
            (tab, index) =>
              activeTab === index && (
                <motion.div
                  key={tab.id}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                        {tab.content.title}
                      </h3>
                      <p className="text-black-300 mb-6">
                        {tab.content.description}
                      </p>
                      <div className="space-y-3">
                        {tab.content.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={featureItemVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-start"
                          >
                            <span className="shrink-0 w-5 h-5 mt-1 mr-3 text-[#0C2730]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-black">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="mt-8 "
                      >
                        <Link 
                          href={`/category/${tabs[activeTab].categorySlug}`}
                          className="inline-block px-6 py-3 cursor-pointer bg-[#0C2730] hover:bg-[#0c2730ea] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          Explore {tab.content.title}
                        </Link>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <Image
                        src={tab.content.imageSrc}
                        alt={tab.content.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

const RefrigeratorTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const refrigeratorTypes = [
    {
      id: "french-door",
      name: "French Door",
      description:
        "French door refrigerators combine style and functionality with wide shelves and excellent visibility of fresh food items. Perfect for storing large platters and party trays.",
      features: [
        "Double doors on top, freezer drawer below",
        "Wide, full-width shelves",
        "Great for entertaining and large families",
        "Excellent food visibility",
        "Available with in-door water and ice dispensers",
      ],
      specs: {
        capacity: "22-28 cubic feet",
        width: "30-36 inches",
        energyEfficiency: "Excellent",
        price: "$$$-$$$$",
      },
      imageSrc: "/refrigerator/refrigerator-isolated.avif",
    },
    {
      id: "side-by-side",
      name: "Side-by-Side",
      description:
        "Side-by-side refrigerators feature vertical freezer and refrigerator compartments next to each other, offering easy access to both fresh and frozen foods at eye level.",
      features: [
        "Refrigerator on right, freezer on left",
        "Narrower doors require less clearance",
        "Multiple door bins for storage",
        "Often includes through-door ice and water",
        "Good option for narrow kitchens",
      ],
      specs: {
        capacity: "20-28 cubic feet",
        width: "32-36 inches",
        energyEfficiency: "Good",
        price: "$$-$$$",
      },
      imageSrc: "/refrigerator/refrigerator-isolated.avif",
    },
    {
      id: "bottom-freezer",
      name: "Bottom Freezer",
      description:
        "Bottom freezer models place the refrigerator compartment at eye level, with the less frequently accessed freezer below. Ideal for those who use fresh foods more often.",
      features: [
        "Fresh food at eye level",
        "Large freezer drawer or door",
        "More ergonomic for accessing daily items",
        "Available in various widths",
        "Good value option",
      ],
      specs: {
        capacity: "18-24 cubic feet",
        width: "28-33 inches",
        energyEfficiency: "Very Good",
        price: "$$-$$$",
      },
      imageSrc: "/refrigerator/refrigerator-isolated.avif",
    },
    {
      id: "top-freezer",
      name: "Top Freezer",
      description:
        "Top freezer refrigerators offer a classic design with freezer compartment above the refrigerator. These models provide excellent value and reliable performance.",
      features: [
        "Traditional, reliable design",
        "More affordable option",
        "Available in various sizes",
        "Simple, straightforward operation",
        "Great for smaller households",
      ],
      specs: {
        capacity: "14-22 cubic feet",
        width: "28-33 inches",
        energyEfficiency: "Good",
        price: "$-$$",
      },
      imageSrc: "/refrigerator/refrigerator-isolated.avif",
    },
    {
      id: "compact",
      name: "Compact",
      description:
        "Compact refrigerators are perfect for small spaces like apartments, dorm rooms, or as secondary refrigerators. Efficient and space-saving while providing essential cooling.",
      features: [
        "Space-saving design",
        "Perfect for small apartments or dorms",
        "Energy efficient operation",
        "Often includes small freezer compartment",
        "Easy to move and reposition",
      ],
      specs: {
        capacity: "1.7-5 cubic feet",
        width: "17-24 inches",
        energyEfficiency: "Variable",
        price: "$",
      },
      imageSrc: "/refrigerator/refrigerator-isolated.avif",
    },
    {
      id: "smart",
      name: "Smart Refrigerators",
      description:
        "Smart refrigerators connect to your home network to offer advanced features like food management, viewing contents remotely, and integration with smart home systems.",
      features: [
        "Wi-Fi connectivity",
        "Touch screen display",
        "Food management systems",
        "Remote monitoring",
        "Voice assistant compatibility",
      ],
      specs: {
        capacity: "22-29 cubic feet",
        width: "32-36 inches",
        energyEfficiency: "Variable",
        price: "$$$$",
      },
      imageSrc: "/refrigerator/refrigerator-isolated.avif",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  } as const;

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const indicatorVariants = {
    initial: { left: 0 },
    animate: (activeTab: number) => ({
      left: `calc(${activeTab * (100 / refrigeratorTypes.length)}% + 8px)`,
      width: `calc(${100 / refrigeratorTypes.length}% - 16px)`,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <section className="mt-20 py-16 bg-[#14404B]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Find Your Perfect Refrigerator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our range of refrigerators to find the ideal combination of
            style, capacity, and features for your kitchen.
          </p>
        </div>

        {/* Tab Navigation */}

        <div className="relative mb-8">
          <div className="flex overflow-x-auto hide-scrollbar rounded-full bg-white  p-2 shadow-lg mb-2">
            {refrigeratorTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(index)}
                className={`flex-1 cursor-pointer min-w-0 px-4 py-3 text-sm md:text-base font-medium rounded-full z-10 transition-all  duration-300 
                  ${
                    activeTab === index
                      ? "text-white bg-[#0C2730]"
                      : "text-teal-800   hover:text-white hover:bg-[#0C2730] "
                  }`}
              >
                {type.name}
              </button>
            ))}
            <motion.div
              className="absolute top-2 bottom-2 bg-[#0C2730] rounded-full"
              variants={indicatorVariants}
              initial="initial"
              animate="animate"
              custom={activeTab}
            />
          </div>
        </div>
        {/* Tab Content */}
        <div className="relative ">
          <AnimatePresence mode="wait">
            <motion.div
              key={refrigeratorTypes[activeTab].id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white  rounded-2xl shadow-xl overflow-hidden p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <motion.div
                  variants={imageVariants}
                  className="relative rounded-xl overflow-hidden shadow-lg   flex justify-center items-center h-full max-h-[500px]"
                >
                  <Image
                    src={refrigeratorTypes[activeTab].imageSrc}
                    alt={refrigeratorTypes[activeTab].name}
                    width={500}
                    height={600}
                    className="object-contain w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 text-black p-4">
                    <span className="text-lg font-semibold">
                      {refrigeratorTypes[activeTab].name}
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="">
                  <motion.div variants={tabVariants}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black ">
                      {refrigeratorTypes[activeTab].name} Refrigerators
                    </h3>
                    <p className="text-black mb-6 ">
                      {refrigeratorTypes[activeTab].description}
                    </p>
                  </motion.div>

                  <motion.div variants={tabVariants} className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-black">
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {refrigeratorTypes[activeTab].features.map(
                        (feature, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={featureVariants}
                            className="flex items-start"
                          >
                            <span className="shrink-0 w-5 h-5 mt-1 mr-3 text-[#0C2730]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-black">{feature}</span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={tabVariants}>
                    <h4 className="text-xl font-semibold mb-4 text-black">
                      Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800  p-4 rounded-lg">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                          Typical Capacity
                        </span>
                        <span className="block text-lg font-medium text-white">
                          {refrigeratorTypes[activeTab].specs.capacity}
                        </span>
                      </div>
                      <div className="bg-gray-800  p-4 rounded-lg">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                          Width Range
                        </span>
                        <span className="block text-lg font-medium text-white">
                          {refrigeratorTypes[activeTab].specs.width}
                        </span>
                      </div>
                      <div className="bg-gray-800  p-4 rounded-lg">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                          Energy Efficiency
                        </span>
                        <span className="block text-lg font-medium text-white">
                          {refrigeratorTypes[activeTab].specs.energyEfficiency}
                        </span>
                      </div>
                      <div className="bg-gray-800  p-4 rounded-lg">
                        <span className="block text-sm text-gray-500 ">
                          Price Range
                        </span>
                        <span className="block text-lg font-medium text-white">
                          {refrigeratorTypes[activeTab].specs.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={tabVariants} className="mt-8">
                    <Link 
                      href="/category/refrigerator"
                      className="inline-block px-6 py-3 bg-[#0C2730] hover:bg-[#0c2730ea] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Shop {refrigeratorTypes[activeTab].name} Refrigerators
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const HeroParticularProducts = () => {
  return (
    <>
      <TvParticularProducts />
      <RefrigeratorTabs />
    </>
  );
};

export default HeroParticularProducts;
