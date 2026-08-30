export function generateWebSiteSchema(siteUrl = 'https://gamertagpro.com', siteName = 'GamerTag Pro') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateWebApplicationSchema(
  appName = 'GamerTag Pro Gaming Name Generator',
  appUrl = 'https://gamertagpro.com',
  description = 'Instant Gaming Name and Nickname Generator for Free Fire, BGMI, Valorant, and Clans'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: appName,
    url: appUrl,
    description: description,
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const generateBreadcrumbsSchema = generateBreadcrumbSchema;

export function generateFaqPageSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const generateFaqSchema = generateFaqPageSchema;

export function generateItemListSchema(title: string, names: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: names.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: name,
    })),
  };
}
