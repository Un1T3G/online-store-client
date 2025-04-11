import { ProductAttribute } from 'shared/api'
import { NoSSR } from 'shared/lib'
import { Card, Table, TableBody, TableCell, TableRow } from 'shared/ui'

interface IProps {
  attributes: ProductAttribute[]
}

export const ProductAttributes = ({ attributes }: IProps) => {
  return (
    <NoSSR>
      <Card className="p-4 mb-4 w-full">
        <Table>
          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.id} className="w-full last:border-b-0">
                <TableCell>{attribute.title}</TableCell>
                <TableCell className="whitespace-normal">
                  {attribute.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </NoSSR>
  )
}
