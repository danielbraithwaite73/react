import { TeamCard } from './TeamCard'
import type { Team } from '../types/team'

type TeamListProps = {
  teams: Team[]
}

export function TeamList({ teams }: TeamListProps) {
  return (
    // Render a stable list keyed by normalized team id.
    <section aria-label="Team list">
      <div className="team-list">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  )
}
