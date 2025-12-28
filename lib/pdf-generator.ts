import jsPDF from 'jspdf'
import {
  GrammarExercise,
  VocabularyExercise,
  FlashcardSet,
  ParagraphExercise,
  GradingResult,
} from '@/types'

// PDF styling constants
const COLORS = {
  primary: '#764ba2',
  text: '#1a1a2e',
  lightGray: '#e8e8e8',
  correct: '#28a745',
  incorrect: '#dc3545',
  warning: '#ffc107',
}

const FONTS = {
  title: 20,
  heading: 16,
  subheading: 14,
  body: 12,
  small: 10,
}

export function generateGrammarPDF(
  exercise: GrammarExercise,
  withAnswers: boolean = false
): jsPDF {
  const doc = new jsPDF()
  let yPos = 20

  // Header
  doc.setFontSize(FONTS.title)
  doc.setTextColor(COLORS.primary)
  doc.text('EnglishMaster - Grammar Test', 105, yPos, { align: 'center' })

  yPos += 10
  doc.setFontSize(FONTS.body)
  doc.setTextColor(COLORS.text)
  doc.text(`Level: ${exercise.level} | Topic: ${exercise.topic}`, 105, yPos, {
    align: 'center',
  })

  yPos += 5
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, {
    align: 'center',
  })

  yPos += 15

  // Questions
  exercise.questions.forEach((question, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    // Question number and text
    doc.setFontSize(FONTS.subheading)
    doc.setTextColor(COLORS.text)
    doc.text(`Question ${index + 1}`, 20, yPos)

    yPos += 7
    doc.setFontSize(FONTS.body)
    const questionLines = doc.splitTextToSize(question.question, 170)
    doc.text(questionLines, 20, yPos)
    yPos += questionLines.length * 5 + 3

    // Options
    question.options.forEach((option, optionIndex) => {
      const letter = String.fromCharCode(65 + optionIndex)
      const optionText = `${letter}. ${option}`
      const optionLines = doc.splitTextToSize(optionText, 165)

      // Highlight correct answer if withAnswers
      if (withAnswers && option === question.correctAnswer) {
        doc.setTextColor(COLORS.correct)
        doc.setFont(undefined, 'bold')
      }

      doc.text(optionLines, 25, yPos)

      if (withAnswers && option === question.correctAnswer) {
        doc.setTextColor(COLORS.text)
        doc.setFont(undefined, 'normal')
      }

      yPos += optionLines.length * 5 + 2
    })

    yPos += 5
  })

  // Answer key on separate page
  if (withAnswers) {
    doc.addPage()
    yPos = 20

    doc.setFontSize(FONTS.title)
    doc.setTextColor(COLORS.primary)
    doc.text('Answer Key & Explanations', 105, yPos, { align: 'center' })

    yPos += 15

    exercise.questions.forEach((question, index) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(FONTS.subheading)
      doc.setTextColor(COLORS.text)
      doc.text(`Question ${index + 1}`, 20, yPos)

      yPos += 7
      doc.setFontSize(FONTS.body)
      doc.setTextColor(COLORS.correct)
      doc.setFont(undefined, 'bold')
      doc.text(`Correct Answer: ${question.correctAnswer}`, 20, yPos)

      yPos += 7
      doc.setTextColor(COLORS.text)
      doc.setFont(undefined, 'normal')
      const explanationLines = doc.splitTextToSize(
        `Explanation: ${question.explanation}`,
        170
      )
      doc.text(explanationLines, 20, yPos)

      yPos += explanationLines.length * 5 + 10
    })
  }

  return doc
}

