export interface FileResponse {
  url: string
  name: string
}

export interface FileUploadDto {
  file: FormData
  folder?: string
}
