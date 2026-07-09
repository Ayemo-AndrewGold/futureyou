/* =========================
   IMAGE & ICON IMPORTS
========================= */


import {
  matchedCoach,
  whereHeaded,
  applyRealSupport,
  shareStory,
  earnFuture,
  fatimaImage,
  blog1,
  blog2,
  blog3,
  ucheImg,
  chrisImg,
  loanImg,
  mentorship,
  growth,

} from "../assets/images";

import {
  addictRestored,
  empSelfEmp,
  finEmpowered,
  ideaInvest,
  joblessEmp,
  singMarried,
  blogArrow,
  journeyIcon1,
  journeyIcon3,
  dayPress,
  weeklyPress,
  monthlyPress,
  leafIcon,
  ExistIcon,
} from "../assets/icons";

/* =========================
   NAVIGATION
========================= */

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/startjourney", label: "Services" },
  // { href: "/coaching", label: "Coaching" },
  { href: "/blog", label: "Blog" },
  { href: "/aboutus", label: "About" },
  { href: "/contactus", label: "Contact" },
  { href: "/career", label: "Careers" },
];

/* =========================
   COACH CARDS
========================= */

export const coachCards = [
  {
    id: "Coaching",
    title: "COACHING",
    text: "Personalized guidance to help individuals and leaders unlock their full potential.",
    img: loanImg,
    label: "Loan",
  },
  {
    id: "Consulting",
    title: "CONSULTING",
    text: "Practical business strategies that drive growth, efficiency, and long-term success.",
    img: mentorship,
    label: "Mentorship",
  },
  {
    id: "Growth Capital",
    title: "GROWTH CAPITAL",
    text: "Flexible funding designed to help businesses grow with confidence.",
    img: growth,
    label: "Growth Support",
  },
];

/* =========================
   TRANSFORMATION CARDS
========================= */

export const transformCards = [
  {
    id: 1,
    img: finEmpowered,
    title: "Business Growth → Financial Success",
    text: "Access strategic coaching, business consulting, and growth capital to expand your business with confidence",
  },
  {
    id: 2,
    img: joblessEmp,
    title: "Jobless → Employed",
    text: "Discover your strengths, build career-ready skills, and prepare for meaningful employment opportunities.",
  },
  {
    id: 3,
    img: empSelfEmp,
    title: "Employed → Self-Employed",
    text: "Turn your expertise into a thriving business with mentorship, strategic planning, and funding support.",
  },
  {
    id: 4,
    img: addictRestored,
    title: "Stuck → Purpose-Driven",
    text: "Overcome personal barriers, gain clarity, and move forward with confidence through transformational coaching.",
  },
  {
    id: 5,
    img: ideaInvest,
    title: "Idea → Investor-Ready Startup",
    text: "Refine your business idea, build a scalable model, and prepare to attract funding and investment opportunities.",
  },
  {
    id: 6,
    img: singMarried,
    title: "Potential → Purpose",
    text: "Develop the mindset, leadership, and confidence needed to create meaningful impact in every area of life.",
  },
];

/* =========================
   START JOURNEY CARDS (FIXED)
========================= */

export const StartJourneyCards = [
  {
    id: "loan",
    img: journeyIcon1,
    title: "Coaching",
    text: "Build confidence, gain clarity, and unlock your full potential through personalized coaching and mentorship.",
    pathUpClose: "/path-up-close-business",
  },
  {
    id: "growth",
    img: leafIcon,
    title: "Growth Capital",
    text: "Access flexible funding designed to help individuals and businesses implement their next stage of growth.",
    pathUpClose: "/path-up-close-growth",
  },
  {
    id: "recovery",
    img: journeyIcon3,
    title: "Transformation Pathways",
    text: "Explore tailored pathways for career growth, entrepreneurship, leadership, and personal transformation.",
    pathUpClose: "/path-up-close-recovery",
  },
  // {
  //   id: "career",
  //   img: journeyIcon4,
  //   title: "Career Change",
  //   text: "Gain clarity and new career direction.",
  //   pathUpClose: "/path-up-close-career",
  // },
];

