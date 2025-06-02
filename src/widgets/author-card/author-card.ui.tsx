'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AUTHOR_INFO } from 'shared/config'
import { cn, useBreakpoint } from 'shared/lib'
import { Button, Card } from 'shared/ui'
import { socialIcons } from './social-icons'

interface IProps {
  className?: string
  autoNameShorter?: boolean
}

export const AuthorCard = ({ className, autoNameShorter = false }: IProps) => {
  const useShortName = useBreakpoint('xxs')

  const name =
    useShortName && autoNameShorter
      ? AUTHOR_INFO.shortName
      : AUTHOR_INFO.fullName

  return (
    <Card className={cn('flex flex-row gap-0 p-4 space-x-4 w-full', className)}>
      <div className="relative rounded-lg w-[96px] h-[96px] overflow-hidden grow-0 shrink-0">
        <Image
          fill
          src="/avatar/author.png"
          alt={AUTHOR_INFO.username}
          className="object-cover"
        />
        <video
          src={AUTHOR_INFO.avatarVideo}
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between w-full min-w-[220px]">
        <h1 className="text-xl font-bold">{AUTHOR_INFO.username}</h1>
        <h2 className="text-base font-semibold text-muted-foreground mb-2">
          {name}
        </h2>
        <div className="flex space-x-2">
          {Object.keys(AUTHOR_INFO.socials).map((key) => (
            <Button key={key} variant="default" size="icon" asChild>
              <Link
                href={
                  AUTHOR_INFO.socials[
                    key as keyof typeof AUTHOR_INFO.socials
                  ] as string
                }
              >
                {socialIcons[key as keyof typeof socialIcons]}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
