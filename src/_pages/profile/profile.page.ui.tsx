'use client'

import { FileSingleImageUpload } from 'features/files'
import { UserUpdateAddressForm, UserUpdateProfileForm } from 'features/users'
import { TriangleAlert } from 'lucide-react'
import { UserResponse } from 'shared/api'
import { Card, Container } from 'shared/ui'

interface IProps {
  user: UserResponse
}

export const ProfilePage = ({ user }: IProps) => {
  return (
    <div className="flex-1 py-4">
      <Container className="space-y-4">
        <h1 className="text-2xl font-bold">Профиль</h1>
        {!user.address && (
          <Card className="p-4 flex flex-row gap-0 space-x-2 w-full">
            <div>
              <TriangleAlert className="text-red-500" />
            </div>
            <p>
              Пока вы не указываите адрес доставки вы не сможете оформить заказ!
            </p>
          </Card>
        )}
        <div className="flex flex-col md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-4">
          <Card className="p-4 w-full md:w-sm">
            <UserUpdateProfileForm
              initialValues={{
                name: user.name,
                avatarUrl: user.avatarUrl,
              }}
              renderImageUpload={(props) => (
                <FileSingleImageUpload {...props} />
              )}
            />
          </Card>
          <Card className="p-4 flex-1">
            <UserUpdateAddressForm initialValues={user.address} />
          </Card>
        </div>
      </Container>
    </div>
  )
}
