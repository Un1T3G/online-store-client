import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { routes } from 'shared/config'
import { Button, Container } from 'shared/ui'

export const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center py-32">
      <Container className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl md:text-5xl text-center font-bold">
          Ваш шопинг ваше удовольствие -<br />
          <span className="text-blue-500">все в одном месте</span>
        </h1>
        <p className="text-muted-foreground text-center">
          Добро пожаловать в наш интернет-магазин-уникальный платформу для
          комфортных и безопасных <br /> покупок. Мы предлагаем широкий выбор
          товаров,
        </p>
        <Button variant="default" asChild>
          <Link href={routes.catalog}>
            За покупками
            <ArrowRight />
          </Link>
        </Button>
      </Container>
    </section>
  )
}
