"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, ArrowLeft, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import GrammarExercise from '@/components/exercises/GrammarExercise'
import { GrammarExercise as GrammarExerciseType } from '@/types'
import { getSessionId } from '@/lib/utils'
import { generateAndDownloadPDF } from '@/lib/pdf-generator'

export default function ExercisePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const level = searchParams?.get('level') || 'A1'
  const type = searchParams?.get('type') || 'grammar'
  const subtype = searchParams?.get('subtype')
  const topicParam = searchParams?.get('topic')

  const [isGenerating, setIsGenerating] = useState(false)
  const [exercise, setExercise] = useState<any>(null)
  const [topic, setTopic] = useState(topicParam || '')
  const [showTopicInput, setShowTopicInput] = useState(!topicParam)

  const handleGenerate = async () => {
    if (type === 'grammar' && !topic) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a grammar topic',
        variant: 'destructive',
      })
      return
    }

    setIsGenerating(true)

    try {
      const sessionId = getSessionId()

      const response = await fetch('/api/exercises/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exerciseType: type,
          level,
          topic: topic || undefined,
          vocabularyType: subtype || undefined,
          sessionId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setExercise(data.data)
        setShowTopicInput(false)
        toast({
          title: 'Success',
          description: 'Exercise generated successfully!',
        })
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to generate exercise',
          variant: 'destructive',
        })

        // If trial exhausted, show subscribe option
        if (data.error?.includes('trial')) {
          setTimeout(() => {
            router.push('/subscribe')
          }, 2000)
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate exercise. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    // Auto-generate if topic is provided
    if (topicParam && !exercise) {
      handleGenerate()
    }
  }, [])

  if (showTopicInput && type === 'grammar') {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <Link href={`/categories?level=${level}`}>
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Button>
          </Link>

          <div className="card">
            <h1 className="text-3xl font-bold mb-4 text-gradient">
              Choose Grammar Topic
            </h1>
            <p className="text-gray-400 mb-6">
              Enter a grammar topic you'd like to practice (e.g., Present Simple, Past
              Continuous, Conditionals)
            </p>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter grammar topic..."
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none mb-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && topic) {
                  handleGenerate()
                }
              }}
            />

            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Suggestions for {level}:</p>
              <div className="flex flex-wrap gap-2">
                {getSuggestedTopics(level).map((suggestedTopic) => (
                  <button
                    key={suggestedTopic}
                    onClick={() => setTopic(suggestedTopic)}
                    className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 hover:bg-purple-500/30 transition-colors text-sm"
                  >
                    {suggestedTopic}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="btn-primary w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Exercise'
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-purple-500" />
          <h2 className="text-2xl font-bold mb-2">Generating Your Exercise</h2>
          <p className="text-gray-400">
            Our AI is creating a personalized exercise for you...
          </p>
        </div>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={`/categories?level=${level}`}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Button>
          </Link>
        </div>

        <div className="card mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gradient">
                {type === 'grammar' && 'Grammar Test'}
                {type === 'vocabulary' && 'Vocabulary Exercise'}
                {type === 'paragraph' && 'Reading Practice'}
              </h1>
              <p className="text-gray-400">
                Level: {level} {topic && `• Topic: ${topic}`}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setExercise(null)
                setShowTopicInput(true)
              }}
            >
              New Exercise
            </Button>
          </div>
        </div>

        {type === 'grammar' && (
          <GrammarExercise
            questions={exercise.questions}
            level={level}
            topic={exercise.topic || topic}
          />
        )}

        {type === 'vocabulary' && subtype === 'flashcards' && exercise.cards && (
          <div>
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => {
                  generateAndDownloadPDF('flashcards', { ...exercise, level })
                  toast({
                    title: 'Success',
                    description: 'PDF downloaded successfully!',
                  })
                }}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download Flashcards PDF
              </Button>
            </div>
            <div className="grid gap-6">
              {exercise.cards.map((card: any, index: number) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gradient">{card.word}</h3>
                    {card.partOfSpeech && (
                      <span className="text-sm text-purple-400 italic">
                        ({card.partOfSpeech})
                      </span>
                    )}
                  </div>
                  <p className="text-lg mb-4">{card.definition}</p>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Example:</p>
                    <p className="italic">"{card.exampleSentence}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'vocabulary' &&
          (subtype === 'multiple-choice' || subtype === 'fill-in-blank') &&
          exercise.questions && (
            <div>
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => {
                    generateAndDownloadPDF('vocabulary', { ...exercise, level })
                    toast({
                      title: 'Success',
                      description: 'PDF downloaded successfully!',
                    })
                  }}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
              <div className="space-y-6">
                {exercise.questions.map((question: any, index: number) => (
                  <div key={index} className="card">
                    <h3 className="text-lg font-semibold mb-4">
                      Question {index + 1} of {exercise.questions.length}
                    </h3>
                    <p className="text-xl mb-4">{question.question}</p>
                    {question.options && (
                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                          >
                            <span className="font-semibold mr-3">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                    {question.definition && (
                      <div className="mt-4 text-sm text-gray-400">
                        Definition: {question.definition}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {type === 'paragraph' && (
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Reading Paragraph</h2>
              <Button
                onClick={() => {
                  generateAndDownloadPDF('paragraph', { ...exercise, level })
                  toast({
                    title: 'Success',
                    description: 'PDF downloaded successfully!',
                  })
                }}
                className="gap-2"
                size="sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
            <p className="text-lg leading-relaxed mb-6">{exercise.paragraph}</p>
            <div className="text-sm text-gray-400">
              {exercise.sentences} sentences • {level} level
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getSuggestedTopics(level: string): string[] {
  const topics: Record<string, string[]> = {
    A1: ['Present Simple', 'To Be', 'Personal Pronouns', 'Articles (a/an/the)'],
    A2: ['Past Simple', 'Present Continuous', 'Future (will/going to)', 'Comparatives'],
    B1: ['Present Perfect', 'Conditionals (Type 1)', 'Passive Voice', 'Modal Verbs'],
    B2: [
      'Past Perfect',
      'Conditionals (Type 2 & 3)',
      'Reported Speech',
      'Relative Clauses',
    ],
  }

  return topics[level] || topics.A1
}
