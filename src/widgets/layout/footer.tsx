import { AUTHOR_INFO } from 'shared/config'

export const Footer = () => {
  return (
    <footer className="h-16 mt-auto flex items-center justify-center border-t border-zinc-200 dark:border-zinc-700">
      <a target="_blank" href={AUTHOR_INFO.socials.github}>
        Сделано с ❤️ в 2025
      </a>
    </footer>
  )
}
