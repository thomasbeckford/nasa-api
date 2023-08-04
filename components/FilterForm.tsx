'use client'
import { useFormContext } from 'react-hook-form'
import { Rover, Camera } from '@/enums'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import {
  Button,
  Box,
  Input,
  FormLabel,
  FormControl,
  Select,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { SearchContext } from '@/context/SearchContext'
import { FormDataType, SearchValuesType } from '@/types'
import { useMediaQuery } from '@chakra-ui/react'

type FilterFormProps = {
  onSubmit: (data: FormDataType) => void
}

export default function FilterForm(props: FilterFormProps) {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { onSubmit } = props
  const { register, handleSubmit, reset, getValues } =
    useFormContext<FormDataType>()

  const {
    addSearchHistoryItem,
    selectedSearchHistoryItem,
    removeSearchHistoryItem,
    setSelectedSearchHistoryItem,
  } = useContext(SearchContext)

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data)
  })

  const resetFilters = () => {
    reset()
  }

  const handleSaveSearch = () => {
    const values = getValues() as SearchValuesType
    const id = values.rover + values.sol + values.earthDate + values.camera
    values.id = id
    addSearchHistoryItem(values)
  }

  const handleDeleteSearch = () => {
    if (selectedSearchHistoryItem) {
      removeSearchHistoryItem(selectedSearchHistoryItem)
      setSelectedSearchHistoryItem(null)
    }
  }

  return (
    <Box w="full" px={4} pt={10} pb={5}>
      <form onSubmit={handleFormSubmit}>
        <SimpleGrid columns={2} spacing={12} mb={5}>
          <Box>
            <FormControl variant="floating" id="rover" placeholder="">
              <Select id="rover" {...register('rover')}>
                {Object.values(Rover).map((rover) => (
                  <option key={rover} value={rover}>
                    {capitalizeFirstLetter(rover)}
                  </option>
                ))}
              </Select>

              <FormLabel>Rover</FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl variant="floating" id="sol">
              <Input
                id="sol"
                placeholder=""
                type="number"
                {...register('sol')}
              />
              <FormLabel>Sol</FormLabel>
            </FormControl>
          </Box>

          <Box>
            <FormControl variant="floating" id="earth-date">
              <Input
                id="earth-date"
                placeholder=""
                type="date"
                {...register('earthDate')}
              />
              <FormLabel>Earth Date</FormLabel>
            </FormControl>
          </Box>

          <Box>
            <FormControl variant="floating" id="camera">
              <Select id="camera" {...register('camera')}>
                {Object.values(Camera).map((camera) => (
                  <option key={camera} value={camera}>
                    {camera}
                  </option>
                ))}
              </Select>
              <FormLabel>Camera</FormLabel>
            </FormControl>
          </Box>
        </SimpleGrid>

        <Flex>
          <Flex justify="left" w="full" gap={5}>
            <Button colorScheme="blue" type="submit">
              Search photos
            </Button>
            <Button colorScheme="red" type="reset" onClick={resetFilters}>
              Reset filters
            </Button>
          </Flex>

          <Flex justify="right" w="full" gap={5}>
            {selectedSearchHistoryItem && !isMobile ? (
              <Button
                variant="outline"
                colorScheme="red"
                onClick={handleDeleteSearch}
              >
                Delete selected search
              </Button>
            ) : null}
            <Button
              variant="outline"
              colorScheme="green"
              onClick={handleSaveSearch}
            >
              Save search
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  )
}