/* =========================
   TESTIMONIALS (NORMALIZED)
========================= */

export const TestimonialCards = [
  {
    id: 1,
    img: chrisImg,
    name: "Chris J",
    title: "Mental Wellness Advocate",
    text: "Future You gave me purpose beyond recovery.",
  },
  {
    id: 2,
    img: fatimaImage,
    name: "Daniel",
    title: "Husband & Father",
    text: "Healing changed how I lead my home.",
  },
  {
    id: 3,
    img: fatimaImage,
    name: "Fatima",
    title: "Business Owner",
    text: "Future You saw beyond my past.",
  },
  {
    id: 4,
    img: ucheImg,
    name: "Uche",
    title: "Retail Brand Founder",
    text: "From market seller to brand owner.",
  },
];

/* =========================
   SUBSCRIPTION PLANS
========================= */

export const subscriptionPlanCard = [
  {
    id: 1,
    img: dayPress,
    amount: "₦5,000 / day",
    title: "Day Pass",
    text: "Perfect for drop-ins.",
    label: "Book Now",
    bgcolor: "bg-[#293C97]",
  },
  {
    id: 2,
    img: weeklyPress,
    amount: "₦20,000 / week",
    title: "Weekly Pass",
    text: "Ideal for focused work weeks.",
    label: "Book Now",
    bgcolor: "bg-[#428FCD]",
  },
  {
    id: 3,
    img: monthlyPress,
    amount: "₦60,000 / month",
    title: "Monthly Pass",
    text: "Best for consistent productivity.",
    label: "Book Now",
    bgcolor: "bg-[#D2C28B]",
  },
];


export const FutureYouJourneyCards = [
  {
    id: 1,
    img: whereHeaded,
    title: 'Choose Your Transformation Path',
    text: "Select the journey that best matches your goals whether it's personal growth, career advancement, business expansion, or access to growth capital.",
    
  },
  {
    id: 2,
    img: shareStory,
    title: ' Share Your Story',
    text: "Tell us about your current situation, your goals, and the challenges you're facing. This helps us understand your needs and create the best path forward.",
    
  },
  {
    id: 3,
    img: matchedCoach,
    title: 'Get Matched with a Coach',
    text: "You'll be paired with the right coach, consultant, or mentor who will guide you with personalized support throughout your transformation journey.",
    
  },
  {
    id: 4,
    img: applyRealSupport,
    title: 'Access the Right Support',
    text: "As you make progress, you'll gain access to the services that best fit your needs from expert consulting and coaching to growth capital, funding opportunities, and strategic business support.",
    
  },
  {
    id: 5,
    img: earnFuture,
    title: 'Become Your Future You',
    text: "Complete your journey with greater confidence, stronger skills, clearer direction, and the recognition of your growth. Your transformation doesn't end here it becomes the foundation for your future.",
  },
]

export const WhyWeExistCard = [

   {
    id: 1,
    img : ExistIcon,
    text: 'To empower individuals and businesses with the clarity, strategy, and support they need to become the best version of themselves.',

  },
 
  {
    id: 2,
    img : ExistIcon,
    text: 'To build a future where people, businesses, and communities thrive through purposeful growth and lasting transformation.',

  },

  {
    id: 3,
    img: ExistIcon,
    text: 'We\'ll walk alongside you with expert guidance, practical solutions, and unwavering support every step of your transformation journey.',
  },
]

export const CommunityCards = [
  {
    img: whereHeaded,
    title: 'Choose Where You’re Headed',
    text: "Through meaningful connections, mentorship, coaching sessions, networking opportunities, and shared experiences, you'll find the encouragement, accountability, and practical support needed to keep moving forward. Whether you're building a business, advancing your career, or pursuing personal growth, you'll always have a community walking beside you.",
    
  },
  {
    img: shareStory,
    title: ' Share Your Story',
    text: "Every success story strengthens our community. Every milestone inspires someone else to begin their own journey. Together, we're creating a network of people who are transforming their lives, building stronger businesses, and making lasting impact in their communities.",

  },
  {
    img: matchedCoach,
    title: 'Get Matched with a Coach',
    text: "Every success story strengthens our community. Every milestone inspires someone else to begin their own journey. Together, we're creating a network of people who are transforming their lives, building stronger businesses, and making lasting impact in their communities.",
    
  },
]

