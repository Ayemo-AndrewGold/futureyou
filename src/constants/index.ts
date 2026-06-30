/* =========================
   IMAGE & ICON IMPORTS
========================= */


import {
  LoanImage,
  coachingMentorship,
  matchedCoach,
  whereHeaded,
  applyRealSupport,
  danielImg,
  shareStory,
  earnFuture,
  fatimaImage,
  blog1,
  blog2,
  blog3,
  fatimaImg,
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
  journeyIcon4,
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
  { href: "/startjourney", label: "Apply for Loan" },
  { href: "/coaching", label: "Coaching & Consulting" },
  { href: "/aboutus", label: "About Us" },
  { href: "/career", label: "Career" },
];

/* =========================
   COACH CARDS
========================= */

export const coachCards = [
  {
    id: "loan",
    title: "Loan and Business Support",
    text: "Get access to capital, tools, and investor connections.",
    img: loanImg,
    label: "Loan",
  },
  {
    id: "mentorship",
    title: "Coaching & Mentorship",
    text: "Be matched with a coach who understands your journey.",
    img: mentorship,
    label: "Mentorship",
  },
  {
    id: "growth",
    title: "Growth Programs",
    text: "Expert-led programs designed to accelerate growth.",
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
    title: "Underfunded → Financially Empowered",
    text: "Access soft loans, investor tools, and expert coaching.",
  },
  {
    id: 2,
    img: joblessEmp,
    title: "Jobless → Employed",
    text: "Find clarity, build skills, and land the right job.",
  },
  {
    id: 3,
    img: empSelfEmp,
    title: "Employed → Self-Employed",
    text: "Start and grow your own business with support.",
  },
  {
    id: 4,
    img: addictRestored,
    title: "Addiction → Restored",
    text: "Healing, accountability, and dignity for a new start.",
  },
  {
    id: 5,
    img: ideaInvest,
    title: "Idea → Investor-Ready Startup",
    text: "Validate ideas and meet the right investors.",
  },
  {
    id: 6,
    img: singMarried,
    title: "Personal Growth & Relationships",
    text: "Build emotional and relational maturity.",
  },
];

/* =========================
   START JOURNEY CARDS (FIXED)
========================= */

export const StartJourneyCards = [
  {
    id: "loan",
    img: journeyIcon1,
    title: "Loan & Business Support",
    text: "loans, grants, and coaching to grow your business.",
    pathUpClose: "/path-up-close-business",
  },
  {
    id: "growth",
    img: leafIcon,
    title: "Personal Growth",
    text: "Heal, grow, and become your best self.",
    pathUpClose: "/path-up-close-growth",
  },
  {
    id: "recovery",
    img: journeyIcon3,
    title: "Special Recovery",
    text: "Deep coaching and healing support.",
    pathUpClose: "/path-up-close-recovery",
  },
  {
    id: "career",
    img: journeyIcon4,
    title: "Career Change",
    text: "Gain clarity and new career direction.",
    pathUpClose: "/path-up-close-career",
  },
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
    title: 'Choose Where You’re Headed',
    text: 'Whether you’re looking to rediscover your purpose, grow your business, break out of survival mode, or rewrite your life story entirely, the first step is choosing the path that reflects where you are and where you want to go.',
    
  },
  {
    id: 2,
    img: shareStory,
    title: ' Share Your Story',
    text: 'Take a few moments to tell us about yourself, where you are right now, what challenges you’re facing, and where you hope to be. This simple form helps us understand your story, so we can connect you with the right coach, the right tools, and the right opportunities tailored to your journey.',
    
  },
  {
    id: 3,
    img: matchedCoach,
    title: 'Get Matched with a Coach',
    text: 'You won’t walk this journey alone. From the moment you sign up, you’ll be matched with a dedicated coach or mentor who understands your background, your struggles, and your vision.',
    
  },
  {
    id: 4,
    img: applyRealSupport,
    title: 'Apply for Real Support',
    text: 'As you move through your journey completing coaching sessions, hitting personal milestones, or progressing through your learning path you begin to unlock real financial opportunities. Whether it’s a low-interest transformation loan, a small grant to support your recovery or startup.',
    
  },
  {
    id: 5,
    img: earnFuture,
    title: 'Earn Your Future You Badge',
    text: 'At the end of your journey, you won’t just walk away with new knowledge or funding you’ll emerge with a deeper sense of identity, purpose, and direction. You’ll receive a personalized ‘Future You’ certification that validates your growth, your resilience, and your commitment to change.',
    
  },
]

export const WhyWeExistCard = [

   {
    id: 1,
    img : ExistIcon,
    text: 'To guide people through intentional transformation with truth, clarity, and consistent support.',

  },
 
  {
    id: 2,
    img : ExistIcon,
    text: 'A world where people don’t stay stuck in their past, but rise into purpose',

  },

  {
    id: 3,
    img: ExistIcon,
    text: 'We will walk with you — from wherever you are to who you’re meant to be',
  },
]

export const CommunityCards = [
  {
    img: whereHeaded,
    title: 'Choose Where You’re Headed',
    text: 'Our community isn’t just about conversation. It’s about accountability, encouragement, and honest connection. Whether you’re overcoming personal challenges or scaling your startup, you’re never doing it alone',
    
  },
  {
    img: shareStory,
    title: ' Share Your Story',
    text: 'These milestones highlight years of commitment to academic support, collaborative research, technical exhibitions, leadership development, and social impact. Whether it’s awards won, partnerships formed, or departments united under one banner, we are more than an association we are a force shaping the future of Development',

  },
  {
    img: matchedCoach,
    title: 'Get Matched with a Coach',
    text: 'As we continue to break new ground, these numbers will only grow and so will our legacy',
    
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
    title: 'Guidance Weekly coaching, clear steps',
    text: 'Transformation begins with direction. Through weekly coaching sessions and structured pathways, you’ll never have to wonder what to do next. We break big goals into small, achievable steps and walk with you as you take each one',
    
  },
  {
    id: 2,
    img: shareStory,
    title: ' Support A real coach, real people, real conversations',
    text: 'You’re not doing this alone. Whether you’re recovering, rebuilding, or starting fresh, you’ll have someone in your corner a coach who listens, a community that gets it, and spaces where your voice matters. Transformation needs truth, and truth needs trust.',
    
  },
  {
    id: 3,
    img: matchedCoach,
    title: 'Get Matched with a Coach',
    text: 'You won’t walk this journey alone. From the moment you sign up, you’ll be matched with a dedicated coach or mentor who understands your background, your struggles, and your vision.',
    
  },
]