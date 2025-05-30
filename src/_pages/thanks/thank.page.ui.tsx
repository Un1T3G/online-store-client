import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { routes } from 'shared/config'
import { Button, Container } from 'shared/ui'

export const ThanksPage = () => {
  return (
    <section className="min-h-[calc(100dvh-2*64px)] flex items-center py-32">
      <Container className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl md:text-5xl text-center font-bold">
          Спасибо за покупку
        </h1>
        <p className="text-muted-foreground text-center">
          Спасибо за заказ, мы свяжемся с вами в ближайшее время
        </p>
        <Button variant="default" asChild>
          <Link href={routes.home}>
            Вернуться на главную
            <ArrowRight />
          </Link>
        </Button>
      </Container>
    </section>
  )
}
