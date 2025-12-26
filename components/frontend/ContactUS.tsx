"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const ContactUS = () => {
  const [activeCard, setActiveCard] = useState(null);

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
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hover: {
      y: -10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const contactOptions = [
    {
      id: 1,
      title: "Sales Inquiries",
      icon: "💼",
      description:
        "Contact our sales team for product information and purchasing assistance.",
      contact: "sales@company.com",
      phone: "+1 (800) 555-1234",
    },
    {
      id: 2,
      title: "Technical Support",
      icon: "🛠️",
      description:
        "Get help with product troubleshooting, setup, and technical issues.",
      contact: "support@company.com",
      phone: "+1 (800) 555-5678",
    },
    {
      id: 3,
      title: "Customer Service",
      icon: "👥",
      description:
        "Assistance with orders, returns, and general customer inquiries.",
      contact: "customercare@company.com",
      phone: "+1 (800) 555-9012",
    },
    // {
    //   id: 4,
    //   title: "Business Opportunities",
    //   icon: "🤝",
    //   description:
    //     "Partner with us for business development and strategic alliances.",
    //   contact: "partnerships@company.com",
    //   phone: "+1 (800) 555-3456",
    // },
  ];
  const contactdetails = [
    {
      id: 1,
      title: "Address",
      icon: "💼",
      description: "46, Chauki Shamsheri Pul Kaharan, Etawah (U.P), India",
      contact: "yogeshpal5049@gmail.com",
      phone: "+91 9410001609",
    },
  ];

  return (
    <div className=" py-16 px-4 md:px-12">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Become an member
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Enjoy all the benefits of free shipping, exclusive offers, and
              personalized service. Sign up today and start enjoying the
              benefits to exclusive services and offers.
            </motion.p>
          </div>
          <div className="lg:flex-col lg:flex  lg:gap-5">
            <motion.button
              className="mt-6 md:mt-0 bg-white text-black border-2 border-black font-medium rounded-full py-3 px-8 hover:bg-[#0B282E] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="mt-6 md:mt-0 bg-white text-black border-2 border-black font-medium rounded-full py-3 px-8 hover:bg-[#0B282E] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact support
            </motion.button>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between lg:items-center  gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contactOptions.map((option) => (
            <motion.div
              key={option.id}
              className="bg-white rounded-[40px] p-6 cursor-pointer h-full w-[40%]"
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setActiveCard(option.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{option.title}</h3>
                </div>
                <div className="text-3xl">{option.icon}</div>
              </div>

              <p className="text-gray-600 mb-6">{option.description}</p>

              <div className="mt-auto">
                <div className="mb-2">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{option.contact}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{option.phone}</div>
                </div>

                <motion.div
                  className="mt-6 flex items-center"
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: activeCard === option.id ? 1 : 0.5,
                    x: activeCard === option.id ? 5 : 0,
                  }}
                >
                  <span className="mr-2 font-medium">View details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-20 mb-10 ">
          <div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Need Help
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're here to provide all the help you need. Reach out to our team
              for support, inquiries, or any questions you might have.
            </motion.p>
          </div>
          <div className="lg:flex-col lg:flex  lg:gap-5">
            <motion.button
              className="mt-6 md:mt-0 bg-white text-black border-2 border-black font-medium rounded-full py-3 px-8 hover:bg-[#0B282E] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="mt-6 md:mt-0 bg-white text-black border-2 border-black font-medium rounded-full py-3 px-8 hover:bg-[#0B282E] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact support
            </motion.button>
          </div>
        </div>

        <motion.div
          className="mt-10  p-8 rounded-[40px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-4xl font-bold mb-6">Send us a message</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    type="text"
                    id="name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    type="email"
                    id="email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
                    id="message"
                  ></textarea>
                </div>
                <motion.button
                  className="bg-black text-white font-medium rounded-full py-3 px-8 hover:bg-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                >
                  Submit message
                </motion.button>
              </form>
            </div>

            <div>
              <div className="rounded-[40px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.9949199346843!2d79.01872687366547!3d26.776431865937102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3975e0764284cbab%3A0x5e5666816f0320a8!2sVijay%20Electronics!5e0!3m2!1sen!2sin!4v1743666230371!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between  gap-16 ">
          <motion.div
            className="w-[50%]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactdetails.map((option) => (
              <motion.div
                key={option.id}
                className="bg-white rounded-[40px] p-10 cursor-pointer h-full w-full"
                variants={cardVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveCard(option.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex justify-between items-start ">
                  <div>
                    <h3 className="text-2xl font-bold">{option.title}</h3>
                  </div>
                  <div className="text-3xl">{option.icon}</div>
                </div>

                <p className="text-gray-600 mb-5">{option.description}</p>

                <div className="mt-auto">
                  <div className="mb-5">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{option.contact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{option.phone}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className=" text-center bg-white rounded-[40px] p-10 cursor-pointer   w-[50%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="w-full ">
              <h3 className="text-2xl font-bold mb-10">Connect with us on Social Media</h3>
              <div className="flex justify-center space-x-6">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social) => (
                    <motion.a
                      key={social}
                      href={`#${social}`}
                      className="bg-white p-3 rounded-full border border-gray-200"
                      whileHover={{
                        y: -5,
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <SocialIcon type={social} />
                    </motion.a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ type }) => {
  const icons = {
    twitter: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 4.01C21 4.5 20.02 4.69 19 4.82C20.07 4.19 20.85 3.27 21.2 2.14C20.17 2.7 19.05 3.09 17.85 3.29C16.89 2.36 15.54 1.8 14.08 1.8C11.25 1.8 8.97 4.08 8.97 6.91C8.97 7.31 9.01 7.7 9.09 8.07C4.8 7.85 1.03 5.84 -0.43 2.77C-0.83 3.53 -1.03 4.4 -1.03 5.31C-1.03 7.03 -0.13 8.57 1.24 9.44C0.38 9.42 -0.43 9.19 -1.16 8.85C-1.16 8.87 -1.16 8.89 -1.16 8.91C-1.16 11.41 0.67 13.48 3.06 13.95C2.53 14.1 1.98 14.18 1.42 14.18C1.13 14.18 0.85 14.15 0.58 14.09C1.15 16.12 3.07 17.61 5.33 17.65C3.56 19.03 1.35 19.83 -1.06 19.83C-1.48 19.83 -1.9 19.8 -2.31 19.75C-0.03 21.23 2.58 22.07 5.37 22.07C14.07 22.07 18.83 14.28 18.83 7.57C18.83 7.34 18.83 7.11 18.82 6.88C19.87 6.15 20.76 5.22 21.5 4.14L22 4.01Z"
          fill="currentColor"
        />
      </svg>
    ),
    facebook: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
          fill="currentColor"
        />
      </svg>
    ),
    instagram: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
          fill="currentColor"
        />
      </svg>
    ),
    linkedin: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
          fill="currentColor"
        />
        <path d="M6 9H2V21H6V9Z" fill="currentColor" />
        <path
          d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return icons[type] || null;
};

export default ContactUS;
