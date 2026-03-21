import { FaPaw, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}) => {
  // Generate page numbers to display
  const generatePaginationItems = () => {
    // Always show first page, last page, current page, and siblings
    const range = [];

    // Calculate range start and end
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Determine if we need to show dots
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    // Add first page
    if (totalPages > 1) {
      range.push(1);
    }

    // Add left dots if needed
    if (showLeftDots) {
      range.push('leftDots');
    }

    // Add pages between dots
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }

    // Add right dots if needed
    if (showRightDots) {
      range.push('rightDots');
    }

    // Add last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationItems = generatePaginationItems();

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-10 w-10 rounded-full mr-2 transition-all duration-300 ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
        }`}
        aria-label='Previous page'
      >
        <FaAngleLeft />
      </button>

      {/* Page numbers */}
      <div className='flex items-center space-x-2'>
        {paginationItems.map((item, index) => {
          if (item === 'leftDots' || item === 'rightDots') {
            return (
              <div
                key={`dots-${index}`}
                className='flex items-center justify-center h-10 w-10'
              >
                <div className='flex space-x-1'>
                  <div className='h-2 w-2 rounded-full bg-gray-300'></div>
                  <div className='h-2 w-2 rounded-full bg-gray-300'></div>
                  <div className='h-2 w-2 rounded-full bg-gray-300'></div>
                </div>
              </div>
            );
          }

          return (
            <button
              key={`page-${item}`}
              onClick={() => onPageChange(item)}
              className={`relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
                currentPage === item
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
              aria-label={`Page ${item}`}
              aria-current={currentPage === item ? 'page' : undefined}
            >
              {currentPage === item ? (
                <>
                  <FaPaw className='absolute text-white/20 text-xl animate-pulse' />
                  <span className='z-10'>{item}</span>
                </>
              ) : (
                item
              )}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center h-10 w-10 rounded-full ml-2 transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
        }`}
        aria-label='Next page'
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  className: PropTypes.string,
};

export default Pagination;
