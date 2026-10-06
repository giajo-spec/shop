import type { Dictionary } from "./fr";

/** English content (secondary language). Must mirror the French structure. */
const en: Dictionary = {
  meta: {
    siteName: "Nexora Digital",
    titleTemplate: "%s | Nexora Digital",
    defaultTitle: "Nexora Digital — Web Design & SEO Agency in Montreal",
    defaultDescription:
      "Montreal digital agency: custom websites, SEO and Google review management for businesses that want to win more clients online.",
    ogTagline: "Your digital presence. Engineered to grow.",
  },

  nav: {
    skip: "Skip to content",
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    faq: "FAQ",
    quote: "Request a quote",
    consultation: "Book a consultation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
    switchTo: "Version française",
    mainNav: "Main navigation",
    servicesMenu: {
      websites: { label: "Web design", hint: "Custom, fast, built to convert" },
      seo: { label: "SEO", hint: "More visibility, more qualified traffic" },
      reviews: { label: "Google Reviews", hint: "A reputation people trust" },
      all: "All services",
    },
  },

  common: {
    getQuote: "Get a tailored quote",
    requestQuote: "Request a quote",
    bookConsultation: "Book a consultation",
    talkToExpert: "Talk to an expert",
    seeServices: "See our services",
    discoverServices: "Explore our services",
    learnMore: "Learn more",
    viewProject: "View project",
    visitSite: "Visit website",
    backToPortfolio: "Back to portfolio",
    viewPortfolio: "View portfolio",
    allFaq: "All questions",
    prototype: "Prototype",
    illustration: "Illustration",
    screenshotPlaceholder: "Screenshot to be provided",
    monthly: "Monthly subscription",
    breadcrumb: "Breadcrumb",
    nextProject: "Next project",
    included: "Included",
  },

  services: {
    websites: {
      index: "01",
      name: "Web design",
      title: "Websites that build trust and bring in leads.",
      short: "Custom, fast websites designed to turn visitors into clients — on every screen.",
      cta: "Build my website",
      features: [
        { title: "Custom design", text: "An art direction crafted for your brand — never a recycled template." },
        { title: "Responsive", text: "A flawless experience on mobile, tablet and desktop." },
        { title: "Performance", text: "Lightweight pages that load fast and pass Core Web Vitals." },
        { title: "Technical SEO", text: "Structure, markup and metadata optimized from day one." },
        { title: "Conversion", text: "Journeys, calls to action and trust signals exactly where they matter." },
        { title: "Forms", text: "Clear, validated forms connected to the tools you already use." },
        { title: "Integrations", text: "Booking, CRM, analytics, newsletter — your site fits your stack." },
        { title: "Optional maintenance", text: "Updates, security and ongoing improvements, whenever you need them." },
      ],
    },
    seo: {
      index: "02",
      name: "SEO",
      title: "Get found at the exact moment clients are looking.",
      short: "We grow your Google visibility to attract qualified traffic — in Québec and around the world.",
      cta: "Boost my visibility",
      features: [
        { title: "Technical SEO", text: "Indexing, speed, structure — we remove what holds your site back." },
        { title: "Content optimization", text: "Pages that genuinely answer your customers’ questions." },
        { title: "Keyword research", text: "The searches that lead to inquiries, not just visits." },
        { title: "Local SEO", text: "Google Business Profile and local presence in Montreal and beyond." },
        { title: "SEO strategy", text: "A clear roadmap, prioritized by growth potential." },
        { title: "Performance tracking", text: "Rankings, traffic and conversions, measured and explained in plain language." },
      ],
    },
    reviews: {
      index: "03",
      name: "Google Review Management",
      title: "Turn happy customers into visible trust.",
      short: "A monthly subscription to earn more genuine reviews, reply with care and keep track of your reputation.",
      cta: "Strengthen my reputation",
      features: [
        { title: "Professional replies", text: "Every review gets a thoughtful response — positive or not." },
        { title: "Custom QR codes", text: "Customers leave a review in seconds, on site or after the service." },
        { title: "Monthly report", text: "Review volume, rating and trends — your reputation, tracked every month." },
        { title: "Effortless review requests", text: "Clear invitations sent to every customer, without exception." },
        { title: "Review monitoring", text: "Know what people say about your business, as soon as they say it." },
        { title: "More conversions", text: "A strong reputation helps future customers choose you." },
      ],
    },
  },

  home: {
    meta: {
      title: "Web Design, SEO & Google Reviews Agency in Montreal",
      description:
        "Nexora Digital builds high-performing websites, grows your Google visibility and helps you earn a strong online reputation. Digital agency based in Montreal.",
    },
    hero: {
      eyebrow: "Digital agency — Montreal, Québec",
      titleStart: "Your digital presence.",
      titleAccent: "Engineered",
      titleEnd: "to grow.",
      lead:
        "Nexora Digital crafts high-performing websites, sharpens your visibility on Google and helps you build an online reputation that matches the quality of your business.",
      points: ["Custom websites", "SEO", "Google Reviews"],
    },
    visual: {
      url: "your-business.com",
      heading: "Your business, elevated.",
      visibility: "Google visibility",
      reviews: "Google Reviews",
      performance: "Performance",
      leads: "New inquiries",
      leadName: "Quote request",
      leadMeta: "Website form · just now",
    },
    marquee: ["Custom websites", "SEO", "Google Reviews", "Online reputation", "Performance", "Conversion", "Montreal", "Worldwide"],
    problems: {
      eyebrow: "The reality",
      title: "Your business deserves a better digital presence.",
      lead: "You deliver great work. Online, though, nothing shows it. Sound familiar?",
      items: [
        { title: "An outdated website", text: "It no longer reflects your business — and quietly turns away visitors who could have become clients." },
        { title: "Low Google visibility", text: "Prospects search for what you do… and find your competitors instead." },
        { title: "Few leads from the web", text: "Your site exists, but it doesn’t bring in calls or quote requests." },
        { title: "Few or poor Google reviews", text: "Without recent, well-managed reviews, trust is hard to earn." },
        { title: "A brand that undersells you", text: "The quality of your work doesn’t come through in your online image." },
        { title: "Competitors who rank higher", text: "They’re not necessarily better. They’re simply easier to find." },
      ],
      conclusion: "Every one of these problems has a solution. We tackle them together, methodically.",
    },
    services: {
      eyebrow: "What we do",
      title: "Three levers. One goal: your growth.",
      lead:
        "A website that converts, visibility that attracts, a reputation that reassures. Each service is powerful on its own — and even stronger together.",
    },
    reviews: {
      eyebrow: "Google Reviews",
      title: "Before they call you, customers read your reviews.",
      lead:
        "Your Google listing is often the very first contact with your business. Plenty of recent reviews, paired with thoughtful replies, make all the difference when people decide.",
      points: [
        { title: "Trust is decided in seconds", text: "Reviews are the most visible social proof on your Google listing." },
        { title: "Every reply is public", text: "How you respond shows everyone how you treat your customers." },
        { title: "Consistency matters", text: "A steady flow of recent reviews signals an active, well-loved business." },
      ],
      ethics: "100% genuine: no fake reviews, no paid reviews, no customer filtering.",
      dashboard: {
        title: "Reputation — monthly view",
        rating: "Average rating",
        newReviews: "New reviews",
        responseRate: "Response rate",
        recent: "Recent reviews",
        replied: "Replied",
        trend: "Trend",
      },
    },
    process: {
      eyebrow: "Our method",
      title: "From idea to impact.",
      lead: "A clear process, defined milestones and a single point of contact from the first call to launch — and beyond.",
    },
    why: {
      eyebrow: "Why Nexora",
      title: "The craft of a studio. The rigor of a results-driven team.",
      lead:
        "We bring design, technology and strategy together to build an online presence with a purpose: bringing you clients.",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Projects built to a higher standard.",
      lead: "A look at our recent work. Every project is shaped around its market, its customers and its goals.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "You have questions. We have straight answers.",
    },
  },

  process: [
    { title: "Discovery", text: "We get to know your business, your customers, your goals and what sets you apart." },
    { title: "Strategy", text: "We define the structure, messaging, keywords and priorities that serve your goals." },
    { title: "Design", text: "We craft a distinctive visual experience, reviewed with you at every key milestone." },
    { title: "Development", text: "We build a fast, accessible, search-optimized site, tested on every device." },
    { title: "Launch & Growth", text: "We go live, measure results and keep improving." },
  ],

  why: [
    { title: "Premium design", text: "Every interface is designed for your brand. The level of finish is part of the message." },
    { title: "Tailored approach", text: "No one-size-fits-all package: we start from your reality, your market and your resources." },
    { title: "Performance", text: "Lean code, optimized images, fast load times. Speed is a feature." },
    { title: "SEO built in", text: "Search is planned into the site architecture — not bolted on afterwards." },
    { title: "Conversion-focused", text: "Every section has a job: inform, reassure or prompt action." },
    { title: "Ongoing support", text: "A dedicated contact, clear explanations and follow-up after launch." },
    { title: "Built for SMBs", text: "Solutions sized to your ambitions, your budget and your team." },
  ],

  cta: {
    eyebrow: "Let’s talk",
    title: "Ready to turn your online presence into a real growth engine?",
    lead: "Tell us about your project. We’ll come back with a clear recommendation and a tailored quote.",
  },

  pages: {
    services: {
      meta: {
        title: "Services — Websites, SEO & Google Reviews",
        description:
          "Web design, SEO and Google review management: see how Nexora Digital helps businesses in Montreal and beyond attract more clients.",
      },
      eyebrow: "Services",
      title: "Everything it takes to be chosen online.",
      lead: "Get found, earn trust, win the client. Our three services cover every step of your future customers’ journey.",
      combinedTitle: "Stronger together.",
      combinedText:
        "A beautiful site nobody finds stays invisible. Great visibility without reviews struggles to convince. We can handle the whole picture so each lever amplifies the others.",
    },
    websites: {
      meta: {
        title: "Web Design in Montreal",
        description:
          "Custom web design in Montreal: tailored design, performance, technical SEO and conversion. Get a tailored quote for your business website.",
      },
      eyebrow: "Web design",
      title: "Web design in Montreal, built to convert.",
      lead:
        "We design fast, elegant, easy-to-use websites that make people want to reach out. For businesses in Québec and beyond.",
      includedTitle: "What every Nexora website includes",
      includedLead: "Every project is tailored to your needs. These are the foundations we bring to each one.",
      approachTitle: "How we design your website",
      approach: [
        { title: "Understand your customers", text: "We pin down what your visitors are looking for and what will convince them to contact you." },
        { title: "Structure the content", text: "Site map, key messages and calls to action — before a single pixel." },
        { title: "Design the experience", text: "High-fidelity mockups for desktop and mobile, reviewed with you." },
        { title: "Build and optimize", text: "Modern code with performance, accessibility and technical SEO built in." },
      ],
      outcomesTitle: "A great fit if you want to…",
      outcomes: [
        "replace an aging website that no longer represents you;",
        "launch a new business with a credible image from day one;",
        "get more quote requests through your website;",
        "offer an impeccable mobile experience;",
        "grow your site as your business grows.",
      ],
      faqTitle: "Web design questions",
    },
    seo: {
      meta: {
        title: "SEO in Montreal — Search Optimization for SMBs",
        description:
          "Montreal SEO agency: technical SEO, content, keyword research and local SEO to help businesses grow their Google visibility and attract qualified traffic.",
      },
      eyebrow: "SEO",
      title: "SEO in Montreal: get found by the right clients.",
      lead:
        "We grow your Google visibility sustainably, with a transparent approach and clear priorities. No unrealistic promises — just methodical work.",
      includedTitle: "Our approach to search",
      includedLead: "End-to-end work, from technical foundations to content, for results that last.",
      approachTitle: "How we handle your SEO",
      approach: [
        { title: "Audit", text: "Technical review, existing content, competitors and keyword opportunities." },
        { title: "Roadmap", text: "Actions prioritized by potential impact and effort." },
        { title: "Optimization", text: "Technical fixes, content, internal linking and local SEO." },
        { title: "Measurement", text: "Rankings, traffic and inquiries tracked in a report you’ll actually understand." },
      ],
      outcomesTitle: "SEO is for you if…",
      outcomes: [
        "your customers search on Google before they buy;",
        "competitors show up ahead of you in search results;",
        "you want to rely less on paid advertising;",
        "you target Montreal, Québec or international markets;",
        "you’re after sustainable growth, not a quick spike.",
      ],
      faqTitle: "SEO questions",
      visualQuery: "your service in Montreal",
      visualYou: "Your business",
    },
    reviews: {
      meta: {
        title: "Google Review Management for Businesses",
        description:
          "Monthly Google review management: professional replies, QR codes and a monthly report. 100% genuine reviews to build lasting trust.",
      },
      eyebrow: "Google Review Management",
      title: "Google review management: a reputation people trust.",
      lead:
        "A monthly subscription that makes asking for reviews effortless, answers each one professionally and tracks how your reputation evolves — without ever compromising authenticity.",
      includedTitle: "What the subscription includes",
      includedLead: "Three pillars, handled for you every month.",
      subscription: [
        {
          title: "Professional review replies",
          text: "We write personalized replies in your brand’s voice — to glowing reviews and critical ones alike.",
        },
        {
          title: "QR codes to request reviews",
          text: "QR codes for your counter, invoices or business cards make leaving a review quick and easy for every customer.",
        },
        {
          title: "Monthly tracking report",
          text: "A clear monthly report: new reviews, rating trends, recurring themes and recommendations.",
        },
      ],
      benefitsTitle: "What it changes for your business",
      approachTitle: "How the subscription works",
      approach: [
        { title: "Setup", text: "We review your Google listing, define your reply tone and create your QR codes." },
        { title: "Invitation", text: "Customers are simply invited to share their experience, whatever it was." },
        { title: "Replies", text: "Every new review gets a professional reply, promptly." },
        { title: "Report", text: "A monthly summary to track your reputation and fine-tune the approach." },
      ],
      ethicsEyebrow: "Our commitment",
      ethicsTitle: "A strong reputation is built on genuine reviews.",
      ethicsLead:
        "We follow Google’s policies and respect your customers’ trust. Our job is to make honest reviews easier — never to manufacture them.",
      ethics: [
        "No fake reviews. Ever.",
        "No paid reviews, and no reviews traded for incentives.",
        "No filtering: every customer can leave a review, happy or not.",
        "Honest, respectful replies — including to criticism.",
      ],
      outcomesTitle: "For businesses that want to…",
      outcomes: [
        "earn more reviews from real customers;",
        "never leave a review unanswered again;",
        "show professionalism in every public interaction;",
        "keep an eye on their reputation without spending hours on it;",
        "turn more Google listing visitors into customers.",
      ],
      faqTitle: "Google review questions",
    },
    about: {
      meta: {
        title: "About — Digital Agency in Montreal",
        description:
          "Nexora Digital is a Montreal digital agency bringing together design, technology, strategy and growth to help businesses succeed online.",
      },
      eyebrow: "About",
      title: "We build online presences with a purpose.",
      lead:
        "Nexora Digital is a digital agency based in Montreal. Our belief is simple: a website, a Google listing or an SEO strategy only has value if it helps the business behind it grow.",
      storyTitle: "Our story",
      story: [
        "Too many remarkable businesses are poorly represented online. Their expertise is real and their customers are happy — but their website, visibility and digital reputation don’t show it.",
        "Nexora Digital was created to close that gap. We bring design craft, technical rigor and strategic thinking together in one team, so small and mid-sized businesses can benefit from the standards usually reserved for major brands.",
        "We work with businesses in every industry — in Montreal, across Québec and internationally. What they share: the drive to grow, and the will to do it right.",
      ],
      pillarsTitle: "Four disciplines, one team.",
      pillars: [
        { title: "Design", text: "Elegant, clear, memorable interfaces that elevate how your brand is perceived." },
        { title: "Technology", text: "Modern, fast, secure websites that are easy to evolve." },
        { title: "Strategy", text: "Every decision starts from your goals, your market and your customers." },
        { title: "Growth", text: "Visibility, reputation and conversion — we measure what actually matters." },
      ],
      principlesTitle: "Our principles",
      principles: [
        { title: "Clarity first", text: "Plain explanations, transparent quotes, no needless jargon." },
        { title: "Obsessed with detail", text: "A spacing, a transition, a sentence — details shape perception." },
        { title: "Honest results", text: "We don’t promise the #1 spot on Google. We promise serious, measured, well-explained work." },
        { title: "Long-term relationships", text: "We’d rather grow alongside our clients than deliver and disappear." },
      ],
    },
    portfolio: {
      meta: {
        title: "Portfolio — Our Web Projects",
        description: "Explore websites designed by Nexora Digital: custom design, performance and a polished mobile experience.",
      },
      eyebrow: "Portfolio",
      title: "Work engineered to perform.",
      lead:
        "Every project is a tailored answer to a specific market, audience and set of goals. Here’s a selection of our recent work.",
      filterLabel: "Filter by industry",
      filterAll: "All",
      empty: "No projects in this industry yet.",
      prototypeNote: "Projects labeled “Prototype” are complete builds that haven’t been publicly launched yet.",
    },
    project: {
      sector: "Industry",
      services: "Services",
      year: "Year",
      status: "Status",
      challenge: "The challenge",
      approach: "Our approach",
      result: "The outcome",
      gallery: "Gallery",
      ctaTitle: "Have a similar project in mind?",
    },
    quote: {
      meta: {
        title: "Request a Quote",
        description:
          "Request a tailored quote for your website, SEO or Google review management. Fast reply, no commitment.",
      },
      eyebrow: "Quote",
      title: "Tell us about your project.",
      lead:
        "It only takes a few minutes. We’ll review your request and get back to you with a clear recommendation and a tailored, no-obligation quote.",
      stepsTitle: "What happens next",
      steps: [
        { title: "We review your request", text: "We look at your business, your current presence and your goals." },
        { title: "A first conversation", text: "We reach out to clarify your needs and answer your questions." },
        { title: "Your tailored quote", text: "You receive a clear proposal, sized to your project and budget." },
      ],
      bookTitle: "Rather talk it through?",
      bookText: "Book a time directly in our calendar.",
      contactTitle: "Get in touch",
      privacyNote: "Your information is used solely to respond to your request.",
    },
    consultation: {
      meta: {
        title: "Book a Consultation",
        description: "Book a consultation with Nexora Digital to discuss your website, SEO or online reputation.",
      },
      eyebrow: "Consultation",
      title: "Book a consultation with an expert.",
      lead:
        "A conversation to understand where you stand, answer your questions and identify the most valuable next steps for your business.",
      expectTitle: "What we’ll cover",
      expect: [
        "A look at your current online presence",
        "Your goals and priorities",
        "The most promising opportunities",
        "Next steps — no commitment",
      ],
      loadCalendar: "Show calendar",
      loading: "Loading calendar…",
      openNewTab: "Open in a new tab",
      calendarTitle: "Pick a time",
      calendarNote: "The calendar is provided by Calendly and only loads when you ask for it.",
      unavailable: "Online booking is coming soon. In the meantime, request a quote and we’ll reach out.",
    },
    faq: {
      meta: {
        title: "FAQ — Websites, SEO & Google Reviews",
        description: "Pricing, timelines, SEO, maintenance, Google reviews: answers to the most common questions about Nexora Digital’s services.",
      },
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      lead: "Everything you need to know before starting a project with us. Can’t find your answer? Just ask.",
      stillTitle: "Still have a question?",
      stillText: "We’re happy to answer it during a first, no-commitment conversation.",
    },
    privacy: {
      meta: {
        title: "Privacy Policy",
        description:
          "Nexora Digital privacy policy: information collected, purposes, retention and your rights, in accordance with Québec’s Law 25.",
      },
      title: "Privacy Policy",
      updated: "Last updated:",
    },
    notFound: {
      title: "This page can’t be found.",
      text: "The link may be broken, or the page may have moved.",
      back: "Back to home",
    },
  },

  faq: [
    {
      id: "pricing",
      title: "Pricing & quotes",
      items: [
        {
          q: "How much does a website cost?",
          a: "Every website is different: pricing depends on the number of pages, features, content to produce and integrations required. Rather than quoting a generic price, we prepare a clear, detailed, tailored quote once we understand your project.",
        },
        {
          q: "How much does Google review management cost?",
          a: "Google review management is a monthly subscription. Pricing mainly depends on your review volume and the number of locations to manage. Request a quote and we’ll suggest the right plan.",
        },
        {
          q: "How do I request a quote?",
          a: "Fill out our quote form in a few minutes, or book a consultation directly. We review your request and get back to you with a recommendation and a tailored, no-obligation proposal.",
        },
      ],
    },
    {
      id: "websites",
      title: "Websites",
      items: [
        {
          q: "How long does it take to build a website?",
          a: "Depending on scope, it typically ranges from a few weeks for a showcase site to a few months for a more complex project. A precise timeline is set from the start, and you’re kept in the loop at every stage.",
        },
        {
          q: "Can you redesign my current website?",
          a: "Yes. We review your existing site, keep what works and rethink the rest. We pay special attention to the migration to preserve the search rankings you’ve already earned.",
        },
        {
          q: "Do you offer maintenance?",
          a: "Yes, we can maintain your website: updates, security, backups, small changes and ongoing improvements. It’s optional and defined around your needs.",
        },
      ],
    },
    {
      id: "seo",
      title: "SEO",
      items: [
        {
          q: "How does SEO work?",
          a: "SEO makes your site more relevant and accessible to Google: technical quality, content that answers what your customers search for, local presence and authority. It’s a progressive effort — early effects usually appear after a few months, and results build over time.",
        },
        {
          q: "Can you guarantee the #1 spot on Google?",
          a: "No — and no one honestly can: Google doesn’t sell organic rankings. What we do commit to is a rigorous method, transparent actions and clear reporting on your results.",
        },
      ],
    },
    {
      id: "reviews",
      title: "Google Reviews",
      items: [
        {
          q: "Do you write or buy reviews?",
          a: "Never. Fake and paid reviews violate Google’s policies and erode trust. We only make it easier for your real customers to leave genuine reviews — and every one of them can speak up, happy or not.",
        },
        {
          q: "What happens with a negative review?",
          a: "We respond professionally and with empathy, in line with your brand. A thoughtful reply to criticism shows future customers that you take their experience seriously.",
        },
      ],
    },
    {
      id: "company",
      title: "Working together",
      items: [
        {
          q: "Do you work with Montreal businesses?",
          a: "Yes — Montreal and Québec are at the heart of what we do. We know the local market, its expectations and the importance of a high-quality French-language presence.",
        },
        {
          q: "Do you work with international companies?",
          a: "Yes. We work remotely with businesses outside Québec and can build bilingual or multilingual websites, with an SEO strategy tailored to each market.",
        },
        {
          q: "Do you work with small and mid-sized businesses?",
          a: "SMBs are at the core of our approach. We adapt our solutions to your goals, budget and in-house resources — without needless complexity.",
        },
      ],
    },
  ],

  form: {
    title: "Your quote request",
    required: "Required fields",
    sections: { about: "About you", project: "Your project", details: "Details" },
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      company: { label: "Company", placeholder: "Your company name" },
      email: { label: "Email", placeholder: "you@company.com" },
      phone: { label: "Phone", placeholder: "514 000-0000" },
      website: { label: "Current website", placeholder: "www.yoursite.com" },
      sector: { label: "Industry", placeholder: "Select an industry" },
      service: { label: "Service needed" },
      budget: { label: "Approximate budget", hint: "Amounts in Canadian dollars" },
      objectives: { label: "Goals", placeholder: "More leads, a more professional image, better visibility…" },
      message: { label: "Message", placeholder: "Describe your project, timeline or anything else we should know." },
      contactConsent: {
        label: "I’d like to be contacted to discuss my project.",
        hint: "Your information is used solely to handle your request. See our",
        privacyLink: "privacy policy",
      },
    },
    options: {
      service: {
        website: "Web design",
        seo: "SEO",
        reviews: "Google review management",
        multiple: "Multiple services",
      },
      budget: {
        lt1000: "Under $1,000",
        "1000-2500": "$1,000 – $2,500",
        "2500-5000": "$2,500 – $5,000",
        gt5000: "$5,000 and up",
        unknown: "Not sure yet",
      },
      sector: {
        retail: "Retail",
        restaurant: "Food & hospitality",
        health: "Health & wellness",
        professional: "Professional services",
        construction: "Construction & renovation",
        realestate: "Real estate",
        tech: "Technology",
        nonprofit: "Non-profit",
        other: "Other",
      },
    },
    optional: "Optional",
    secureNote: "Your data is sent securely.",
    submit: "Send my request",
    submitting: "Sending…",
    errors: {
      required: "This field is required.",
      email: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
      url: "Enter a valid web address.",
      tooShort: "This field is too short.",
      tooLong: "This field is too long.",
      invalid: "Select a valid option.",
      consent: "Check this box so we can get in touch.",
      summary: "Please fix the highlighted fields.",
      rate_limited: "Too many requests in a short time. Please try again in a few minutes.",
      not_configured: "Form submissions aren’t enabled yet. Please book a consultation in the meantime.",
      server: "Something went wrong while sending. Please try again.",
      network: "Unable to connect. Check your network and try again.",
    },
    success: {
      title: "Thank you — your request is in.",
      text: "We’re reviewing it carefully and will get back to you shortly with an initial recommendation.",
      next: "In the meantime, feel free to book a consultation directly.",
      again: "Send another request",
    },
  },

  footer: {
    tagline: "Websites, SEO and online reputation for businesses ready to grow.",
    location: "Montreal, Québec — serving clients in Québec and worldwide",
    navTitle: "Navigation",
    servicesTitle: "Services",
    contactTitle: "Contact",
    privacy: "Privacy",
    rights: "All rights reserved.",
    ctaTitle: "Have a project in mind?",
  },

  mobileCta: "Request a quote",
};

export default en;