export function generateGrammarResultsPDF(
  exercise: GrammarExercise,
  result: GradingResult
): jsPDF {
  const doc = new jsPDF()
  let yPos = 20

  // Header
  doc.setFontSize(FONTS.title)
  doc.setTextColor(COLORS.primary)
  doc.text('EnglishMaster - Test Results', 105, yPos, { align: 'center' })

  yPos += 10
  doc.setFontSize(FONTS.body)
  doc.setTextColor(COLORS.text)
  doc.text(`Level: ${exercise.level} | Topic: ${exercise.topic}`, 105, yPos, {
    align: 'center',
  })

  yPos += 5
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, {
    align: 'center',
  })

  yPos += 15

  // Score Summary Box
  doc.setDrawColor(COLORS.primary)
  doc.setLineWidth(0.5)
  doc.rect(40, yPos, 130, 35)

  yPos += 10
  doc.setFontSize(FONTS.heading)
  doc.text('Score Summary', 105, yPos, { align: 'center' })

  yPos += 8
  doc.setFontSize(FONTS.body)
  doc.text(`Final Score: ${result.score}/100 (${result.grade})`, 105, yPos, {
    align: 'center',
  })

  yPos += 6
  doc.text(
    `Correct Answers: ${result.correctAnswers}/${result.totalQuestions}`,
    105,
    yPos,
    { align: 'center' }
  )

  yPos += 6
  doc.text(`Percentage: ${result.percentage}%`, 105, yPos, { align: 'center' })

  yPos += 20

  // Question Review
  doc.setFontSize(FONTS.heading)
  doc.text('Detailed Review', 20, yPos)

  yPos += 10

  result.questionResults.forEach((qResult, index) => {
    if (yPos > 240) {
      doc.addPage()
      yPos = 20
    }

    // Question number
    doc.setFontSize(FONTS.subheading)
    doc.setTextColor(COLORS.text)
    doc.text(`Question ${index + 1}`, 20, yPos)

    // Correct/Incorrect indicator
    if (qResult.isCorrect) {
      doc.setTextColor(COLORS.correct)
      doc.text('✓ CORRECT', 160, yPos)
    } else {
      doc.setTextColor(COLORS.incorrect)
      doc.text('✗ INCORRECT', 160, yPos)
    }

    yPos += 7
    doc.setFontSize(FONTS.body)
    doc.setTextColor(COLORS.text)

    // Question text
    const questionLines = doc.splitTextToSize(qResult.question, 170)
    doc.text(questionLines, 20, yPos)
    yPos += questionLines.length * 5 + 3

    // Your answer
    doc.text(`Your Answer: ${qResult.userAnswer}`, 20, yPos)
    yPos += 6

    // Correct answer (if wrong)
    if (!qResult.isCorrect) {
      doc.setTextColor(COLORS.correct)
      doc.text(`Correct Answer: ${qResult.correctAnswer}`, 20, yPos)
      yPos += 6

      // Explanation
      doc.setTextColor(COLORS.text)
      const explanationLines = doc.splitTextToSize(
        `Explanation: ${qResult.explanation}`,
        170
      )
      doc.text(explanationLines, 20, yPos)
      yPos += explanationLines.length * 5
    }

    yPos += 8
  })

  return doc
}

export function generateVocabularyPDF(
  exercise: VocabularyExercise,
  withAnswers: boolean = false
): jsPDF {
  const doc = new jsPDF()
  let yPos = 20

  // Header
  doc.setFontSize(FONTS.title)
  doc.setTextColor(COLORS.primary)
  doc.text('EnglishMaster - Vocabulary Exercise', 105, yPos, {
    align: 'center',
  })

  yPos += 10
  doc.setFontSize(FONTS.body)
  doc.setTextColor(COLORS.text)
  doc.text(`Level: ${exercise.level} | Type: ${exercise.type}`, 105, yPos, {
    align: 'center',
  })

  yPos += 5
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, {
    align: 'center',
  })

  yPos += 15

  // Questions
  exercise.questions.forEach((question, index) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    // Question number
    doc.setFontSize(FONTS.subheading)
    doc.setTextColor(COLORS.text)
    doc.text(`Question ${index + 1}`, 20, yPos)

    yPos += 7
    doc.setFontSize(FONTS.body)

    // Question text
    const questionLines = doc.splitTextToSize(
      question.question || `Complete with: ${question.word}`,
      170
    )
    doc.text(questionLines, 20, yPos)
    yPos += questionLines.length * 5 + 3

    // Options (if multiple choice)
    if (question.options && question.options.length > 0) {
      question.options.forEach((option, optionIndex) => {
        const letter = String.fromCharCode(65 + optionIndex)
        const optionText = `${letter}. ${option}`

        if (withAnswers && option === question.correctAnswer) {
          doc.setTextColor(COLORS.correct)
          doc.setFont(undefined, 'bold')
        }

        doc.text(optionText, 25, yPos)

        if (withAnswers && option === question.correctAnswer) {
          doc.setTextColor(COLORS.text)
          doc.setFont(undefined, 'normal')
        }

        yPos += 5
      })
    } else if (withAnswers) {
      // Fill-in-blank answer
      doc.setTextColor(COLORS.correct)
      doc.text(`Answer: ${question.correctAnswer}`, 25, yPos)
      doc.setTextColor(COLORS.text)
      yPos += 5
    }

    yPos += 8
  })

  return doc
}