export const CommunityStatistics = [
    { value: ' ', label: 'Transformation Journeys Started' },
    { value: '', label: 'Certifications Earned' },
    { value: '', label: 'Disbursed In Loans & Grants' },
];

export const BlogCards = [
  {
    id: 1,
    img: blog1,
    icon: blogArrow,
    title: 'From Rock Bottom to Purpose: Blessing’s Path to Emotional Healing',
    text: 'How one coaching session helped her rewrite her narrative and rebuild with clarity...',
    date: '10 April 2025',
     link: '/blog/self-sabotage'

  },
  {
    id: 2,
    img: blog2,
    icon: blogArrow,
    title: 'How Uche Went from Hustler to Investor-Ready in 90 Days',
    text: 'This solopreneur got matched with a coach, structured his hustle, and secured ₦1.5M in growth capital....',
    date: '10 April 2025',
    link: '/blog/build-confidence'
  },
  {
    id: 3,
    img: blog3,
    icon: blogArrow,
    title: 'Stuck in a Job You Hate? Here’s How to Start Your Career Reset',
    text: 'Practical steps to move from frustration to fulfillment from someone who’s done and achieved peace....',
    date: '10 April 2025',
    link: '/blog/overthinking'
  },
]

export const USER_MANAGEMENT_TEXT = {
  title: "User Management",
  totalUsersLabel: "Total Users",
  dateRangeLabel: "Date range: last 30 days",
  sortByLabel: "Sort by",
  userListLabel: "User List",
  tableHeaders: [
    "Name",
    "Email",
    "Journey Path",
    "Loan Status",
    "Status",
    "Details"
  ]
};

export const sampleLoans = [
  {
    name: "Fatima Yusuf",
    email: "fatima@gmail.com",
    profilePic: "https://via.placeholder.com/150",
    loanType: "Business Starter Loan",
    status: "Pending",
    dateSubmitted: "June 12, 2025",
    purpose: "To scale up my tailoring business.",
    duration: "6 months",
    interestRate: "5% flat",
    firstRepayment: "July 15, 2025",
    amount: "₦250,000",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    profilePic: "https://via.placeholder.com/150",
    loanType: "Personal Loan",
    status: "Approved",
    dateSubmitted: "May 1, 2025",
    purpose: "To renovate my house.",
    duration: "12 months",
    interestRate: "7% flat",
    firstRepayment: "June 1, 2025",
    amount: "₦500,000",
  },
];

export const adminNotifications = [
  {
    message: "5 new users have registered today",
    date: "Friday 3:12 PM",
    timeAgo: "2 hours ago",
    link: "#",
    actionText: "View Users",
  },
  {
    message: "You have 10 pending loans to approve",
    date: "Friday 3:29 PM",
    timeAgo: "1 hour ago",
    link: "#",
    actionText: "View Orders",
  },
  {
    message: "12 new loans have been placed.",
    date: "Friday 4:05 PM",
    timeAgo: "15 minutes ago",
    link: "#",
    actionText: "View Loans",
  },
  {
    message: "System update notification",
    date: "Friday 6:40 PM",
    timeAgo: "Available now",
    link: "#",
    actionText: "View Update",
  },
];

export const AboutUsHelpTransform = [
  {
    id: 1,
    img: whereHeaded,
    title: 'Coaching',
    text: 'Gain clarity, build confidence, and achieve your goals through one-on-one coaching tailored to your journey.',
    
  },
  {
    id: 2,
    img: shareStory,
    title: 'Consulting',
    text: 'Strategic business, financial, and HR consulting designed to help you make better decisions and scale effectively.'
  },
  {
    id: 3,
    img: matchedCoach,
    title: 'Growth Capital',
    text: 'Access flexible funding solutions that help you implement your plans and accelerate sustainable growth.',
    
  },
]