import { ArrowRight, Container, Link } from 'lucide-react'
import { routes } from 'shared/config'
import { Button } from 'shared/ui'

export const ThanksPage = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center py-32">
      <Container className="flex flex-col items-center space-y-4">
        <h1 className="text-5xl text-center font-bold">Спасибо за покупку</h1>
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
