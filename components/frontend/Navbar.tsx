"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  BookMarked,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, useClerk } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // Show navbar when scrolling up or at top
      setIsVisible(scrollDelta <= 0 || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const categories = [
    // {
    //   name: "TVs & Displays",
    //   subcategories: [
    //     "OLED TVs",
    //     "QLED TVs",
    //     "Smart TVs",
    //     "Gaming TVs",
    //     "Accessories",
    //   ],
    // },
    {
      name: "Home Appliances",
      subcategories: [
        { label: "Televisions", value: "television" },
        { label: "Refrigerators", value: "refrigerator" },
        { label: "Washing Machines", value: "washingmachine" },
        { label: "Air Conditioners", value: "airconditioner" },
        { label: "Bluetooth Speakers", value: "bluetoothspeaker" },
        { label: "Water Heaters", value: "waterheater" },
        { label: "Sewing Machines", value: "sewingmachine" },
        { label: "Fan", value: "fan" },
        { label: "Cooler", value: "cooler" },
        { label: "Iron", value: "iron" },
      ],
    },
    {
      name: "Kitchen Appliances",
      subcategories: [
        { label: "Mixer/Juicer", value: "mixerjuicer" },
        { label: "Microwaves", value: "microwave" },
        { label: "Induction", value: "induction" },
      ],
    },
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.2, ease: "easeInOut" as const },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const mobileDropdownVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 },
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`
      w-full z-50 sticky top-0 transition-all duration-300 ease-in-out
      ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      border-b border-[#14404B]
      ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md"
          : "bg-white/5 backdrop-blur-sm"
      }
    `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-2xl">
            <Link href="/" className="flex items-center">
              <Image
                src="/vijayelectronicslogo.png"
                alt="Vijay Electronics Logo"
                width={1000}
                height={1000}
                className="w-12 h-12 mr-2"
              />
              <span
                className={`hidden sm:block font-medium text-xl transition-opacity duration-300 ${
                  isScrolled ? "text-gray-800" : "text-gray-700"
                }`}
              >
                Vijay Electronics
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <button
                  className={`flex items-center text-black hover:text-[#14404B] py-2 transition-colors duration-300 relative ${
                    activeDropdown === category.name ? "text-[#14404B]" : ""
                  }`}
                  onClick={() => toggleDropdown(category.name)}
                  onMouseEnter={() => setActiveDropdown(category.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {category.name}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === category.name ? "rotate-180" : ""
                    }`}
                  />
                  {/* Animated underline on hover */}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#14404B] transition-all duration-300 ${
                      activeDropdown === category.name
                        ? "w-full"
                        : "group-hover:w-full"
                    }`}
                  ></span>
                </button>

                {/* Dropdown Menu with Animation */}
                <AnimatePresence>
                  {activeDropdown === category.name && (
                    <motion.div
                      className="absolute left-0 w-64 mt-1 py-3 bg-white rounded-lg shadow-xl z-50 border border-gray-100"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      onMouseEnter={() => setActiveDropdown(category.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {category.subcategories.map((subcategory) => (
                        <Link
                          href={`/category/${subcategory.value}`}
                          key={subcategory.value}
                          className="block px-5 py-2.5 text-sm text-black hover:bg-gray-50 hover:text-[#14404B] transition-all duration-200"
                        >
                          {subcategory.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="cursor-pointer mt-2 relative group ">
              <Link
                href="/products"
                className="text-black hover:text-[#14404B] transition-colors duration-300 relative group cursor-pointer"
              >
                All Products
              </Link>
              <span className="absolute -bottom-1 left-0 transform -translate-x-0 w-0 h-0.5 bg-[#14404B] transition-all duration-300 group-hover:w-full"></span>
            </div>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-5">
            {/* Search Bar with Animation */}
            <div className="relative">
            <form onSubmit={handleSearch}>
              <button
                className="text-gray-700 cursor-pointer hover:text-teal-600 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(e);
                  setSearchOpen(!searchOpen);
                }}
              >
                <Search className="h-5 w-5 mt-1 " />
              </button>
             
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-64 md:w-80"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-lg shadow-lg p-3 flex items-center">
                      <Search className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full focus:outline-none text-sm"
                        autoFocus
                      />
                      <button
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
               <button type="submit" className="hidden">
                  Submit
                </button>
              </form>
            </div>
            {isSignedIn ? (
              <>
                <p className="font-bold">{user?.firstName || user?.username}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => signOut({ redirectUrl: "/sign-in" })}
                >
                  Log Out
                </p>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="text-gray-700 hover:text-teal-600 transition-colors duration-300 relative group"
              >
                <User className="h-5 w-5" />
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            <Link
              href="/cart"
              className="text-gray-700 hover:text-teal-600 transition-colors duration-300 relative group"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                {cartItems.length}
              </span>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/wishlist"
              className="text-gray-700 hover:text-teal-600 transition-colors duration-300 relative group"
            >
              <BookMarked className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                {wishlistItems.length}
              </span>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Mobile menu button with animation */}
            <button
              className="md:hidden text-gray-700 hover:text-teal-600 transition-colors duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="px-2 pb-4 bg-white shadow-lg">
              {categories.map((category) => (
                <div key={category.name} className="py-1 overflow-hidden">
                  <button
                    className="flex items-center justify-between w-full px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-md transition-all duration-300"
                    onClick={() => toggleDropdown(category.name)}
                  >
                    {category.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === category.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown with Animation */}
                  <AnimatePresence>
                    {activeDropdown === category.name && (
                      <motion.div
                        className="pl-4 space-y-1 overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileDropdownVariants}
                      >
                        {category.subcategories.map((subcategory) => (
                          <Link
                            href={`/category/${subcategory.value}`}
                            key={subcategory.value}
                            className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-md transition-all duration-200"
                          >
                            {subcategory.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <motion.div
                className="mt-4 border-t border-gray-200 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/account"
                  className="block px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all duration-200"
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  className="block px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all duration-200"
                >
                  My Orders
                </Link>
                <Link
                  href="/support"
                  className="block px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all duration-200"
                >
                  Support
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
