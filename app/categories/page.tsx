"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Brain, BookOpen, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TrialCounter from '@/components/layout/TrialCounter'

const categories = [
  {
    id: 'grammar',
    name: 'Grammar Tests',
    description: '20-question tests with instant grading and explanations',
    icon: Brain,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary Building',
    description: 'Flashcards and exercises to expand your word knowledge',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'paragraph',
    name: 'Reading Practice',
    description: 'Level-appropriate paragraphs for reading comprehension',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
  },
]

export default function CategoriesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const level = searchParams?.get('level') || 'A1'

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <TrialCounter />
        <div className="mt-8 mb-4">
          <Link href="/levels">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Levels
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          Choose Exercise Type
        </h1>
        <p className="text-xl text-gray-300">
          Level: <span className="text-gradient font-bold">{level}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.id} className="group">
              <div className="card hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                <div className="text-center">
                  <div
                    className={`bg-gradient-to-br ${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{category.description}</p>

                  {category.id === 'grammar' && (
                    <div className="space-y-2">
                      <Link href={`/exercise?level=${level}&type=grammar&topic=present-simple`}>
                        <Button className="w-full gradient-purple">
                          Start Grammar Test
                        </Button>
                      </Link>
                      <p className="text-xs text-gray-500">
                        You can choose a specific topic after clicking
                      </p>
                    </div>
                  )}

                  {category.id === 'vocabulary' && (
                    <div className="space-y-2">
                      <Link href={`/exercise?level=${level}&type=vocabulary&subtype=flashcards`}>
                        <Button className="w-full gradient-purple mb-2">
                          Flashcards
                        </Button>
                      </Link>
                      <Link
                        href={`/exercise?level=${level}&type=vocabulary&subtype=multiple-choice`}
                      >
                        <Button className="w-full" variant="outline">
                          Multiple Choice
                        </Button>
                      </Link>
                      <Link href={`/exercise?level=${level}&type=vocabulary&subtype=fill-in-blank`}>
                        <Button className="w-full" variant="outline">
                          Fill in the Blank
                        </Button>
                      </Link>
                    </div>
                  )}

                  {category.id === 'paragraph' && (
                    <Link href={`/exercise?level=${level}&type=paragraph`}>
                      <Button className="w-full gradient-purple">
                        Generate Paragraph
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
