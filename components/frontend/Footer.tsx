// Footer.jsx
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#14404B] text-white ">
      {/* Newsletter Section */}
      <div className=" py-8 border-b border-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">
                Stay updated with our latest deals
              </h3>
              <p className="">
                Get exclusive offers and tech news straight to your inbox
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex gap-5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none"
                />
                <button className="bg-white cursor-pointer rounded-lg hover:bg-gray-900 hover:text-white text-black transition px-4 py-2 rounded-r font-medium">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
                <span className=" text-2xl mr-2">
                  <i className="fas fa-bolt"></i>
                </span>
                <Image
                  src="/vijayelectronicslogo.png"
                  alt="Vijay Electronics Logo"
                  width={1000}
                  height={1000}
                  className="w-16 h-16 mr-2 bg-white rounded-full"
                />{" "}
                <span className="font-bold text-xl">Vijay Electronics</span>
              </div>
            </Link>
            <p className=" mb-4">
              Your one-stop destination for premium electronics, gadgets, and
              tech accessories with expert service and support.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-black transition">
                <span>Facebook</span>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <span>Twitter</span>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <span>Instagram</span>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <span>YouTube</span>
                <i className="fab fa-youtube"></i>
              </a>
            </div> */}
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white pb-2">
              Products & Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products/smartphones"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Smartphones & Tablets
                </Link>
              </li>
              <li>
                <Link
                  href="/products/laptops"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Laptops & Computers
                </Link>
              </li>
              <li>
                <Link
                  href="/products/audio"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Audio & Headphones
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tv"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>TVs & Home Theater
                </Link>
              </li>
              <li>
                <Link
                  href="/products/wearables"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Wearable Tech
                </Link>
              </li>
              <li>
                <Link
                  href="/services/repair"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Repair Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/installation"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Installation Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-black mt-1 mr-3">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <span className="">
                  123 Tech Avenue, Digital City
                  <br />
                  Innovation State, 54321
                </span>
              </li>
              <li className="flex items-center">
                <div className="text-black mr-3">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <a
                  href="tel:+15551234567"
                  className="text-white hover:text-black transition"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <div className="text-black mr-3">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <a
                  href="https://wa.me/15551234567"
                  className="text-white hover:text-black transition"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center">
                <div className="text-black mr-3">
                  <i className="fas fa-envelope"></i>
                </div>
                <a
                  href="mailto:support@techelectro.com"
                  className="text-white hover:text-black transition"
                >
                  support@techelectro.com
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white pb-2">
              About Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about/team"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Blog & News
                </Link>
              </li>
              <li>
                <Link
                  href="/store-locator"
                  className="text-white hover:text-black transition flex items-center"
                >
                  <span className="mr-2">→</span>Store Locator
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Business Hours</h4>
              <p className="">Monday - Friday: 9AM - 8PM</p>
              <p className="">Saturday: 10AM - 6PM</p>
              <p className="">Sunday: 11AM - 5PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-sm ">
              © {new Date().getFullYear()} TechElectro. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 text-sm ">
              <Link
                href="/privacy-policy"
                className="hover:text-black transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-black transition"
              >
                Terms of Service
              </Link>
              <Link
                href="/returns-policy"
                className="hover:text-black transition"
              >
                Returns Policy
              </Link>
              <Link href="/sitemap" className="hover:text-black transition">
                Sitemap
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-2">
                <img src="/api/placeholder/32/20" alt="Visa" className="h-5" />
                <img
                  src="/api/placeholder/32/20"
                  alt="Mastercard"
                  className="h-5"
                />
                <img
                  src="/api/placeholder/32/20"
                  alt="PayPal"
                  className="h-5"
                />
                <img
                  src="/api/placeholder/32/20"
                  alt="Apple Pay"
                  className="h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
