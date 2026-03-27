import type { Team } from '../types/team'

type TeamCardProps = {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    // Single-responsibility presentational card for one school.
    <article className="team-card">
      <h2>{team.school}</h2>
      <p>
        <strong>Mascot:</strong> {team.mascot}
      </p>
      <p>
        <strong>Location:</strong> {team.city}, {team.state}
      </p>
    </article>
  )
}