export function generateFlashcardsPDF(flashcardSet: FlashcardSet): jsPDF {
  const doc = new jsPDF()
  let yPos = 20

  // Header
  doc.setFontSize(FONTS.title)
  doc.setTextColor(COLORS.primary)
  doc.text('EnglishMaster - Vocabulary Flashcards', 105, yPos, {
    align: 'center',
  })

  yPos += 10
  doc.setFontSize(FONTS.body)
  doc.setTextColor(COLORS.text)
  doc.text(`Level: ${flashcardSet.level}`, 105, yPos, { align: 'center' })

  yPos += 5
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, {
    align: 'center',
  })

  yPos += 15

  // Flashcards
  flashcardSet.cards.forEach((card, index) => {
    if (yPos > 240) {
      doc.addPage()
      yPos = 20
    }

    // Card box
    doc.setDrawColor(COLORS.primary)
    doc.setLineWidth(0.5)
    doc.rect(20, yPos, 170, 40)

    yPos += 8

    // Word
    doc.setFontSize(FONTS.heading)
    doc.setTextColor(COLORS.primary)
    doc.setFont(undefined, 'bold')
    doc.text(card.word, 25, yPos)

    if (card.partOfSpeech) {
      doc.setFontSize(FONTS.small)
      doc.setTextColor(COLORS.text)
      doc.setFont(undefined, 'italic')
      doc.text(`(${card.partOfSpeech})`, 25 + doc.getTextWidth(card.word) + 3, yPos)
    }

    yPos += 8
    doc.setFont(undefined, 'normal')

    // Definition
    doc.setFontSize(FONTS.body)
    doc.setTextColor(COLORS.text)
    const definitionLines = doc.splitTextToSize(card.definition, 165)
    doc.text(definitionLines, 25, yPos)
    yPos += definitionLines.length * 5 + 3

    // Example sentence
    doc.setFontSize(FONTS.small)
    doc.setTextColor(COLORS.text)
    const exampleLines = doc.splitTextToSize(
      `Example: "${card.exampleSentence}"`,
      165
    )
    doc.text(exampleLines, 25, yPos)

    yPos += 50
  })

  return doc
}

export function generateParagraphPDF(exercise: ParagraphExercise): jsPDF {
  const doc = new jsPDF()
  let yPos = 20

  // Header
  doc.setFontSize(FONTS.title)
  doc.setTextColor(COLORS.primary)
  doc.text('EnglishMaster - Reading Practice', 105, yPos, { align: 'center' })

  yPos += 10
  doc.setFontSize(FONTS.body)
  doc.setTextColor(COLORS.text)
  doc.text(`Level: ${exercise.level}`, 105, yPos, { align: 'center' })

  if (exercise.topic) {
    yPos += 5
    doc.text(`Topic: ${exercise.topic}`, 105, yPos, { align: 'center' })
  }

  yPos += 5
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, {
    align: 'center',
  })

  yPos += 20

  // Paragraph
  doc.setFontSize(FONTS.body)
  doc.setTextColor(COLORS.text)
  const paragraphLines = doc.splitTextToSize(exercise.paragraph, 170)
  doc.text(paragraphLines, 20, yPos)

  yPos += paragraphLines.length * 7 + 10

  // Info
  doc.setFontSize(FONTS.small)
  doc.setTextColor(COLORS.text)
  doc.text(
    `This paragraph contains ${exercise.sentences} sentences at ${exercise.level} level.`,
    20,
    yPos
  )

  return doc
}

// Helper function to download PDF
export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(filename)
}

// Main export function for easy use
export function generateAndDownloadPDF(
  type: 'grammar' | 'vocabulary' | 'flashcards' | 'paragraph' | 'results',
  data: any,
  additionalData?: any
) {
  let doc: jsPDF
  let filename: string

  switch (type) {
    case 'grammar':
      doc = generateGrammarPDF(data, true)
      filename = `grammar-${data.level}-${data.topic.replace(/\s+/g, '-')}.pdf`
      break

    case 'vocabulary':
      doc = generateVocabularyPDF(data, true)
      filename = `vocabulary-${data.level}-${data.type}.pdf`
      break

    case 'flashcards':
      doc = generateFlashcardsPDF(data)
      filename = `flashcards-${data.level}.pdf`
      break

    case 'paragraph':
      doc = generateParagraphPDF(data)
      filename = `reading-${data.level}.pdf`
      break

    case 'results':
      doc = generateGrammarResultsPDF(data, additionalData)
      filename = `results-${data.level}-${data.topic.replace(/\s+/g, '-')}.pdf`
      break

    default:
      throw new Error('Invalid PDF type')
  }

  downloadPDF(doc, filename)
}
