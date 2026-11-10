/* =========================================================
   Feedia — site content
   Everything editable lives here: services, clients, events,
   media (YouTube embeds), sponsor tiers and affiliate rates.
   ========================================================= */
window.FEEDIA = {
  brand: {
    name: "Feedia",
    tagline: "A Global Strategy Company",
    email: "info@thefeedia.com",
    youtube: "https://www.youtube.com/@Feedia2050",
    socials: [
      { label: "Facebook", short: "f", url: "https://www.facebook.com/kwasi/" },
      { label: "Instagram", short: "ig", url: "https://www.instagram.com/amazingkwasi/" },
      { label: "LinkedIn", short: "in", url: "https://www.linkedin.com/in/kwasiamaningasare/" },
      { label: "X / Twitter", short: "x", url: "https://twitter.com/YearOfKwasi" },
      { label: "YouTube", short: "▶", url: "https://www.youtube.com/@Feedia2050" }
    ],
    calendly: {
      "15": "https://calendly.com/kwasiasare/15min?hide_gdpr_banner=1&primary_color=e72929",
      "30": "https://calendly.com/kwasiasare/30min?hide_gdpr_banner=1&primary_color=e72929",
      "60": "https://calendly.com/kwasiasare/60min?hide_gdpr_banner=1&primary_color=e72929"
    }
  },

  /* The ten service areas from thefeedia.com (anchors preserved). */
  services: [
    { id: "strategy", icon: "🧭", img: "assets/img/services/strategy.jpg",
      title: "Multichannel Go-To-Market Strategy",
      summary: "A single plan that connects brand, narrative, channels and launch so every touchpoint pulls in the same direction.",
      items: ["Strategic Planning", "Brand and Narrative Development", "360 Campaign Optimization", "Influencer Marketing Campaigns", "Public Relations & Earned Media", "Social Media & Social Audio Marketing and Growth", "Audio & Video Content Creation and Distribution", "Growth and User Acquisition", "Event Marketing Strategies & Execution", "Digital Asset Creation and Distribution", "Metaverse Marketing and Business Development"] },
    { id: "optimization", icon: "📈", img: "assets/img/services/optimization.jpg",
      title: "Marketing Optimization",
      summary: "Media buying, content and ad management tuned continuously so spend turns into audience and revenue.",
      items: ["Media Buying & Social Media Growth", "Media Content Development & Distribution", "Media Amplification and Audience Building", "Ad Campaign Management", "Offline Marketing Campaigns", "Channel Segmented Content Strategy", "End-to-End Video Script Writing and Production"] },
    { id: "campaigns", icon: "🎤", img: "assets/img/services/campaigns.jpg",
      title: "Influencer & Event Marketing Campaigns",
      summary: "Macro and micro influencer programs plus streaming and in-person events that put your brand in the room.",
      items: ["Targeted Macro Influencer Campaigns", "Targeted Micro Influencer Campaigns", "Streaming Event Production and Marketing", "Offline Event Production and Marketing"] },
    { id: "relations", icon: "📰", img: "assets/img/services/relations.jpg",
      title: "Public Relations",
      summary: "Earned media across print, podcast, TV and radio, plus thought-leadership and speaking opportunities.",
      items: ["Targeted short, medium, and long lead earned media development, pitching, and publishing", "Targeted Podcast Engagement", "Targeted Television Engagement", "Targeted Radio Engagement", "Thought Leadership & Speaking Engagements"] },
    { id: "development", icon: "🚀", img: "assets/img/services/growth.jpg",
      title: "Consumer & Business to Business Growth Services",
      summary: "Sales strategy and acquisition programs for B2B and B2C, from app installs to playlisting.",
      items: ["B to B Sales Growth", "B to C Sales Growth", "Sales Strategy Analysis", "Mobile Install Growth and User Acquisition", "Social Media Growth", "Digital Service Provider Playlisting"] },
    { id: "audio", icon: "🎧", img: "assets/img/services/audio.jpg",
      title: "Social Audio Marketing",
      summary: "Build and grow communities in live audio rooms, with hosting, strategy and influencer activations.",
      items: ["Social Audio Community Development", "Social Audio Room Hosting", "Social Audio Growth Strategy and Execution", "Social Audio Influencer Campaigns"] },
    { id: "publishing", icon: "🎬", img: "assets/img/services/publishing.jpg",
      title: "Content Creation & Publishing",
      summary: "Social content, video, documentary and executive production, plus bylines that build authority.",
      items: ["Social Media Content", "Video Content Production", "Documentary Production and Distribution", "Film and TV Executive Production", "Bylines and Contributed Content"] },
    { id: "distribution", icon: "🪙", img: "assets/img/services/distribution.jpg",
      title: "Digital Asset Creation & Distribution",
      summary: "Create, market and distribute digital assets, and pay teams in crypto.",
      items: ["NFT Creation", "NFT Marketing", "NFT Distribution", "BTC, ETH, Etc Payroll and Remittance Services (Bitwage)"] },
    { id: "metaverse", icon: "🕶️", img: "assets/img/services/metaverse.jpg",
      title: "Metaverse Strategy Development",
      summary: "Integrations, avatars, communities and monetization for immersive and virtual worlds.",
      items: ["Metaverse Marketing Integrations", "Metaverse Business Development", "Metaverse Avatar Development", "Metaverse Community Development", "Metaverse Monetization"] },
    { id: "analysis", icon: "🔬", img: "assets/img/services/analysis.jpg",
      title: "Research & Marketing Analysis",
      summary: "Audience insight, competitive research and campaign analytics that guide every decision.",
      items: ["Industry Insights and Audience Analysis", "Data Analysis", "Campaign Analysis and Optimization", "Research and Competitive Analysis"] }
  ],

  clients: [
    { name: "Warner Music Group", logo: "assets/img/clients/warner-music-group.png" },
    { name: "CES", logo: "assets/img/clients/cta.png" },
    { name: "Apple", logo: "assets/img/clients/apple.png" },
    { name: "Monster Products", logo: "assets/img/clients/monster-products.png" },
    { name: "Google", logo: "assets/img/clients/google.png" },
    { name: "Microsoft", logo: "assets/img/clients/microsoft.png" },
    { name: "Sony Music", logo: "assets/img/clients/sony-music.png" },
    { name: "Universal Music Group", logo: "assets/img/clients/universal-music-group.png" },
    { name: "Startup America", logo: "assets/img/clients/startup-america.png" },
    { name: "Facebook", logo: "assets/img/clients/facebook.png" },
    { name: "Estée Lauder", logo: "assets/img/clients/estee-lauder.png" }
  ],

  sectors: ["Technology", "Social Impact", "Sports", "International Development", "Media"],

  /* ---------------- Events ----------------
     date/end are ISO dates. `tentative: true` shows a "Dates TBC" badge.
     `sponsorable: true` adds a "Sponsor this event" button that links to invest.html. */
  categories: {
    house:     { label: "2050 House",   color: "#e72929" },
    forum:     { label: "Forum",        color: "#ff7a3d" },
    media:     { label: "Media / Press", color: "#3b82f6" },
    workshop:  { label: "Workshop",     color: "#10b981" },
    virtual:   { label: "Virtual",      color: "#a855f7" },
    summit:    { label: "Global Summit", color: "#0ea5e9" },
    art:       { label: "Art & Culture", color: "#ec4899" },
    motorsport:{ label: "Formula 1",    color: "#f59e0b" }
  },
  events: [
    { id: "sundance-2023", title: "2050 Forums @ Sundance 2023", category: "forum",
      date: "2023-01-19", end: "2023-01-29", location: "Park City, UT",
      description: "Feedia's 2050 Forums during the Sundance Film Festival: talks, performances and conversations on the future of film, impact and technology.",
      video: "Yng0BXqFT3U" },
    { id: "siriusxm-2023", title: "Kwasi Asare on Sirius XM", category: "media",
      date: "2023-04-09", location: "Sirius XM radio",
      description: "2050 House founder and Feedia CEO Kwasi Asare featured on Sirius XM.",
      video: "9XRME5lW0js" },
    { id: "sundance-2025", title: "2050 House @ Sundance 2025", category: "house",
      date: "2025-01-23", end: "2025-02-02", location: "Park City, UT",
      description: "2050 House returned to Sundance with panels on Hollywood, regeneration and the future of climate and impact filmmaking.",
      video: "7kJiljEVB_4" },
    { id: "sundance-2027", title: "2050 House @ Sundance 2027", category: "house", tentative: true, sponsorable: true,
      date: "2027-01-21", end: "2027-01-31", location: "Boulder, CO",
      description: "Our flagship festival house: panels, screenings, live performances and partner activations. Dates and venue to be confirmed.",
      price: 0 },
    { id: "art-basel-2026", title: "2050 House @ Art Basel Miami Beach", category: "art", tentative: true, status: "Venue TBC", sponsorable: true,
      date: "2026-12-04", end: "2026-12-06", location: "Miami Beach, FL",
      description: "2050 House during Art Basel Miami Beach and Miami Art Week: artists, collectors, founders and brands at the crossroads of culture, technology and impact. Activation venue and programming to be announced." },
    { id: "davos-2027", title: "2050 House @ Davos", category: "summit", tentative: true, status: "Venue TBC", sponsorable: true,
      date: "2027-01-18", end: "2027-01-22", location: "Davos-Klosters, Switzerland",
      description: "2050 House alongside the World Economic Forum Annual Meeting: conversations with leaders in business, climate, media and international development. Venue and programming to be announced." },
    { id: "f1-miami-2027", title: "2050 House @ F1 Miami Grand Prix", category: "motorsport", tentative: true, status: "Venue TBC", sponsorable: true,
      date: "2027-04-30", end: "2027-05-02", location: "Miami Gardens, FL",
      description: "2050 House during the Formula 1 Miami Grand Prix race weekend: hospitality, partner activations and conversations on sport, technology and sustainability. Venue and programming to be announced." },
    { id: "gtm-workshop", title: "Go-To-Market Strategy Workshop", category: "workshop", tentative: true, sponsorable: true,
      date: "2026-12-10", time: "1:00 PM – 3:00 PM ET", location: "Online",
      description: "A working session on building a multichannel go-to-market plan: narrative, channels, influencers and launch sequencing." },
    { id: "future-bright", title: "2050 Live: The Future Is Bright", category: "virtual", tentative: true, sponsorable: true,
      date: "2027-03-18", time: "7:00 PM ET", location: "Livestream · YouTube",
      description: "A live-streamed conversation series with founders, filmmakers and climate innovators from the 2050 House community." }
  ],

  /* ---------------- Media library ----------------
     YouTube videos from youtube.com/@Feedia2050.
     To add one, copy an entry and change `yt` to the video ID. */
  media: [
    { yt: "PqDmAvOPGWY", title: "Developing a Sustainable Luxury Brand w/ Abi Ferrin", duration: "15:19", year: 2026, category: "Conversations", featured: true },
    { yt: "SzfNzWGcNYY", title: "Gender Equality and the End of DEI with Jackie Hopkins", duration: "19:48", year: 2026, category: "Conversations" },
    { yt: "tuBZAnyQYgI", title: "2050 HOUSE: Hollywood + Regeneration w/ Kwasi Amaning Asare, Josh Tickell, Sage Lenier & Mike Lemon", duration: "26:50", year: 2026, category: "2050 House", featured: true },
    { yt: "5MC0zoh0WOA", title: "Breaking the Echo Chamber: The Future of Climate & Impact Filmmaking", duration: "26:12", year: 2026, category: "2050 House" },
    { yt: "7kJiljEVB_4", title: "2050 House during Sundance Film Festival 2025", duration: "2:07", year: 2025, category: "Sundance" },
    { yt: "JWSlT-OPh-k", title: "2050 HOUSE Presents \"The Future is Bright\" w/ Kwasi Amaning Asare & Maxim Jago", duration: "31:52", year: 2025, category: "2050 House", featured: true },
    { yt: "9XRME5lW0js", title: "2050 House Founder Kwasi Asare Featured on Sirius XM", duration: "1:39", year: 2023, category: "Press" },
    { yt: "Lemj7WxLLwQ", title: "Dr. Semhal Ghessese Speaks at 2050 Forums @ Sundance", duration: "1:24", year: 2023, category: "Sundance" },
    { yt: "VoogtatVLpY", title: "\"Lighthouse Lighting Up The Darkness\" performed @ 2050 Forums @ Sundance", duration: "8:44", year: 2023, category: "Performances" },
    { yt: "re7Mz6prW_o", title: "Feedia CEO Kwasi Asare Introduces 2050 Forums @ Sundance", duration: "2:37", year: 2023, category: "Sundance" },
    { yt: "7lJOjRSJs7Q", title: "2050 Forums @ Sundance 2023 Powered by Feedia (Highlights Part 1, Subtitled)", duration: "1:41", year: 2023, category: "Sundance" },
    { yt: "Yng0BXqFT3U", title: "2050 Forums @ Sundance 2023 Powered by Feedia (Highlights Part 1)", duration: "1:38", year: 2023, category: "Sundance" }
  ],

  /* ---------------- Investment / sponsorship ----------------
     rewardRate   = % of ticket & pass revenue from the sponsor's referral link paid back as rewards
     sponsorBonus = one-time reward, as % of the sponsorship value, when a company you refer signs on as a sponsor
     Values are starting points: adjust to your actual program terms. */
  tiers: [
    { id: "supporter", name: "Supporter", price: 2500, rewardRate: 10, sponsorBonus: 5,
      perks: ["Logo on event page & recap video", "2 all-access passes", "Personal affiliate link & code", "Social media thank-you"] },
    { id: "partner", name: "Partner", price: 10000, rewardRate: 15, sponsorBonus: 7.5, featured: true,
      perks: ["Everything in Supporter", "Branded segment in a 2050 House livestream", "6 VIP passes", "Activation space on site", "Post-event performance report"] },
    { id: "presenting", name: "Presenting", price: 25000, rewardRate: 20, sponsorBonus: 10,
      perks: ["Everything in Partner", "\"Presented by\" naming on one stage or series", "Speaking slot on a panel", "12 VIP passes + green room", "Dedicated video feature on the Feedia channel", "First refusal on future events"] }
  ]
};
