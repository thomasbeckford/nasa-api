type Props = {
  currentPage: number
  totalPages: number
}

export const generatePaginationNumbers = (props: Props) => {
  const { currentPage, totalPages } = props

  const pagesToShowAroundCurrent = 1 // Number of page numbers to show around the current page
  const ellipsisThreshold = 2 // Number of pages required to show the ellipsis

  const showAllPagesWithoutEllipsis =
    totalPages <= pagesToShowAroundCurrent * 2 + ellipsisThreshold * 2

  if (showAllPagesWithoutEllipsis) {
    // Show all page numbers without ellipsis if total pages are small
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  // Show page numbers with ellipsis
  const pages = []
  const startPage = Math.max(1, currentPage - pagesToShowAroundCurrent)
  const endPage = Math.min(totalPages, currentPage + pagesToShowAroundCurrent)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  const needEllipsisBefore = startPage > ellipsisThreshold + 1
  if (needEllipsisBefore) {
    // Add an ellipsis before the first page number
    pages.unshift('...')
  }

  const needEllipsisAfter = endPage < totalPages - ellipsisThreshold
  if (needEllipsisAfter) {
    // Add an ellipsis after the last page number
    pages.push('...')
  }

  return pages
}
