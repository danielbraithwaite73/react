type HeadingProps = {
  title: string
  subtitle: string
}

export function Heading({ title, subtitle }: HeadingProps) {
  return (
    // Keeps page context and team count visible above the card grid.
    <header className="heading">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}
