'use client'

import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import Image from 'next/image'
import FilterForm from '../components/FilterForm'
import { useForm, FormProvider } from 'react-hook-form'
import usePhotos from '../hooks/usePhotos'
import {
  Box,
  Flex,
  SimpleGrid,
  Grid,
  GridItem,
  useMediaQuery,
} from '@chakra-ui/react'
import SearchHistory from '../components/SearchHistory'
import { Rover } from '@/enums'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const methods = useForm({
    defaultValues: {
      rover: Rover.Curiosity,
      sol: 1000,
      earthDate: new Date().toISOString().split('T')[0],
      camera: null,
    },
  })

  const { photos, loading, error, fetchPhotos, totalPhotos } = usePhotos({
    rover: methods.watch('rover'),
    sol: methods.watch('sol') ? Number(methods.watch('sol')) : null,
    earthDate: methods.watch('earthDate') || null,
    camera: methods.watch('camera') || null,
    currentPage,
  })

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const handleFormSubmit = () => {
    fetchPhotos()
  }

  useEffect(() => {
    fetchPhotos()
  }, [currentPage])

  return (
    <main>
      <Box bg="gray.800" w="full" h="100vh">
        <Grid
          templateAreas={
            !isMobile
              ? `"saved filter"
                 "saved content"`
              : `"filter"
                 "content"`
          }
          templateRows={['100vh', '0fr']}
          templateColumns={!isMobile ? ['1fr', '20vw 1fr'] : ['1fr']}
          gap={4}
          p={5}
          height="100vh"
        >
          <FormProvider {...methods}>
            <GridItem
              bg="gray.700"
              borderRadius="lg"
              area="saved"
              display={!isMobile ? 'block' : 'none'}
            >
              <SearchHistory />
            </GridItem>
            <GridItem bg="gray.700" borderRadius="lg" area="filter">
              <FilterForm onSubmit={handleFormSubmit} />
            </GridItem>
          </FormProvider>
          <GridItem
            bg="gray.700"
            borderRadius="lg"
            area="content"
            overflowY="auto"
          >
            <Box textAlign="center" py={[0, 0, 0, 5]}>
              {loading ? (
                <p>Loading images...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : photos.length === 0 ? (
                <p>No images found</p>
              ) : (
                <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={2}>
                  {photos.map((photo) => (
                    <Image
                      key={photo.id}
                      src={photo.img_src}
                      alt={photo.camera.full_name}
                      style={{ borderRadius: '10px' }}
                      width={300}
                      height={300}
                      quality={50}
                    />
                  ))}
                </SimpleGrid>
              )}
            </Box>

            {photos.length && !loading ? (
              <Flex align="center" w="full" textAlign="center">
                <Pagination
                  currentPage={currentPage}
                  totalItems={photos.length}
                  totalPhotos={totalPhotos}
                  itemsPerPage={25}
                  onPageChange={handlePageChange}
                />
              </Flex>
            ) : null}
          </GridItem>
        </Grid>
      </Box>
    </main>
  )
}
