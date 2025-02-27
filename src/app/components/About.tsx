// pages/about.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaShippingFast, FaAward, FaHandshake, FaStar } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Founder & CEO",
    image: "/shoes/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg",
    bio: "Visionary sneakerhead with 15+ years in the footwear industry. Alex founded Shoose with a mission to merge innovation with style.",
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Lead Designer",
    image: "/shoes/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.jpg",
    bio: "Award-winning footwear designer with a background in industrial design. Jamie brings creative concepts to life with cutting-edge aesthetics.",
  },
  {
    id: 3,
    name: "Taylor Reed",
    role: "Marketing Director",
    image: "/shoes/ali-morshedlou-WMD64tMfc4k-unsplash.jpg",
    bio: "Digital marketing expert with a passion for streetwear culture. Taylor ensures Shoose stays at the forefront of footwear trends.",
  },
  {
    id: 4,
    name: "Jordan Smith",
    role: "Customer Experience",
    image: "/shoes/zahir-namane-hwc7eIQiTCE-unsplash.jpg",
    bio: "Former pro athlete turned customer advocate. Jordan ensures every customer interaction exceeds expectations.",
  },
];

const milestones = [
  {
    year: "2018",
    title: "Our Beginning",
    description:
      "Shoose was founded with a vision to create revolutionary footwear that combines technology, comfort, and style.",
  },
  {
    year: "2019",
    title: "First Collection",
    description:
      "Launched our debut collection featuring innovative designs that quickly gained popularity among sneaker enthusiasts.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description:
      "Expanded to international markets with flagship stores in Tokyo, London, and New York.",
  },
  {
    year: "2021",
    title: "Sustainability Initiative",
    description:
      "Introduced eco-friendly materials and manufacturing processes across our entire product line.",
  },
  {
    year: "2022",
    title: "Digital Revolution",
    description:
      "Launched our immersive shopping experience with AR try-on technology and personalized customization.",
  },
  {
    year: "2023",
    title: "Award-Winning Design",
    description:
      "Our flagship 'Nebula' series won International Footwear Design Award for innovation and aesthetics.",
  },
  {
    year: "2024",
    title: "Industry Leadership",
    description:
      "Recognized as industry leaders with our founder featured on the cover of Footwear Innovation magazine.",
  },
];

const values = [
  {
    icon: <FaAward className="text-3xl text-purple-500" />,
    title: "Excellence",
    description:
      "We are committed to creating the highest quality footwear that sets new standards in the industry.",
  },
  {
    icon: <FaHandshake className="text-3xl text-blue-500" />,
    title: "Integrity",
    description:
      "We build trust through transparency in our business practices and honest relationships with customers and partners.",
  },
  {
    icon: <FaShippingFast className="text-3xl text-pink-500" />,
    title: "Innovation",
    description:
      "We continuously push boundaries to develop new technologies and designs that shape the future of footwear.",
  },
];

const About = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateSections, setAnimateSections] = useState(false);

  useEffect(() => {
    setAnimateHero(true);
    setTimeout(() => setAnimateSections(true), 500);
  }, []);

  // Animation variants
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>About Us | Shoose</title>
        <meta
          name="description"
          content="Learn about the Shoose story, our mission, and the team behind the brand"
        />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/wallpaperflare.com_wallpaper.jpg"
              alt="About Us Background"
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
            <h1 className="text-4xl md:text-6xl px-20 font-bold tracking-wider mb-4">
              OUR STORY
            </h1>
            <p className="text-sm text-gray-300 px-20 max-w-2xl">
              From a passion for innovative footwear to a global brand. Discover
              the journey, people, and vision behind Shoose.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <motion.section
          className="py-20 bg-gradient-to-b from-black to-gray-900"
          initial="hidden"
          animate={animateSections ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                At Shoose, we&apos;re on a mission to revolutionize footwear
                through
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {" "}
                  innovative design
                </span>
                ,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  {" "}
                  cutting-edge technology
                </span>
                , and
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                  {" "}
                  uncompromising quality
                </span>
                . We believe that exceptional footwear should merge performance
                with style, pushing boundaries while remaining accessible to
                those who appreciate true craftsmanship.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="py-20 bg-gray-900"
          initial="hidden"
          animate={animateSections ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <div className="container mx-auto px-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
              variants={itemVariants}
            >
              Core Values
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center hover:shadow-glow transition-all duration-300"
                  variants={scaleVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="bg-gray-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Journey Timeline */}
        <motion.section
          className="py-20 bg-black"
          initial="hidden"
          animate={animateSections ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <div className="container mx-auto px-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
              variants={itemVariants}
            >
              Our Journey
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    variants={itemVariants}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-glow z-10"></div>

                    {/* Content */}
                    <div
                      className={`ml-8 md:ml-0 md:w-1/2 ${
                        index % 2 === 0
                          ? "md:pr-16 text-right"
                          : "md:pl-16 text-left"
                      }`}
                    >
                      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 hover:shadow-glow transition-all duration-300">
                        <div className="inline-block px-3 py-1 rounded bg-gray-700 text-sm font-bold mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
          initial="hidden"
          animate={animateSections ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Background elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-900/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-900/20 rounded-full filter blur-3xl"></div>

          <div className="container mx-auto px-20 relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-center"
              variants={itemVariants}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-sm text-gray-300 max-w-2xl mx-auto text-center mb-16"
              variants={itemVariants}
            >
              The passionate individuals behind Shoose who bring innovation and
              excellence to everything we do.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden group"
                  variants={scaleVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-purple-400 mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="py-20 bg-black"
          initial="hidden"
          animate={animateSections ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <div className="container mx-auto px-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
              variants={itemVariants}
            >
              What People Say
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center text-yellow-400 mb-4">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  &apos;&apos;Shoose has completely transformed my expectations
                  for athletic footwear. The attention to detail and innovative
                  design make them stand out from everything else in my
                  collection.&apos;&apos;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-600 mr-3"></div>
                  <div>
                    <h4 className="font-bold">Michael K.</h4>
                    <p className="text-xs text-gray-400">
                      Professional Athlete
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center text-yellow-400 mb-4">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  &apos;&apos;As a sneaker enthusiast, I&apos;ve worn countless
                  brands, but Shoose consistently delivers the perfect blend of
                  style, comfort, and durability. They&apos;re pushing the
                  industry forward.&apos;&apos;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 mr-3"></div>
                  <div>
                    <h4 className="font-bold">Sarah L.</h4>
                    <p className="text-xs text-gray-400">Sneaker Collector</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center text-yellow-400 mb-4">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  &apos;&apos;I appreciate Shoose&apos;s commitment to
                  sustainability without compromising on quality or design.
                  Their eco-friendly approach is why they&apos;ve become my
                  go-to footwear brand.&apos;&apos;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-600 mr-3"></div>
                  <div>
                    <h4 className="font-bold">Jason T.</h4>
                    <p className="text-xs text-gray-400">Fashion Blogger</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden"
          initial="hidden"
          animate={animateSections ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <div className="absolute inset-0 bg-pattern opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              Join the Shoose Revolution
            </motion.h2>
            <motion.p
              className="text-sm text-gray-200 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Experience the future of footwear with our latest collection.
            </motion.p>
            <Link href="/collection">
              <motion.button
                className="bg-white text-gray-900 hover:bg-gray-200 py-3 px-10 text-lg font-bold tracking-wider uppercase transition-all duration-300"
                variants={scaleVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Collection
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
