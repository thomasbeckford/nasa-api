import React from 'react'
import { Button, Flex, Box, Text } from '@chakra-ui/react'
import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers'

interface PaginationProps {
  currentPage: number
  totalItems: number
  totalPhotos: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  totalPhotos,
  onPageChange,
}) => {
  console.log('itemsPerPage', itemsPerPage)

  const totalPages =
    totalItems < itemsPerPage ? 1 : Math.ceil(totalPhotos / itemsPerPage)

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
    }
  }

  return (
    <Box w="full" px={4} pt={10} pb={5}>
      <Text>
        {totalPages} of {totalPhotos} images
      </Text>
      <Flex w="full" justifyContent="center" my={10} gap={5}>
        <Button
          onClick={() => handlePageClick(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        {generatePaginationNumbers({
          currentPage,
          totalPages,
        }).map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={index}
              onClick={() => handlePageClick(page)}
              isDisabled={currentPage === page}
            >
              {page}
            </Button>
          ) : (
            <Button key={index} disabled>
              {page}
            </Button>
          )
        )}
        <Button
          onClick={() => handlePageClick(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  )
}

export default Pagination
