function generateWebSiteSchema(siteUrl = "https://gamertagpro.com", siteName = "GamerTag Pro") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
function generateWebApplicationSchema(appName = "GamerTag Pro Gaming Name Generator", appUrl = "https://gamertagpro.com", description = "Instant Gaming Name and Nickname Generator for Free Fire, BGMI, Valorant, and Clans") {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: appName,
    url: appUrl,
    description,
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}
function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
function generateFaqPageSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export { generateBreadcrumbSchema as a, generateFaqPageSchema as b, generateWebSiteSchema as c, generateWebApplicationSchema as g };
