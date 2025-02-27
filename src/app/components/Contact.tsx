// pages/contact.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateSections, setAnimateSections] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setAnimateHero(true);
    setTimeout(() => setAnimateSections(true), 500);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    sending: {
      backgroundColor: "#9333EA",
      transition: { duration: 0.3 },
    },
    success: {
      backgroundColor: "#10B981",
      transition: { duration: 0.3 },
    },
    error: {
      backgroundColor: "#EF4444",
      transition: { duration: 0.3 },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.4, duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Contact Us | Shoose</title>
        <meta
          name="description"
          content="Get in touch with the Shoose team for inquiries, support, or collaboration"
        />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/wallpaperflare.com_wallpaper.jpg"
              alt="Contact Background"
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
          </div>

          <div
            className={`relative z-10 container mx-auto px-4 h-full flex flex-col justify-center transition-all duration-1000 ${
              animateHero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h1 className="text-4xl px-20 md:text-6xl font-bold tracking-wider mb-4">
              CONTACT US
            </h1>
            <p className="text-sm px-20 text-gray-300 max-w-2xl">
              Have questions or feedback? We&apos;d love to hear from you. Our
              team is ready to assist with anything you need.
            </p>
          </div>
        </section>

        {/* Contact Information and Form Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
          {/* Background elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-900/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-900/20 rounded-full filter blur-3xl"></div>

          <div className="container mx-auto px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Information */}
              <motion.div
                initial="hidden"
                animate={animateSections ? "visible" : "hidden"}
                variants={staggerContainerVariants}
                className="lg:order-2"
              >
                <motion.h2
                  className="text-3xl font-bold mb-8"
                  variants={itemVariants}
                >
                  Get In Touch
                </motion.h2>

                <div className="space-y-8">
                  <motion.div
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mr-4">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Our Location</h3>
                      <p className="text-gray-300 text-sm">
                        123 Innovation Street
                        <br />
                        SoHo, New York, NY 10012
                        <br />
                        United States
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mr-4">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Email Us</h3>
                      <p className="text-gray-300 text-sm">
                        support@shoose.com
                        <br />
                        sales@shoose.com
                        <br />
                        press@shoose.com
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mr-4">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Call Us</h3>
                      <p className="text-gray-300 text-sm">
                        Customer Support: +1 (800) 123-4567
                        <br />
                        General Inquiries: +1 (212) 555-7890
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mr-4">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Business Hours</h3>
                      <p className="text-gray-300 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM (EST)
                        <br />
                        Saturday: 10:00 AM - 4:00 PM (EST)
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div className="mt-12" variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <FaInstagram className="text-white text-xl" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <FaTwitter className="text-white text-xl" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <FaFacebookF className="text-white text-xl" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <FaYoutube className="text-white text-xl" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 lg:order-1"
                initial="hidden"
                animate={animateSections ? "visible" : "hidden"}
                variants={fadeInUpVariants}
                custom={0}
              >
                <h2 className="text-3xl font-bold mb-8">Send Us A Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full text-sm bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter Your Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full text-sm bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full text-sm bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Your subject"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full text-sm bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg focus:outline-none"
                    variants={buttonVariants}
                    animate={formStatus}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={formStatus !== "idle"}
                  >
                    {formStatus === "idle" && "Send Message"}
                    {formStatus === "sending" && "Sending..."}
                    {formStatus === "success" && "Message Sent!"}
                    {formStatus === "error" && "Error! Try Again"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 relative">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent"></div>

          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={animateSections ? "visible" : "hidden"}
              variants={mapVariants}
              style={{ height: "500px" }}
            >
              {/* Replace with actual map integration if needed */}
              <div className="relative w-full h-full">
                <Image
                  src="/eb2694f5-9bf5-487c-a918-79ce6d7246a7.webp"
                  alt="Map Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <p className="text-2xl font-bold mb-4">
                      Interactive Map Placeholder
                    </p>
                    <p className="text-gray-300 text-sm mb-6">
                      Your preferred map integration will be placed here
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
          <div className="container mx-auto px-20">
            <motion.div
              initial="hidden"
              animate={animateSections ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              custom={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-300 max-w-3xl mx-auto">
                Find quick answers to common questions about our products,
                services, and policies.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={animateSections ? "visible" : "hidden"}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                {
                  question: "What are your shipping options?",
                  answer:
                    "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days). Shipping rates vary depending on location and selected method.",
                },
                {
                  question: "How do I return a product?",
                  answer:
                    "You can initiate a return through your account within 30 days of purchase. Simply go to your order history, select the item you wish to return, and follow the return instructions. We'll provide a prepaid shipping label.",
                },
                {
                  question: "Do you offer customization services?",
                  answer:
                    "Yes, we offer customization services for select products. You can add personalized graphics, text, or color combinations. The customization options are available on the product page for eligible items.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are securely processed through our encrypted payment system to ensure your financial information remains safe.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate={animateSections ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              custom={3}
              className="text-center mt-12"
            >
              <p className="text-sm text-gray-300 mb-4">
                Still have questions? Our support team is always ready to help.
              </p>
              <a
                href="#"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
              >
                View All FAQs
              </a>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate={animateSections ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              custom={0}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
              <p className="text-sm text-gray-100 mb-8">
                Subscribe to our newsletter to receive the latest updates,
                exclusive offers, and early access to new releases.
              </p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow text-sm bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg py-3 px-4 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-purple-900 font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-gray-200 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
