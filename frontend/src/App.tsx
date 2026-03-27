import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Heading } from './components/Heading'
import { TeamList } from './components/TeamList'
import type { Team } from './types/team'

// Resolve the JSON file from src so Vite can fingerprint and serve it correctly.
const teamsDataUrl = new URL('./CollegeBasketballTeams.json', import.meta.url).href

type RawTeam = {
  school?: string
  School?: string
  schoolName?: string
  mascot?: string
  Mascot?: string
  mascotName?: string
  name?: string
  city?: string
  City?: string
  state?: string
  State?: string
}

type RawTeamsResponse = RawTeam[] | { teams?: RawTeam[] }

function extractTeams(data: RawTeamsResponse): RawTeam[] {
  // Support both assignment formats: top-level array or { teams: [...] }.
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data.teams)) {
    return data.teams
  }

  return []
}

function normalizeTeam(rawTeam: RawTeam, index: number): Team {
  // Normalize inconsistent key names so rendering code can stay simple.
  return {
    id: `${rawTeam.school ?? rawTeam.School ?? rawTeam.schoolName ?? 'team'}-${index}`,
    school:
      rawTeam.school ??
      rawTeam.School ??
      rawTeam.schoolName ??
      'Unknown School',
    mascot:
      rawTeam.mascot ??
      rawTeam.Mascot ??
      rawTeam.mascotName ??
      rawTeam.name ??
      'Unknown Mascot',
    city: rawTeam.city ?? rawTeam.City ?? 'Unknown City',
    state: rawTeam.state ?? rawTeam.State ?? 'Unknown State',
  }
}

function App() {
  const [teams, setTeams] = useState<Team[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        // Load team data from the local JSON file in src.
        const response = await fetch(teamsDataUrl)
        if (!response.ok) {
          throw new Error(`Failed to load JSON (${response.status})`)
        }

        const rawData = (await response.json()) as RawTeamsResponse
        const rawTeams = extractTeams(rawData)
        const normalizedTeams = rawTeams.map((team, index) => normalizeTeam(team, index))
        setTeams(normalizedTeams)
        setErrorMessage('')
      } catch (error) {
        // Keep the app usable and provide actionable guidance if data load fails.
        const message =
          error instanceof Error ? error.message : 'Unknown error while loading teams.'
        setErrorMessage(
          `Could not load team data. Replace src/CollegeBasketballTeams.json with your downloaded file. (${message})`,
        )
      }
    }

    void loadTeams()
  }, [])

  const headingSubtitle = useMemo(
    () => `Browse NCAA schools, mascots, and locations (${teams.length} teams).`,
    [teams.length],
  )

  return (
    <main className="app">
      <Heading
        title="NCAA College Basketball Teams"
        subtitle={headingSubtitle}
      />
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <TeamList teams={teams} />
    </main>
  )
}

export default App
