'use client'

import { useState } from 'react'
import Link from 'next/link'
import brandKnowledge from '@/data/brand_knowledge.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductsPage() {
  const [askAIResult, setAskAIResult] = useState('')
  const allProducts = brandKnowledge.series.flatMap(s => s.products)
  const seriesList = brandKnowledge.series

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Product Knowledge Center</h1>
              <p className="text-muted-foreground mt-1">
                {brandKnowledge.brand.name} - {brandKnowledge.brand.description}
              </p>
            </div>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Series Filter */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Product Series</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {seriesList.map((series) => (
              <Card key={series.id}>
                <CardHeader>
                  <CardTitle>{series.name}</CardTitle>
                  <CardDescription>{series.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {series.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="block p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Products Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">All Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {product.description}
                  </p>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                    <ul className="text-sm space-y-1">
                      {product.keyFeatures.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block text-center py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ask AI Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Ask AI</CardTitle>
              <CardDescription>
                Have questions about our products? Ask our AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setAskAIResult('AskAI feature: This would connect to RAG/LLM API in production. For demo, responses are mocked.')
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="question" className="block text-sm font-medium mb-2">
                    Your Question
                  </label>
                  <textarea
                    id="question"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Which product is best for remote team analytics?"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Ask AI
                </button>
                {askAIResult && (
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {askAIResult}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: allProducts.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Product',
                name: p.name,
                description: p.description,
              }
            }))
          })
        }}
      />
    </div>
  )
}
