import { Box, Heading } from '@chakra-ui/react'
import { useContext } from 'react'
import { SearchContext } from '@/context/SearchContext'
import { SearchValuesType, FormDataType } from '@/types'
import { useFormContext } from 'react-hook-form'

export default function SearchHistory() {
  const {
    searchHistory,
    setSelectedSearchHistoryItem,
    selectedSearchHistoryItem,
  } = useContext(SearchContext)

  const { reset } = useFormContext<FormDataType>()

  const handleSearch = (search: SearchValuesType) => {
    const selected = searchHistory.find(
      (item) => JSON.stringify(item) === JSON.stringify(search)
    )
    if (!selected) return
    reset(selected)
    setSelectedSearchHistoryItem(selected)
  }

  const colorFromIdHsla = (id: number) => {
    const hue = id * 137.508
    return `hsla(${hue}, 30%, 35%, 1)`
  }

  return (
    <Box>
      <Heading
        size="md"
        h={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        Saved Searches
      </Heading>

      {searchHistory.length === 0 ? (
        <Box py={10} w="full" textAlign="center">
          No saved searches yet...
        </Box>
      ) : (
        searchHistory.map((search, index) => (
          <Box
            key={search.rover + search.sol + search.earthDate + search.camera}
            mb={2}
            w="95%"
            mx="auto"
            px={5}
            borderRadius="lg"
            cursor="pointer"
            borderWidth={2}
            fontWeight={
              selectedSearchHistoryItem && selectedSearchHistoryItem === search
                ? 'bold'
                : 'normal'
            }
            color={
              selectedSearchHistoryItem && selectedSearchHistoryItem === search
                ? 'gray.100'
                : 'gray.200'
            }
            borderColor={
              selectedSearchHistoryItem && selectedSearchHistoryItem === search
                ? 'gray.500'
                : 'gray.200'
            }
            bg={
              selectedSearchHistoryItem && selectedSearchHistoryItem === search
                ? 'gray.500'
                : colorFromIdHsla(index)
            }
            py={1}
            onClick={() => handleSearch(search)}
          >
            <Box>Saved search #{index}</Box>
            <Box>Rover: {search.rover}</Box>
          </Box>
        ))
      )}
    </Box>
  )
}
