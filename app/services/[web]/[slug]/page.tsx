"use client";

import React, { useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import {
  FaReact,
  FaNodeJs,
  FaShopify,
  FaHtml5,
  FaCss3,
  FaChartLine,
  FaWordpress,
  FaBullhorn,
  FaPaintBrush,
  FaSearchengin,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaJava,
  FaAndroid,
  FaFrog,
  FaSnapchatGhost,
  FaPinterest,
  FaReddit,
  FaYoutube,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFlutter,
  SiGraphql,
  SiMongodb,
  SiGoogleads,
  SiGoogleanalytics,
  SiTiktok,
  SiFigma,
  SiSemrush,
  SiMailchimp,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobe,
  SiExpress,
  SiStrapi,
  SiSanity,
  SiElementor,
  SiWix,
  SiWebflow,
  SiMysql,
  SiShopify,
  SiDart,
  SiFirebase,
  SiKotlin,
  SiSwift,
  SiApple,
  SiXcode,
  SiAdobexd,
  SiSketch,
  SiInvision,
  SiGoogle,
  SiNotion,
  SiGooglecloud,
  SiYoast,
  SiSurveymonkey,
  SiBuzzfeed,
  SiUbereats,
  SiSpeedtest,
  SiMedium,
  SiCanva,
  SiGrammarly,
  SiBuffer,
  SiHubspot,
  SiTrello,
  SiDigitalocean,
  SiVercel,
  SiNginx,
  SiGithubactions,
  SiJenkins,
  SiGitlab,
  SiBitbucket,
  SiTerraform,
  SiKubernetes,
  SiGrafana,
  SiPrometheus,
  SiDatadog,
  SiSentry,
} from "react-icons/si";
import { FaFlutter, FaXTwitter } from "react-icons/fa6";


// ✅ Step 1: Keep all service data in this file
export const SERVICE_DATA: Record<string, any> = {
web: {
  title: "Building Seamless Digital Experiences",
  subtitle: "WEB DEVELOPMENT",
  button: "Build Your High-Performance Website",
  descriptionTitle: "Overview — What We Excel At:",
  descriptionText:
    "We craft responsive, SEO-friendly, and high-performance web applications using modern technologies like React, Next.js, and Node.js — delivering speed, scalability, and reliability.",

  sublinks: {
    frontend: {
      title: "Crafting Beautiful and Interactive Interfaces",
      subtitle: "FRONTEND DEVELOPMENT",
      button: "Enhance Your UI/UX Experience",
      descriptionTitle: "Overview — Frontend Expertise:",
      descriptionText:
        "Our frontend team specializes in creating responsive, accessible, and visually engaging user interfaces using React, Next.js, and Tailwind CSS.",
      bg: "/services/frontend.png",
      images: ["/services/frontend1.webp", "/services/frontend2.webp"],
      orbitTechs: [
        { id: "html", icon: <FaHtml5 size={26} color="#E44D26" /> },
        { id: "css", icon: <FaCss3 size={26} color="#1572B6" /> },
        { id: "javascript", icon: <SiJavascript size={26} color="#F7DF1E" /> },
        { id: "react", icon: <FaReact size={26} color="#61DBFB" /> },
        { id: "next", icon: <SiNextdotjs size={26} color="#000000" /> },
        { id: "tailwind", icon: <SiTailwindcss size={26} color="#38BDF8" /> },
        { id: "typescript", icon: <SiTypescript size={26} color="#3178C6" /> },
      ],
    },

    backend: {
      title: "Powerful & Scalable Server Solutions",
      subtitle: "BACKEND DEVELOPMENT",
      button: "Develop Robust Server Logic",
      descriptionTitle: "Overview — Backend Strength:",
      descriptionText:
        "We build secure, optimized, and scalable server-side systems using Node.js, Express, and modern databases for reliable performance.",
      bg: "/services/backend.webp",
      images: ["/services/backend1.webp", "/services/backend2.webp"],
      orbitTechs: [
        { id: "node", icon: <FaNodeJs size={26} color="#3C873A" /> },
        { id: "express", icon: <SiExpress size={26} color="#000000" /> },
        { id: "mongodb", icon: <SiMongodb size={26} color="#47A248" /> },
        { id: "graphql", icon: <SiGraphql size={26} color="#E535AB" /> },
        { id: "mysql", icon: <SiMysql size={26} color="#4479A1" /> },
        { id: "typescript", icon: <SiTypescript size={26} color="#3178C6" /> },
      ],
    },

    fullstack: {
      title: "Complete End-to-End Web Solutions",
      subtitle: "FULL STACK DEVELOPMENT",
      button: "Launch Your Full Web Ecosystem",
      descriptionTitle: "Overview — Full Stack Expertise:",
      descriptionText:
        "From frontend to backend, we deliver complete web solutions using React, Next.js, Node.js, and MongoDB — ensuring seamless performance.",
      bg: "/services/fullstack.webp",
      images: ["/services/full1.webp", "/services/full2.webp"],
      orbitTechs: [
        { id: "html", icon: <FaHtml5 size={26} color="#E44D26" /> },
        { id: "css", icon: <FaCss3 size={26} color="#1572B6" /> },
        { id: "javascript", icon: <SiJavascript size={26} color="#F7DF1E" /> },
        { id: "react", icon: <FaReact size={26} color="#61DBFB" /> },
        { id: "next", icon: <SiNextdotjs size={26} color="#000000" /> },
        { id: "node", icon: <FaNodeJs size={26} color="#3C873A" /> },
        { id: "tailwind", icon: <SiTailwindcss size={26} color="#38BDF8" /> },
        { id: "typescript", icon: <SiTypescript size={26} color="#3178C6" /> },
        { id: "express", icon: <SiExpress size={26} color="#000000" /> },
        { id: "mongodb", icon: <SiMongodb size={26} color="#47A248" /> },
        { id: "graphql", icon: <SiGraphql size={26} color="#E535AB" /> },
        { id: "mysql", icon: <SiMysql size={26} color="#4479A1" /> },
      ],
    },

    ecommerce: {
      title: "High-Converting eCommerce Platforms",
      subtitle: "E-COMMERCE DEVELOPMENT",
      button: "Launch Your Online Store",
      descriptionTitle: "Overview — eCommerce Expertise:",
      descriptionText:
        "We create fast, scalable, and feature-rich eCommerce websites using Shopify, WordPress, and headless CMS platforms.",
      bg: "/services/ecomm.jpg",
      images: ["/services/ecommerce1.webp", "/services/ecommerce2.webp"],
      orbitTechs: [
        { id: "shopify", icon: <FaShopify size={26} color="#96BF48" /> },
        { id: "wordpress", icon: <FaWordpress size={26} color="#21759B" /> },
        { id: "strapi", icon: <SiStrapi size={26} color="#2E7EEA" /> },
        { id: "sanity", icon: <SiSanity size={26} color="#F03E2F" /> },
      ],
    },

    shopify: {
      title: "Empowering Shopify Brands to Scale",
      subtitle: "SHOPIFY DEVELOPMENT",
      button: "Boost Your Shopify Store",
      descriptionTitle: "Overview — Shopify Expertise:",
      descriptionText:
        "We create Shopify stores, custom themes, and integrations that enhance sales performance and align perfectly with your brand identity.",
      bg: "/services/pxfuel.jpg",
      images: ["/services/shop1.webp", "/services/shop2.webp"],
      orbitTechs: [
        { id: "shopify", icon: <FaShopify size={26} color="#96BF48" /> },
        { id: "wordpress", icon: <FaWordpress size={26} color="#21759B" /> },
        { id: "strapi", icon: <SiStrapi size={26} color="#2E7EEA" /> },
        { id: "sanity", icon: <SiSanity size={26} color="#F03E2F" /> },
        { id: "figma", icon: <SiFigma size={26} color="#F24E1E" /> },
      ],
    },
    custom : {
  title: "Crafting Custom Storefront Experiences",
  subtitle: "HEADLESS COMMERCE & CUSTOM STOREFRONTS",
  button: "Launch a Lightning-Fast Storefront",
  descriptionTitle: "Overview — What We Build:",
  descriptionText:
    "We build custom storefronts using headless architecture, connecting powerful backends like Shopify, Sanity, and Strapi with blazing-fast frontends built on Next.js for unmatched performance and scalability.",
  bg: "/services/custom.jpg",
  images: ["/services/storefront1.webp", "/services/storefront2.webp"],
  orbitTechs: [
    { id: "nextjs", icon: <SiNextdotjs size={26} color="#000000" /> },
    { id: "hydrogen", icon: <SiShopify size={26} color="#96BF48" /> },
    { id: "graphql", icon: <SiGraphql size={26} color="#E10098" /> },
    { id: "sanity", icon: <SiSanity size={26} color="#F03E2F" /> },
    { id: "strapi", icon: <SiStrapi size={26} color="#2E7EEA" /> },
    { id: "figma", icon: <SiFigma size={26} color="#F24E1E" /> },
  ],
},
cms: {
  title: "Building Powerful CMS Websites That Scale",
  subtitle: "CONTENT MANAGEMENT SYSTEMS (CMS)",
  button: "Launch Your CMS Website",
  descriptionTitle: "Overview — What We Offer:",
  descriptionText:
    "We design and develop dynamic CMS-powered websites using platforms like WordPress, Webflow, and Wix — enabling you to easily manage and scale content while keeping performance, SEO, and design consistency intact.",
  bg: "/services/CMS.png",
  images: ["/services/cms1.webp", "/services/cms2.webp"],
  orbitTechs: [
    { id: "wordpress", icon: <FaWordpress size={26} color="#21759B" /> },
    { id: "elementor", icon: <SiElementor size={26} color="#D30C5C" /> },
    { id: "wix", icon: <SiWix size={26} color="#0C6EFC" /> },
    { id: "webflow", icon: <SiWebflow size={26} color="#4353FF" /> },
    { id: "shopify", icon: <FaShopify size={26} color="#96BF48" /> },
  ],
},

  },
},

mobile: {
  title: "Next-Generation Mobile Experiences",
  subtitle: "MOBILE APP DEVELOPMENT",
  button: "Launch Your Cross-Platform App",
  descriptionTitle: "Overview — Mobile App Expertise:",
  descriptionText:
    "We build high-performance, scalable, and visually stunning mobile apps — from native iOS and Android to cross-platform solutions with React Native and Flutter. Our apps ensure smooth performance, optimized UX, and seamless scalability.",

  sublinks: {
    ios: {
      title: "Native iOS App Development",
      subtitle: "iOS DEVELOPMENT",
      description:
        "We design and develop premium native iOS apps using Swift and SwiftUI — delivering smooth, secure, and fast user experiences for Apple devices.",
      bg: "/services/mob.webp",
      images: ["/services/ios1.webp", "/services/ios2.webp"],
      orbitTechs: [
        { id: "swift", icon: <SiSwift size={26} color="#FA7343" /> },
        { id: "swiftui", icon: <SiApple size={26} color="#000000" /> },
        { id: "xcode", icon: <SiXcode size={26} color="#147EFB" /> },
      ],
    },

    android: {
      title: "Native Android App Development",
      subtitle: "ANDROID DEVELOPMENT",
      description:
        "We craft feature-rich Android apps using Kotlin and Java — ensuring top-notch performance, compatibility, and modern design across all devices.",
      bg: "/services/android.jpg",
      images: ["/services/android1.webp", "/services/android2.webp"],
      orbitTechs: [
        { id: "kotlin", icon: <SiKotlin size={26} color="#7F52FF" /> },
        { id: "java", icon: <FaJava size={26} color="#E76F00" /> },
        { id: "android", icon: <FaAndroid size={26} color="#3DDC84" /> },
        { id: "android", icon: <FaFlutter size={26} color="#3DDC84" /> },
      ],
    },

    crossplatform: {
      title: "Cross-Platform Mobile Development",
      subtitle: "CROSS-PLATFORM DEVELOPMENT",
      description:
        "We build efficient, fast, and consistent cross-platform apps that work flawlessly on both iOS and Android — using shared codebases for faster delivery.",
      bg: "/services/cross.jpg",
      images: ["/services/cross1.webp", "/services/cross2.webp"],
      orbitTechs: [
        { id: "reactnative", icon: <FaReact size={26} color="#61DBFB" /> },
        { id: "flutter", icon: <SiFlutter size={26} color="#02569B" /> },
        { id: "typescript", icon: <SiTypescript size={26} color="#3178C6" /> },
      ],
    },

    // flutter: {
    //   title: "Beautiful Apps with Flutter",
    //   subtitle: "FLUTTER DEVELOPMENT",
    //   description:
    //     "We create elegant, high-performance apps using Flutter — combining expressive UI with native performance for all major platforms.",
    //   bg: "/services/flutter.jpg",
    //   images: ["/services/flutter1.webp", "/services/flutter2.webp"],
    //   orbitTechs: [
    //     { id: "flutter", icon: <SiFlutter size={26} color="#02569B" /> },
    //     { id: "dart", icon: <SiDart size={26} color="#0175C2" /> },
    //     { id: "firebase", icon: <SiFirebase size={26} color="#FFA611" /> },
    //   ],
    // },

    reactnative: {
      title: "Powerful Apps with React Native",
      subtitle: "REACT NATIVE DEVELOPMENT",
      description:
        "We develop fast, scalable, and modern apps using React Native — leveraging reusable components and seamless integrations across iOS and Android.",
      bg: "/services/reactnative.jpg",
      images: ["/services/mobile1.webp", "/services/mobile2.webp"],
      orbitTechs: [
        { id: "reactnative", icon: <FaReact size={26} color="#61DBFB" /> },
        { id: "node", icon: <FaNodeJs size={26} color="#3C873A" /> },
        { id: "firebase", icon: <SiFirebase size={26} color="#FFA611" /> },
      ],
    },
  },
},


  design: {
  title: "Designing Exceptional Digital Experiences",
  subtitle: "UI/UX DESIGN",
  button: "Craft a Stunning User Experience",
  descriptionTitle: "Overview — UI/UX Expertise:",
  descriptionText:
    "We design beautiful, functional, and human-centered interfaces that elevate your brand and engage your audience — blending creativity with usability for the best possible user experience.",

  sublinks: {
    website: {
      title: "Modern & Responsive Website Design",
      subtitle: "WEBSITE DESIGN",
      description:
        "We create visually appealing, responsive website designs that balance aesthetics and usability — delivering a flawless experience across all devices.",
      bg: "/services/peakpx.jpg",
      images: ["/services/design-website1.webp", "/services/design-website2.webp"],
      orbitTechs: [
        { id: "figma", icon: <SiFigma size={26} color="#F24E1E" /> },
        { id: "adobexd", icon: <SiAdobexd size={26} color="#FF61F6" /> },
        { id: "photoshop", icon: <SiAdobephotoshop size={26} color="#31A8FF" /> },
      ],
    },

    mobile: {
      title: "User-Friendly Mobile App Design",
      subtitle: "MOBILE APP DESIGN",
      description:
        "We craft intuitive and visually engaging mobile app interfaces that focus on usability, accessibility, and delightful user journeys.",
      bg: "/services/mbldesign.png",
      images: ["/services/design-mobile1.webp", "/services/design-mobile2.webp"],
      orbitTechs: [
        { id: "figma", icon: <SiFigma size={26} color="#F24E1E" /> },
        { id: "sketch", icon: <SiSketch size={26} color="#F7B500" /> },
        { id: "adobexd", icon: <SiAdobexd size={26} color="#FF61F6" /> },
      ],
    },

    branding: {
      title: "Strong & Memorable Brand Identity",
      subtitle: "BRAND IDENTITY DESIGN",
      description:
        "We build consistent and impactful brand identities — from logos to color systems — ensuring your digital presence reflects your core values.",
      bg: "/services/brand.jpg",
      images: ["/services/design-brand1.webp", "/services/design-brand2.webp"],
      orbitTechs: [
        { id: "illustrator", icon: <SiAdobeillustrator size={26} color="#FF9A00" /> },
        { id: "photoshop", icon: <SiAdobephotoshop size={26} color="#31A8FF" /> },
        { id: "figma", icon: <SiFigma size={26} color="#F24E1E" /> },
      ],
    },

    prototyping: {
      title: "Prototyping & Interactive Wireframes",
      subtitle: "PROTOTYPING & WIREFRAMING",
      description:
        "We turn ideas into interactive prototypes and user flows using industry-leading tools — helping validate UX decisions before development.",
      bg: "/services/frame.webp",
      images: ["/services/design-proto1.webp", "/services/design-proto2.webp"],
      orbitTechs: [
        { id: "figma", icon: <SiFigma size={26} color="#F24E1E" /> },
        { id: "adobexd", icon: <SiAdobexd size={26} color="#FF61F6" /> },
        { id: "invision", icon: <SiInvision size={26} color="#FF3366" /> },
      ],
    },
  },
},


 marketing: {
  title: "Accelerate Your Online Growth",
  subtitle: "DIGITAL MARKETING",
  button: "Boost Your Brand Visibility",
  descriptionTitle: "Overview — Digital Marketing Mastery:",
  descriptionText:
    "We deliver data-driven marketing strategies — from SEO and social media to paid advertising and content marketing — helping brands grow, engage, and convert audiences globally.",

  sublinks: {
    seo: {
      title: "Boost Rankings & Organic Visibility",
      subtitle: "SEO OPTIMIZATION",
      description:
        "We improve your search rankings with on-page, off-page, and technical SEO strategies that drive organic traffic and boost your brand visibility across Google.",
      bg: "/services/seo.jpg",
      images: ["/services/seo1.webp", "/services/seo2.webp"],
     
      orbitTechs: [
  // General SEO & Analytics Tools
  { id: "google", icon: <SiGoogle size={26} color="#4285F4" /> },
  { id: "semrush", icon: <SiSemrush size={26} color="#FF642D" /> },
  { id: "analytics", icon: <SiGoogleanalytics size={26} color="#FFA611" /> },
  { id: "searchconsole", icon: <SiGooglecloud size={26} color="#34A853" /> },
  { id: "yoast", icon: <SiYoast size={26} color="#A4286A" /> },
  { id: "surferseo", icon: <SiSurveymonkey size={26} color="#FCDC00" /> },
  { id: "buzzsumo", icon: <SiBuzzfeed size={26} color="#EE3322" /> },
  { id: "ubersuggest", icon: <SiUbereats size={26} color="#06C167" /> },
  { id: "screamingfrog", icon: <FaFrog size={26} color="#4CAF50" /> },
  { id: "keywordplanner", icon: <SiGoogleads size={26} color="#4285F4" /> },
  { id: "gtmetrix", icon: <SiSpeedtest size={26} color="#0097A7" /> },
],

    
    },

    socialmedia: {
      title: "Build a Strong Social Presence",
      subtitle: "SOCIAL MEDIA MARKETING",
      description:
        "We manage your social platforms — crafting engaging content, growing your audience, and increasing brand awareness through organic and paid strategies.",
      bg: "/services/marketing2.jpg",
      images: ["/services/social1.webp", "/services/social2.webp"],
      orbitTechs: [
        { id: "facebook", icon: <FaFacebook size={26} color="#1877F2" /> },
        { id: "instagram", icon: <FaInstagram size={26} color="#E4405F" /> },
        { id: "linkedin", icon: <FaLinkedin size={26} color="#0A66C2" /> },
        { id: "tiktok", icon: <SiTiktok size={26} color="#000000" /> },
      ],
    },

    content: {
      title: "Engaging, Conversion-Focused Content",
      subtitle: "CONTENT MARKETING",
      description:
        "We create impactful blog posts, ad copies, videos, and visuals that attract, educate, and convert — helping your brand stay relevant and trusted.",
      bg: "/services/content.jpg",
      images: ["/services/content1.webp", "/services/content2.webp"],
    
      orbitTechs: [
  { id: "notion", icon: <SiNotion size={26} color="#000000" /> },
  { id: "wordpress", icon: <FaWordpress size={26} color="#21759B" /> },
  { id: "mailchimp", icon: <SiMailchimp size={26} color="#FFE01B" /> },
  { id: "medium", icon: <SiMedium size={26} color="#000000" /> },
  { id: "canva", icon: <SiCanva size={26} color="#00C4CC" /> },

  // SEO & Optimization for Content
  { id: "yoast", icon: <SiYoast size={26} color="#A4286A" /> },
  { id: "surferseo", icon: <SiSurveymonkey size={26} color="#FCDC00" /> },
  { id: "grammarly", icon: <SiGrammarly size={26} color="#15C39A" /> },

  // Social & Collaboration Tools
  { id: "buffer", icon: <SiBuffer size={26} color="#231F20" /> },
  { id: "hubspot", icon: <SiHubspot size={26} color="#FF7A59" /> },
  { id: "trello", icon: <SiTrello size={26} color="#0079BF" /> },
],
    },

    paidads: {
      title: "Maximize ROI with Targeted Ads",
      subtitle: "PAID ADVERTISING",
      description:
        "We design and manage high-converting ad campaigns across Google, Meta, and TikTok — optimizing every click for the highest possible ROI.",
      bg: "/services/ads.webp",
      images: ["/services/ads1.webp", "/services/ads2.webp"],
      orbitTechs: [
          { id: "googleads", icon: <SiGoogleads size={26} color="#4285F4" /> },
  { id: "meta", icon: <FaFacebook size={26} color="#1877F2" /> },
  { id: "instagram", icon: <FaInstagram size={26} color="#E4405F" /> },
  { id: "tiktok", icon: <SiTiktok size={26} color="#000000" /> },
  { id: "linkedin", icon: <FaLinkedin size={26} color="#0A66C2" /> },
  { id: "twitter", icon: <FaXTwitter size={26} color="#000000" /> },
  { id: "snapchat", icon: <FaSnapchatGhost size={26} color="#FFFC00" /> },
  { id: "pinterest", icon: <FaPinterest size={26} color="#E60023" /> },
  { id: "reddit", icon: <FaReddit size={26} color="#FF4500" /> },
  { id: "youtubeads", icon: <FaYoutube size={26} color="#FF0000" /> },
      ],
    },
  },
},
devops: {
  title: "Scalable Cloud Solutions for Modern Applications",
  subtitle: "CLOUD & DEVOPS SERVICES",
  button: "Deploy and Scale with Confidence",
  descriptionTitle: "Overview — Cloud & DevOps Expertise:",
  descriptionText:
    "We help you deploy, automate, and scale your infrastructure using top cloud platforms and DevOps tools — ensuring performance, security, and high availability.",

  sublinks: {
    deployment: {
      title: "Server Deployment & Hosting",
      subtitle: "SERVER DEPLOYMENT",
      description:
        "We handle complete server setup and deployment — from configuring VPS or cloud servers to deploying secure, production-ready environments on AWS, DigitalOcean, or Vercel.",
      bg: "/services/server.webp",
      images: ["/services/server1.webp", "/services/server2.webp"],
      orbitTechs: [
        { id: "aws", icon: <FaAws size={26} color="#FF9900" /> },
        { id: "digitalocean", icon: <SiDigitalocean size={26} color="#0080FF" /> },
        { id: "vercel", icon: <SiVercel size={26} color="#000000" /> },
        { id: "nginx", icon: <SiNginx size={26} color="#009639" /> },
        { id: "docker", icon: <FaDocker size={26} color="#0db7ed" /> },
      ],
    },

    cicd: {
      title: "CI/CD Pipeline Setup",
      subtitle: "CONTINUOUS INTEGRATION & DELIVERY",
      description:
        "We automate your development workflow with CI/CD pipelines — enabling smooth code integration, testing, and deployment using platforms like GitHub Actions and Jenkins.",
      bg: "/services/cicd.webp",
      images: ["/services/cicd1.webp", "/services/cicd2.webp"],
      orbitTechs: [
        { id: "githubactions", icon: <SiGithubactions size={26} color="#2088FF" /> },
        { id: "jenkins", icon: <SiJenkins size={26} color="#D24939" /> },
        { id: "gitlab", icon: <SiGitlab size={26} color="#FC6D26" /> },
        { id: "bitbucket", icon: <SiBitbucket size={26} color="#0052CC" /> },
      ],
    },

    infrastructure: {
      title: "Cloud Infrastructure & Scaling",
      subtitle: "CLOUD INFRASTRUCTURE",
      description:
        "We architect and manage cloud infrastructure to ensure reliability, auto-scaling, and optimized cost — using AWS, Google Cloud, and Azure.",
      bg: "/services/infrastructure.webp",
      images: ["/services/infrastructure1.webp", "/services/infrastructure2.webp"],
      orbitTechs: [
        { id: "aws", icon: <FaAws size={26} color="#FF9900" /> },
        { id: "gcp", icon: <SiGooglecloud size={26} color="#4285F4" /> },
        { id: "terraform", icon: <SiTerraform size={26} color="#844FBA" /> },
        { id: "kubernetes", icon: <SiKubernetes size={26} color="#326CE5" /> },
      ],
    },

  },
},


 
};



// ✅ Step 2: Dynamic component using both params
export default function DynamicServiceSlugPage() {
  const { web, slug } = useParams(); // /services/web/frontend
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rotRef = useRef<HTMLDivElement | null>(null);

  const mainData = SERVICE_DATA[web as string];
  if (!mainData) return notFound();

  // find specific slug data
  const slugData = mainData.sublinks?.[slug as string];
  if (!slugData) return notFound();

  // orbit animation
  useEffect(() => {
    const container = containerRef.current;
    const rot = rotRef.current;
    if (!container || !rot) return;

    const radius = Math.min(container.clientWidth, container.clientHeight) * 0.38;
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;

    iconsRef.current.forEach((el, idx) => {
      if (!el) return;
      const angle = (idx / iconsRef.current.length) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      gsap.set(el, { x: x - 24, y: y - 24 });
    });

    gsap.to(rot, {
      rotation: 360,
      duration: 24,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    return () => gsap.killTweensOf("*");
  }, [web, slug]);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/scroler/socials-bg-desktop.c0beceae096e8677d45b.webp')`,
      }}
    >
      {/* ================= HEADER SECTION ================= */}
      <section
        className="relative overflow-hidden min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${slugData.bg})` }}
      >
        <div className="relative z-10 w-full">
          <div className="mx-auto px-6 py-16 md:py-24 max-w-7xl">
            <div className="max-w-[90%] p-8 md:p-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 transition duration-500">
              <p className="text-sm font-light uppercase tracking-widest text-white/70 mb-2">
                {mainData.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
                {mainData.title}
              </h1>
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-500 hover:bg-teal-600 shadow-xl transition duration-300 transform hover:scale-[1.03]">
                {mainData.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMAGE SLIDER ================= */}
      <section className="relative w-full flex flex-col justify-between gap-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-10 px-7 shadow-2xl overflow-hidden max-w-7xl mx-auto my-16">
        <div className="flex items-center justify-center w-full">
          <div className="w-[95%] relative flex items-center justify-center">
            {/* Custom Arrows */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center cursor-pointer text-white swiper-prev-custom">
              ❮
            </div>

            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-next-custom",
                prevEl: ".swiper-prev-custom",
              }}
              spaceBetween={30}
              slidesPerView={1}
              loop
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              {slugData.images.map((img: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`Slide ${idx}`}
                    className="w-full h-[340px] object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center cursor-pointer text-white swiper-next-custom">
              ❯
            </div>
          </div>
        </div>

        {/* ================= TEXT + ORBIT ================= */}
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-5 relative md:px-5">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {mainData.descriptionTitle}
            </h2>
            <p className="text-white/80 max-w-xl leading-relaxed">
              {mainData.descriptionText}
            </p>
          </div>

          <div className="relative w-full md:w-1/2 flex items-center justify-end">
            <div
              ref={containerRef}
              className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full flex items-center justify-center overflow-visible"
            >
              <div ref={rotRef} className="absolute inset-0">
                {(slugData.orbitTechs || mainData.orbitTechs || []).map((t: any, i: number) => (

                  <div
                    key={t.id}
                    ref={(el) => {
                      iconsRef.current[i] = el;
                    }}
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center bg-white/80 shadow-lg backdrop-blur-md"
                  >
                    {t.icon}
                  </div>
                ))}
              </div>

              <div className="relative z-20 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center shadow-2xl">
                  <img
                    src="/header/logo.svg"
                    alt="Qutham Logo"
                    className="w-20 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
