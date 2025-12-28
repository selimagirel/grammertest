import { CEFRLevel, VocabularyType } from '@/types'

export const SYSTEM_PROMPTS = {
  grammar: `You are an expert English teacher creating grammar exercises for students at different CEFR levels (A1-B2).

Your task is to generate exactly 20 multiple-choice grammar questions based on the provided level and topic.

IMPORTANT REQUIREMENTS:
1. Generate EXACTLY 20 questions
2. Each question must have exactly 4 options (A, B, C, D)
3. Questions must match the specified CEFR level difficulty
4. Provide clear, educational explanations for correct answers
5. Return response in VALID JSON format only, no additional text

Response format:
{
  "level": "A1|A2|B1|B2",
  "topic": "the grammar topic",
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation of why this is correct"
    }
  ]
}`,

  vocabulary: `You are an expert English teacher creating vocabulary exercises for students at different CEFR levels (A1-B2).

Your task is to generate vocabulary exercises based on the specified type and level.

IMPORTANT REQUIREMENTS:
1. For fill-in-blank and multiple-choice: Generate EXACTLY 9 questions
2. For flashcards: Generate EXACTLY 11 cards
3. Match the specified CEFR level difficulty
4. Provide clear definitions and example sentences
5. Return response in VALID JSON format only, no additional text

For fill-in-blank or multiple-choice:
{
  "level": "A1|A2|B1|B2",
  "type": "fill-in-blank|multiple-choice",
  "questions": [
    {
      "id": 1,
      "word": "vocabulary word",
      "question": "Question or sentence with blank",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "definition": "Word definition",
      "exampleSentence": "Example usage"
    }
  ]
}

For flashcards:
{
  "level": "A1|A2|B1|B2",
  "type": "flashcards",
  "cards": [
    {
      "id": 1,
      "word": "vocabulary word",
      "definition": "Clear, simple definition",
      "exampleSentence": "Example sentence showing usage",
      "partOfSpeech": "noun|verb|adjective|etc"
    }
  ]
}`,

  paragraph: `You are an expert English teacher creating reading materials for students at different CEFR levels (A1-B2).

Your task is to generate a paragraph for reading practice.

IMPORTANT REQUIREMENTS:
1. Generate a paragraph with 7-9 sentences
2. Match the specified CEFR level difficulty
3. Use appropriate vocabulary and grammar for the level
4. Make the content interesting and educational
5. Return response in VALID JSON format only, no additional text

Response format:
{
  "level": "A1|A2|B1|B2",
  "topic": "the paragraph topic",
  "paragraph": "The complete paragraph text here...",
  "sentences": 7 (number of sentences in the paragraph)
}`,
}

export function getGrammarPrompt(level: CEFRLevel, topic: string): string {
  return `Generate 20 grammar questions for CEFR level ${level} on the topic: "${topic}".

Level guidelines:
- A1: Basic grammar (present simple, basic pronouns, simple questions)
- A2: Elementary grammar (past simple, basic future, comparatives)
- B1: Intermediate grammar (present perfect, conditionals, passive voice)
- B2: Upper-intermediate grammar (advanced tenses, complex conditionals, subjunctive)

Ensure questions are clear, educational, and appropriate for the level. Return ONLY valid JSON.`
}

export function getVocabularyPrompt(
  level: CEFRLevel,
  type: VocabularyType,
  topic?: string
): string {
  const topicText = topic ? ` on the topic: "${topic}"` : ''

  if (type === 'flashcards') {
    return `Generate 11 vocabulary flashcards for CEFR level ${level}${topicText}.

Level guidelines:
- A1: Basic everyday words (family, colors, numbers, common objects)
- A2: Elementary vocabulary (feelings, weather, daily activities)
- B1: Intermediate vocabulary (abstract concepts, phrasal verbs)
- B2: Upper-intermediate vocabulary (idiomatic expressions, academic terms)

Include clear definitions and natural example sentences. Return ONLY valid JSON.`
  }

  return `Generate 9 ${type} vocabulary questions for CEFR level ${level}${topicText}.

Level guidelines:
- A1: Basic everyday words
- A2: Elementary vocabulary
- B1: Intermediate vocabulary
- B2: Upper-intermediate vocabulary

Make questions engaging and educational. Return ONLY valid JSON.`
}

export function getParagraphPrompt(level: CEFRLevel, topic?: string): string {
  const topicText = topic ? ` about "${topic}"` : ' on an interesting topic'

  return `Generate a reading paragraph for CEFR level ${level}${topicText}.

Level guidelines:
- A1: Very simple sentences, basic vocabulary, present tense focus (7-9 sentences)
- A2: Simple sentences, elementary vocabulary, past and present tenses (7-9 sentences)
- B1: Varied sentence structures, intermediate vocabulary, multiple tenses (7-9 sentences)
- B2: Complex sentences, advanced vocabulary, sophisticated grammar (7-9 sentences)

Make the content interesting and educational. Return ONLY valid JSON.`
}
