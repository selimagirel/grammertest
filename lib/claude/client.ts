import Anthropic from '@anthropic-ai/sdk'
import {
  CEFRLevel,
  VocabularyType,
  GrammarExercise,
  VocabularyExercise,
  FlashcardSet,
  ParagraphExercise,
} from '@/types'
import {
  SYSTEM_PROMPTS,
  getGrammarPrompt,
  getVocabularyPrompt,
  getParagraphPrompt,
} from './prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const MODEL = 'claude-sonnet-4-20250514'
const MAX_TOKENS = 4000

export async function generateGrammarExercise(
  level: CEFRLevel,
  topic: string
): Promise<GrammarExercise> {
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPTS.grammar,
      messages: [
        {
          role: 'user',
          content: getGrammarPrompt(level, topic),
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude API')
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }

    const exercise = JSON.parse(jsonMatch[0]) as GrammarExercise

    // Validate response
    if (!exercise.questions || exercise.questions.length !== 20) {
      throw new Error('Invalid exercise format: expected 20 questions')
    }

    return exercise
  } catch (error) {
    console.error('Error generating grammar exercise:', error)
    throw new Error('Failed to generate grammar exercise')
  }
}

export async function generateVocabularyExercise(
  level: CEFRLevel,
  type: VocabularyType,
  topic?: string
): Promise<VocabularyExercise | FlashcardSet> {
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPTS.vocabulary,
      messages: [
        {
          role: 'user',
          content: getVocabularyPrompt(level, type, topic),
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude API')
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }

    const exercise = JSON.parse(jsonMatch[0])

    // Validate response
    if (type === 'flashcards') {
      if (!exercise.cards || exercise.cards.length !== 11) {
        throw new Error('Invalid flashcard set format: expected 11 cards')
      }
      return exercise as FlashcardSet
    } else {
      if (!exercise.questions || exercise.questions.length !== 9) {
        throw new Error('Invalid vocabulary exercise format: expected 9 questions')
      }
      return exercise as VocabularyExercise
    }
  } catch (error) {
    console.error('Error generating vocabulary exercise:', error)
    throw new Error('Failed to generate vocabulary exercise')
  }
}

export async function generateParagraph(
  level: CEFRLevel,
  topic?: string
): Promise<ParagraphExercise> {
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPTS.paragraph,
      messages: [
        {
          role: 'user',
          content: getParagraphPrompt(level, topic),
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude API')
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }

    const exercise = JSON.parse(jsonMatch[0]) as ParagraphExercise

    // Validate response
    if (!exercise.paragraph || !exercise.sentences) {
      throw new Error('Invalid paragraph format')
    }

    if (exercise.sentences < 7 || exercise.sentences > 9) {
      throw new Error('Paragraph must have 7-9 sentences')
    }

    return exercise
  } catch (error) {
    console.error('Error generating paragraph:', error)
    throw new Error('Failed to generate paragraph')
  }
}
