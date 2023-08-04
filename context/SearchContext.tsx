import React, { createContext, useState } from 'react'
import { SearchValuesType } from '@/types'
import { useToast } from '@chakra-ui/react'

type SearchContextValue = {
  searchHistory: SearchValuesType[]
  addSearchHistoryItem: (item: SearchValuesType) => void
  removeSearchHistoryItem: (item: SearchValuesType) => void
  clearSearchHistory: () => void
  setSelectedSearchHistoryItem: (item: SearchValuesType | null) => void
  selectedSearchHistoryItem: SearchValuesType | null
}

export const SearchContext = createContext<SearchContextValue>(
  {} as SearchContextValue
)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast()
  const [searchHistory, setSearchHistory] = useState<SearchValuesType[]>([])
  const [selectedSearchHistoryItem, setSelectedSearchHistoryItem] =
    useState<SearchValuesType | null>(null)

  const addSearchHistoryItem = (item: SearchValuesType) => {
    const itemExists = searchHistory.some(
      (i) => JSON.stringify(i) === JSON.stringify(item)
    )
    console.log('itemExists', itemExists)

    if (!itemExists) {
      setSearchHistory((prev) => [...prev, item])
    } else {
      toast({
        title: 'Search already exists',
        description: `You already have this search saved `,
        status: 'error',
      })
    }
  }

  const removeSearchHistoryItem = (item: SearchValuesType) => {
    const itemExists = item.rover + item.sol + item.earthDate + item.camera

    if (!itemExists) {
      toast({
        title: 'Search does not exist',
        description: `You do not have this search saved `,
        status: 'error',
      })
      return
    } else {
      console.log('Deleting', itemExists)

      const filterSearchHistoryByItemId = searchHistory.filter(
        (i) => i.id !== itemExists
      )

      setSearchHistory(filterSearchHistoryByItemId)

      toast({
        title: 'Search deleted',
        description: `You have deleted this search `,
        status: 'success',
      })
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        addSearchHistoryItem,
        removeSearchHistoryItem,
        clearSearchHistory,
        setSelectedSearchHistoryItem,
        selectedSearchHistoryItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
