'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import brandKnowledge from '@/data/brand_knowledge.json'
import { Product } from '@/types'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminProductsPage() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  const allProducts = brandKnowledge.series.flatMap(s => s.products)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('In production, this would save to database/CMS. For demo, showing form validation.')
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">CMS - Product Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage product catalog and content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                View Site →
              </a>
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {allProducts.length} products across {brandKnowledge.series.length} series
          </p>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>Edit or remove existing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.seriesId} • {product.keyFeatures.length} features • {product.faqs.length} FAQs
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product)
                        setShowForm(true)
                      }}
                      className="p-2 hover:bg-muted rounded-md"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${product.name}?`)) {
                          alert('Delete functionality would connect to CMS API')
                        }
                      }}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
                <CardDescription>
                  {editingProduct ? 'Update product information' : 'Create a new product in the catalog'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      defaultValue={editingProduct?.name}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <input
                      type="text"
                      defaultValue={editingProduct?.slug}
                      className="w-full px-3 py-2 border rounded-md"
                      pattern="[a-z0-9-]+"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Series</label>
                    <select
                      defaultValue={editingProduct?.seriesId}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      {brandKnowledge.series.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      defaultValue={editingProduct?.description}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Key Features (one per line)</label>
                    <textarea
                      defaultValue={editingProduct?.keyFeatures.join('\n')}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Best For (comma separated)</label>
                    <input
                      type="text"
                      defaultValue={editingProduct?.bestFor.join(', ')}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Team A, Team B, Use Case C"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingProduct(null)
                      }}
                      className="px-4 py-2 border rounded-md hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
