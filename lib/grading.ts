import {
  GrammarQuestion,
  Answer,
  GradingResult,
  QuestionResult,
} from '@/types'
import { calculateGrade, calculatePercentage } from './utils'

export function gradeGrammarExercise(
  questions: GrammarQuestion[],
  answers: Answer[]
): GradingResult {
  const totalQuestions = questions.length
  const questionResults: QuestionResult[] = []
  let correctAnswers = 0

  // Create answer map for quick lookup
  const answerMap = new Map<number, string>()
  answers.forEach((answer) => {
    answerMap.set(answer.questionId, answer.userAnswer)
  })

  // Grade each question
  questions.forEach((question) => {
    const userAnswer = answerMap.get(question.id) || ''
    const isCorrect = userAnswer === question.correctAnswer

    if (isCorrect) {
      correctAnswers++
    }

    questionResults.push({
      questionId: question.id,
      question: question.question,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation,
    })
  })

  // Calculate score (each question is worth 5 points)
  const score = correctAnswers * 5
  const percentage = calculatePercentage(correctAnswers, totalQuestions)
  const grade = calculateGrade(score)

  return {
    score,
    totalQuestions,
    correctAnswers,
    percentage,
    grade,
    questionResults,
  }
}
