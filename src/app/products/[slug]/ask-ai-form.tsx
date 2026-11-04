'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AskAIFormProps {
  productName: string
  bestFor: string[]
  keyFeatures: string[]
}

export function AskAIForm({ productName, bestFor, keyFeatures }: AskAIFormProps) {
  const [result, setResult] = useState('')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask AI about {productName}</CardTitle>
        <CardDescription>
          Get instant answers based on product documentation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setResult(`Based on the product documentation, ${productName} is designed for ${bestFor.join(', ')}. It features ${keyFeatures.slice(0, 2).join(', ')}.`)
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
              placeholder={`Ask about ${productName}...`}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Ask AI
          </button>
          {result && (
            <div className="p-3 bg-muted rounded-md text-sm">
              {result}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
