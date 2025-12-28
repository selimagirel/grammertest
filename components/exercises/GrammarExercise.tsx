"use client"

import { useState } from 'react'
import { GrammarQuestion, Answer } from '@/types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

interface GrammarExerciseProps {
  questions: GrammarQuestion[]
  level: string
  topic: string
}

export default function GrammarExercise({
  questions,
  level,
  topic,
}: GrammarExerciseProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [answers, setAnswers] = useState<Map<number, string>>(new Map())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers((prev) => {
      const newAnswers = new Map(prev)
      newAnswers.set(questionId, answer)
      return newAnswers
    })
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = questions.filter((q) => !answers.has(q.id))
    if (unanswered.length > 0) {
      toast({
        title: 'Incomplete',
        description: `Please answer all questions. ${unanswered.length} question(s) remaining.`,
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const answersArray: Answer[] = Array.from(answers.entries()).map(
        ([questionId, userAnswer]) => ({
          questionId,
          userAnswer,
        })
      )

      const response = await fetch('/api/exercises/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions,
          answers: answersArray,
          level,
          topic,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store result and exercise data in session storage
        sessionStorage.setItem('grading_result', JSON.stringify(data.data))
        sessionStorage.setItem(
          'current_exercise',
          JSON.stringify({ level, topic, questions })
        )
        router.push('/results')
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to submit answers',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit answers. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {questions.map((question, index) => (
        <div key={question.id} className="card">
          <h3 className="text-lg font-semibold mb-4">
            Question {index + 1} of {questions.length}
          </h3>
          <p className="text-xl mb-6">{question.question}</p>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const isSelected = answers.get(question.id) === option
              return (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswerSelect(question.id, option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                  }`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + optionIndex)}.
                  </span>
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center pt-6">
        <div className="text-gray-400">
          Answered: {answers.size} / {questions.length}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || answers.size !== questions.length}
          className="btn-primary"
          size="lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answers'}
        </Button>
      </div>
    </div>
  )
}
