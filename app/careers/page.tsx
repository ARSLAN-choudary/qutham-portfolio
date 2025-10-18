/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  const jobs = [
    {
      title: "Frontend Developer (Angular)",
      desc: `We are looking for a passionate Angular Frontend Developer responsible for building dynamic, scalable, and high-performing web interfaces. 
The ideal candidate should have 2–3 years of professional experience developing complex SPAs (Single Page Applications) using Angular 10+.

Key Responsibilities:
- Develop modular, reusable, and efficient front-end components using Angular, TypeScript, and RxJS.
- Collaborate closely with designers and backend developers to translate UI/UX wireframes into functional web applications.
- Implement REST API integrations, lazy loading, and route guards for optimized user experiences.
- Optimize applications for maximum speed and scalability.
- Troubleshoot and debug cross-browser compatibility issues.

Requirements:
- Strong command of TypeScript, Angular CLI, and state management using NgRx.
- Experience with responsive layouts, CSS pre-processors (SASS/SCSS), and component lifecycle management.
- Good understanding of authentication, JWT, and role-based access control.
- Excellent problem-solving skills and attention to detail.`,
    },
    {
      title: "Frontend Developer (React / Next.js)",
      desc: `We're hiring a mid-level React / Next.js Developer to join our fast-paced development team. 
You'll build modern, scalable, and SEO-optimized applications with React, Redux Toolkit, and Next.js. 
Must have 2–3 years of hands-on experience in frontend development using React ecosystem.

Key Responsibilities:
- Create pixel-perfect, responsive UI components using React and Tailwind CSS.
- Work with APIs, handle async data fetching, and manage application state with Redux/RTK Query.
- Implement SSR (Server-Side Rendering) and SSG (Static Site Generation) in Next.js for better performance and SEO.
- Manage dynamic routing, middleware, and API routes in Next.js.
- Work closely with UI/UX designers and backend developers to ensure seamless integration.

Requirements:
- Strong understanding of React hooks, context API, and React Query.
- Experience with Git, code reviews, and agile development environments.
- Familiarity with performance optimization and Lighthouse audits.
- Excellent teamwork and communication skills.`,
    },
    {
      title: "Backend Developer",
      desc: `We are looking for a skilled Backend Developer with 3+ years of experience in building scalable and secure APIs. 
You will work closely with frontend developers to design, implement, and maintain backend logic, databases, and integrations.

Key Responsibilities:
- Design and develop RESTful APIs using Node.js (Express.js) or Laravel.
- Create and manage relational (MySQL/PostgreSQL) and NoSQL (MongoDB) databases.
- Implement authentication, authorization, and role-based access using JWT or Passport.
- Write efficient, maintainable, and testable code following clean architecture principles.
- Optimize server performance and handle large datasets.

Requirements:
- Proficiency in Node.js / Laravel and database query optimization.
- Experience with cloud services (AWS, DigitalOcean) and deployment pipelines.
- Understanding of MVC architecture, version control (Git), and CI/CD tools.
- Strong problem-solving mindset and debugging skills.`,
    },
    {
      title: "Flutter Developer",
      desc: `We are seeking a mid-level Flutter Developer to design and develop beautiful cross-platform mobile applications. 
You should have 2–3 years of experience in Flutter, with a focus on performance optimization and user experience.

Key Responsibilities:
- Develop Android and iOS apps using Flutter and Dart.
- Integrate RESTful APIs, Firebase, and third-party SDKs.
- Implement clean architecture, reusable widgets, and state management (Bloc, Riverpod, or Provider).
- Ensure high performance and smooth animations across all devices.
- Collaborate with designers to match UI/UX expectations.

Requirements:
- Hands-on experience with Firebase Auth, Firestore, and Push Notifications.
- Knowledge of Git, Play Store, and App Store deployment processes.
- Understanding of app lifecycle, navigation, and debugging tools.
- Creative problem solver with strong attention to detail.`,
    },
    {
      title: "Graphic Designer",
      desc: `We are searching for a talented Graphic Designer to produce engaging and on-brand visual materials for a variety of media. 
Candidates should have 2–4 years of experience creating designs for web, print, and social media.

Key Responsibilities:
- Design marketing materials including banners, brochures, posters, and digital ads.
- Develop consistent visual identities and brand guidelines.
- Work on UI mockups, wireframes, and prototypes using Figma or Adobe XD.
- Collaborate with developers to ensure accurate design implementation.
- Stay updated on design trends and digital aesthetics.

Requirements:
- Proficiency in Adobe Photoshop, Illustrator, and Figma.
- Strong sense of layout, typography, and color theory.
- Ability to manage multiple projects under tight deadlines.
- Good communication and presentation skills.`,
    },
    {
      title: "Social Media Marketer",
      desc: `We are looking for a mid-level Social Media Marketer to grow our online presence and create meaningful engagement across multiple platforms. 
Ideal candidates have 2–3 years of experience in social media strategy, content creation, and campaign management.

Key Responsibilities:
- Plan, schedule, and manage daily social media posts across Facebook, Instagram, and LinkedIn.
- Create creative campaigns to improve engagement and reach.
- Monitor insights and optimize content using analytics tools.
- Collaborate with designers and writers for high-quality visuals and captions.
- Stay ahead of algorithm changes and platform trends.

Requirements:
- Strong knowledge of Meta Business Suite, Buffer, or Hootsuite.
- Experience with paid ad campaigns and audience targeting.
- Basic understanding of SEO, email marketing, and content funnels.
- Excellent writing and communication skills.`,
    },
    {
      title: "WordPress Developer",
      desc: `We are seeking a WordPress Developer to design, develop, and maintain responsive websites. 
The ideal candidate should have 2–3 years of experience with custom WordPress development and theme customization.

Key Responsibilities:
- Build and customize WordPress themes using Elementor, ACF, or custom PHP templates.
- Integrate APIs and optimize website speed and performance.
- Implement on-page SEO best practices.
- Manage hosting, backups, and plugin security updates.
- Troubleshoot website issues and ensure smooth deployment.

Requirements:
- Proficient in PHP, HTML, CSS, JavaScript, and jQuery.
- Experience with WooCommerce and custom post types.
- Familiar with cPanel, domain management, and migrations.
- Detail-oriented and able to work independently under minimal supervision.`,
    },
  ];

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const jobSectionRef = useRef<HTMLDivElement | null>(null);

  const handleJobClick = (job: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedJob(job);
    
    // Scroll to top of job details section on mobile
    if (window.innerWidth < 1440) {
      jobSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-[calc(100vh-112px)]">
      {/* ✅ Background Layer */}
      <div className="fixed top-0 left-0 w-full h-full bg-[linear-gradient(180deg,#055912_0.24%,#000_46.06%,#000_99.76%)] -z-10"></div>

      {/* ✅ Layout Container */}
      <div className="w-full flex items-start justify-center gap-[24px] flex-wrap mt-[45px] min-[1440px]:mt-[100px] pb-[100px] px-[12px] min-[1440px]:px-[20px] max-[1440px]:flex-col-reverse max-[1440px]:items-center">
        
        {/* ✅ Main Content - Job Details */}
        <div className="w-[calc(100%-420px)] max-[1440px]:w-full min-[1440px]:bg-[hsla(0,0%,100%,.07)] bg-transparent rounded-[40px] min-h-[400px] p-0 min-[1440px]:p-[20px]">
          <div className="px-0 min-[1440px]:px-[20px] flex items-center flex-col">
            
            {/* ✅ Job Header Card */}
            <div 
              className="bg-[linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,.07))] border border-[hsla(0,0%,100%,.1)] rounded-[24px] h-auto min-h-[100px] py-[13px] px-[12px] w-full flex items-center gap-[12px] max-[640px]:w-full backdrop-blur-[7px]"
              ref={jobSectionRef}
            >
              <div className="bg-[hsla(0,0%,100%,.3)] rounded-full min-h-[74px] w-[74px] p-2 flex-shrink-0">
                <Image
                  src="/qutham-logo.enc"
                  alt="Qutham Logo"
                  width={100}
                  height={100}
                  className="rounded-full h-full w-full object-cover"
                />
              </div>

              {/* ✅ Job Title and Location */}
              <div className="flex flex-col items-start text-center max-[640px]:items-center max-[640px]:w-full">
                <p className="text-[20px] font-semibold text-white">
                  {selectedJob.title}
                </p>
                <div className="flex items-center gap-1.5 max-[640px]:justify-center mt-1">
                  <Image
                    src="/location-icon.svg"
                    alt="Location"
                    width={12}
                    height={12}
                    className="w-[12px] h-[12px]"
                  />
                  <span className="text-white text-[12px]">Bahawalpur</span>
                </div>
              </div>
            </div>

            {/* ✅ Job Description */}
            <div className="mt-[14px] py-[14px] px-[18px] text-white bg-[hsla(0,0%,100%,.06)] w-full rounded-[20px]">
              <p className="text-center text-white text-[16px] font-semibold p-[10px] border-b border-white/30">
                Job Description & Requirements
              </p>
              <div className="whitespace-pre-line text-[15px] leading-relaxed p-[12px]">
                {selectedJob.desc}
              </div>
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex items-center gap-[12px] my-[24px] w-full max-[640px]:flex-col">
              <Link
                href="/contact?from=careers"
                className="block w-full"
              >
                <button className="bg-[linear-gradient(90deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.1)_54.16%,hsla(0,0%,100%,.06))] border border-[hsla(0,0%,100%,.1)] min-h-[58px] rounded-[24px] w-full text-white font-medium cursor-pointer text-[18px] font-semibold py-[15px] hover:bg-[hsla(0,0%,100%,.1)] transition-all duration-200">
                  Apply Now
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* ✅ Sidebar - Job List */}
        <div className="w-[384px] max-[1440px]:w-full bg-[hsla(0,0%,100%,.1)] border border-[hsla(0,0%,100%,.2)] rounded-[32px] overflow-hidden max-[1440px]:mt-[40px]">
          
          {/* ✅ Sidebar Header with Search */}
          <div className="flex items-center justify-between bg-[hsla(0,0%,100%,.05)] text-white px-[24px] pt-[24px] pb-[18px]">
            <p className="text-[16px] font-semibold">Open Positions</p>

            <div className="relative flex items-center">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative cursor-pointer p-1 hover:bg-[hsla(0,0%,100%,.1)] rounded-full transition-colors"
              >
                <Image
                  width={20}
                  height={20}
                  src="/header/search.svg"
                  alt="Search Jobs"
                />
              </button>

              {/* ✅ Search Input */}
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`ml-2 text-white text-[14px] bg-[hsla(0,0%,100%,.08)] border border-[hsla(0,0%,100%,.2)] rounded-[20px] px-3 py-2 transition-all duration-300 ease-in-out placeholder-white/60 ${
                  searchOpen
                    ? "opacity-100 w-[160px] visible"
                    : "opacity-0 w-0 overflow-hidden"
                }`}
              />
            </div>
          </div>

          {/* ✅ Job List */}
          <div className="px-[12px] pb-[12px] flex flex-col items-center gap-[10px] mt-[14px] max-h-[500px] overflow-y-auto">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handleJobClick(job, e)}
                  className={`rounded-[100px] h-[74px] py-[19px] pl-[16px] pr-[8px] w-full border text-[14px] font-medium text-white flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedJob.title === job.title
                      ? "bg-[hsla(0,0%,100%,.15)] border-[hsla(0,0%,100%,.3)] shadow-lg"
                      : "bg-[rgba(0,0,0,.4)] border-[hsla(0,0%,100%,.2)] hover:bg-[rgba(255,255,255,.1)] hover:border-[hsla(0,0%,100%,.3)]"
                  }`}
                >
                  <span className="text-center px-2">{job.title}</span>
                </div>
              ))
            ) : (
              <div className="text-white text-[14px] opacity-60 py-8 text-center">
                No jobs found matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* ✅ Jobs Count */}
          <div className="px-[24px] py-[16px] border-t border-[hsla(0,0%,100%,.1)]">
            <p className="text-white/70 text-[12px] text-center">
              Showing {filteredJobs.length} of {jobs.length} positions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}