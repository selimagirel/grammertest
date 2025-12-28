import Link from 'next/link'
import { BookOpenCheck, GraduationCap, Trophy, Star } from 'lucide-react'
import TrialCounter from '@/components/layout/TrialCounter'

const levels = [
  {
    id: 'A1',
    name: 'A1 - Beginner',
    description: 'Basic phrases and simple grammar',
    color: 'from-green-500 to-emerald-600',
    icon: BookOpenCheck,
  },
  {
    id: 'A2',
    name: 'A2 - Elementary',
    description: 'Common expressions and simple communication',
    color: 'from-blue-500 to-cyan-600',
    icon: GraduationCap,
  },
  {
    id: 'B1',
    name: 'B1 - Intermediate',
    description: 'Clear texts and complex conversations',
    color: 'from-purple-500 to-pink-600',
    icon: Star,
  },
  {
    id: 'B2',
    name: 'B2 - Upper Intermediate',
    description: 'Abstract topics and fluent interactions',
    color: 'from-orange-500 to-red-600',
    icon: Trophy,
  },
]

export default function LevelsPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <TrialCounter />
        <h1 className="text-4xl font-bold mt-8 mb-4 text-gradient">
          Choose Your CEFR Level
        </h1>
        <p className="text-xl text-gray-300">
          Select the level that matches your current English proficiency
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {levels.map((level) => {
          const Icon = level.icon
          return (
            <Link
              key={level.id}
              href={`/categories?level=${level.id}`}
              className="group"
            >
              <div className="card hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${level.color} p-4 rounded-xl`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {level.name}
                    </h3>
                    <p className="text-gray-400">{level.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Not sure about your level?</h3>
          <p className="text-gray-400 mb-4">
            Choose the level you feel most comfortable with. You can always switch to a different
            level later.
          </p>
          <div className="text-sm text-gray-500">
            <p className="mb-2">
              <strong>A1:</strong> Can understand basic phrases and introduce yourself
            </p>
            <p className="mb-2">
              <strong>A2:</strong> Can describe experiences and handle simple conversations
            </p>
            <p className="mb-2">
              <strong>B1:</strong> Can understand main points and express opinions
            </p>
            <p>
              <strong>B2:</strong> Can interact fluently and understand complex texts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
