import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import brandKnowledge from '@/data/brand_knowledge.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AskAIForm } from './ask-ai-form'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  const allProducts = brandKnowledge.series.flatMap(s => s.products)
  return allProducts.find(p => p.slug === slug)
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - TechVision AI`,
    description: product.description,
    openGraph: {
      title: `${product.name} - TechVision AI`,
      description: product.description,
      type: 'website' as const,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const series = brandKnowledge.series.find(s => s.id === product.seriesId)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Products
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground mt-1">
                {series?.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{product.description}</p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {product.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Best For */}
        <Card>
          <CardHeader>
            <CardTitle>Best For</CardTitle>
            <CardDescription>Ideal use cases and teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {product.bestFor.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.faqs.map((faq, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ask AI about this product */}
        <AskAIForm
          productName={product.name}
          bestFor={product.bestFor}
          keyFeatures={product.keyFeatures}
        />
      </main>

      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: brandKnowledge.brand.name,
            },
            feature: product.keyFeatures.map(f => ({
              '@type': 'PropertyValue',
              name: f,
            })),
            audience: {
              '@type': 'Audience',
              audienceType: product.bestFor.join(', '),
            },
            hasFAQ: {
              '@type': 'FAQPage',
              mainEntity: product.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          })
        }}
      />
    </div>
  )
}
