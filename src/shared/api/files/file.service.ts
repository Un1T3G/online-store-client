import { fetchAuth } from '../fetch'
import { FileResponse, FileUploadDto } from './file.types'

class FileService {
  upload(dto: FileUploadDto) {
    return fetchAuth.post<FileResponse[]>('files', dto.file, {
      params: {
        folder: dto.folder,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export const fileService = new FileService()
