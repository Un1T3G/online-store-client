import { MutationOptions, useMutation } from '@tanstack/react-query'
import { FileResponse, FileUploadDto, fileService } from 'shared/api'

export const fileKeys = {
  upload: ['file', 'upload'],
}

export const useFileUploadMutation = (
  options?: MutationOptions<FileResponse[], Error, FileUploadDto>
) => {
  return useMutation({
    mutationKey: fileKeys.upload,
    mutationFn: (dto: FileUploadDto) => fileService.upload(dto),
    ...options,
  })
}
