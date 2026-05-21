import { MetadataRoute } from 'next'
import { TRANSFER_ROUTES } from '@/lib/routes'

const BASE_URL = 'https://www.parisairportstransfers.com'

const HIGH_PRIORITY_SLUGS = [
  'cdg-paris-transfer',
  'orly-paris-transfer',
  'disneyland-paris-transfer',
  'paris-versailles-transfer',
  'cdg-versailles-transfer',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const routePages: MetadataRoute.Sitemap = TRANSFER_ROUTES.map((route) => ({
    url: `${BASE_URL}/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: HIGH_PRIORITY_SLUGS.includes(route.slug) ? 0.9 : 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/transfers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...routePages,
  ]
}
