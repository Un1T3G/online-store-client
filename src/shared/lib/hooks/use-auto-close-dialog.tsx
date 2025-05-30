'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface IProps {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export const useAutoCloseDialog = ({ open, onOpenChange }: IProps) => {
  const pathname = usePathname()
  const canCloseRef = useRef<boolean>(false)

  useEffect(() => {
    if (canCloseRef.current) {
      onOpenChange(false)
      canCloseRef.current = false
      return
    }

    if (open) {
      canCloseRef.current = true
    }
  }, [pathname, open, onOpenChange, canCloseRef])
}
