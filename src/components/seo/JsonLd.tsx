import React from "react";

/**
 * Enterprise Structured Data (JSON-LD) Component
 * Provides comprehensive Schema.org definitions for:
 * 1. Educational & Section-8 Non-Profit Organization (MASTeR Incubation Foundation)
 * 2. Geo-Location & Physical Campus Facility (MAMCET, Siruganur, Trichy)
 * 3. Government & Incubation Service (StartupTN Recognized Pre-Incubation Centre & TANSEED Facilitator)
 * 4. WebSite with Sitelinks Searchbox
 * 5. FAQPage for AI Answer Engine Optimization (AEO) - ChatGPT, Gemini, Perplexity, Claude
 */
export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://incubation.mamcet.com";

  // 1. Organization & Educational Entity Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "ResearchOrganization", "NGO"],
    "@id": `${baseUrl}/#organization`,
    name: "MASTeR Incubation Foundation",
    alternateName: [
      "MIF",
      "MASTeR Incubation",
      "MAMCET Incubation Foundation",
      "StartupTN Pre-Incubation Centre Trichy",
    ],
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logos/official-mif-logo.png`,
      caption: "MASTeR Incubation Foundation Official Crest",
    },
    image: `${baseUrl}/images/mamcet-campus.png`,
    description:
      "MASTeR Incubation Foundation (MIF) is a Section 8 non-profit technology business incubator and StartupTN Recognized Pre-Incubation Centre hosted at M.A.M. College of Engineering and Technology (MAMCET), Siruganur, Tiruchirappalli. It fosters deep-tech hardware, IoT, AI, clean energy, and agritech ventures with prototyping infrastructure, TANSEED grants, and digital Startup Passports.",
    foundingDate: "2024",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "M.A.M. College of Engineering and Technology",
      alternateName: "MAMCET",
      url: "https://mamcet.edu.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Trichy-Chennai Trunk Road, NH 45, Siruganur",
        addressLocality: "Tiruchirappalli",
        addressRegion: "Tamil Nadu",
        postalCode: "621105",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Trichy-Chennai Trunk Road, NH 45, Siruganur",
      addressLocality: "Tiruchirappalli",
      addressRegion: "Tamil Nadu",
      postalCode: "621105",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.9856",
      longitude: "78.7423",
      elevation: "88 m",
    },
    hasMap: "https://maps.google.com/?q=10.9856,78.7423",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9361697702",
        contactType: "Incubation Operations & Venture Screening",
        email: "incubationmanager@mamcet.com",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-6381945574",
        contactType: "Academic Coordination",
        email: "hemalathabalakrishnan.ece@mamcet.com",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/master-incubation-foundation",
      "https://twitter.com/master_mif",
      "https://instagram.com/master_incubation_mamcet",
      "https://mamcet.edu.in",
    ],
    knowsAbout: [
      "Technology Incubation",
      "StartupTN TANSEED Seed Grants",
      "Internet of Things (IoT) Prototyping",
      "CleanTech & Microgrid Systems",
      "Autonomous Robotics & Drones",
      "DeepTech Intellectual Property",
      "MSME Idea Hackathon Grants",
      "EDII-TN Innovation Voucher Programme",
    ],
  };

  // 2. Incubation & Government-Backed Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "@id": `${baseUrl}/#service`,
    name: "Technology Business Pre-Incubation & Seed Acceleration",
    serviceType: "Startup Incubation, Prototyping Lab Access, and Seed Grant Facilitation",
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Tamil Nadu, India",
    },
    serviceOperator: {
      "@type": "Organization",
      name: "StartupTN (Tamil Nadu Startup and Innovation Mission)",
      url: "https://startuptn.in",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Incubation Pathways",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "TANSEED 4.0 & 5.0 Seed Fund Facilitation (Up to ₹15 Lakhs)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Advanced Prototyping, 3D Printing & IoT Testing Workbenches",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Startup Passport Credentialing & Verification",
          },
        },
      ],
    },
  };

  // 3. WebSite with SearchAction Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "MASTeR Incubation Foundation",
    description: "Official StartupTN Recognised Pre-Incubation Centre at MAMCET, Trichy.",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/startups?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // 4. FAQPage Schema (Answer Engine Optimization - AEO for Google AI Overviews, Perplexity, ChatGPT)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What is MASTeR Incubation Foundation (MIF)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MASTeR Incubation Foundation (MIF) is a Section 8 non-profit technology business incubator and official StartupTN Recognized Pre-Incubation Centre located at M.A.M. College of Engineering and Technology (MAMCET) in Siruganur, Tiruchirappalli, Tamil Nadu. It provides state-of-the-art makerspaces, IoT and hardware prototyping labs, mentor networks, seed funding access, and verifiable Startup Passports to technology startups.",
        },
      },
      {
        "@type": "Question",
        name: "Who is eligible to apply for pre-incubation at MIF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MIF is open to engineering student innovators, recent graduates, academic faculty researchers, and independent early-stage entrepreneurs. Applicants working on hardware, IoT, artificial intelligence, robotics, sustainable energy, or agri-tech solutions can apply online via the MIF application portal.",
        },
      },
      {
        "@type": "Question",
        name: "What funding grants are available through MASTeR Incubation Foundation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Incubated startups can access StartupTN TANSEED grants (up to ₹10–15 Lakhs), MSME Idea Hackathon seed funding (up to ₹15 Lakhs), EDII-TN Innovation Voucher Program (IVP-A and IVP-B up to ₹2 Lakhs and ₹5 Lakhs), and institutional pre-seed awards.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Startup Passport digital credential system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Startup Passport is a digital identity and incubation journey record issued to officially incubated startups with a unique identifier (e.g., MASTER-SP-2026-0001). It cryptographically verifies milestone completions, mentor advisory logs, product launches, funding achievements, and provides an instant public verification seal for investors and government authorities.",
        },
      },
      {
        "@type": "Question",
        name: "Where is MASTeR Incubation Foundation located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MIF is situated on the M.A.M. College of Engineering and Technology (MAMCET) campus on the Trichy-Chennai National Highway (NH 45), Siruganur, Tiruchirappalli, Tamil Nadu 621105, India (GeoCoordinates: 10.9856° N, 78.7423° E).",
        },
      },
      {
        "@type": "Question",
        name: "How can I apply for incubation or contact the incubation manager?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Founders can submit an online application at https://incubation.mamcet.com/apply. For direct enquiries, email incubationmanager@mamcet.com or call +91 9361697702. Every submission receives an automated email receipt and reference tracking number.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
