export interface AuthLoginDto {
  email: string
  password: string
}

export interface AuthGetNewTokensDto {
  refreshToken: string
}

export interface AuthRegisterDto {
  name?: string
  email: string
  password: string
  avatarUrl?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}
