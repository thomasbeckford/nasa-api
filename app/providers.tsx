'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SearchProvider } from '@/context/SearchContext'
import { theme } from './../theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </SearchProvider>
  )
}
