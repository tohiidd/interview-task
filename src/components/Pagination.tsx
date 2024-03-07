import { usePagination } from '../hooks/usePagination';

const DOTS = '...';

function Pagination({ currentPage, totalCount, perPage, paginate }): any {
  const totalPageCount = Math.ceil(totalCount / perPage);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    totalPageCount,
    perPage,
  });

  return (
    <div>
      <ul className="flex gap-2 mx-4">
        {/* Left navigation arrow */}
        <li className={`border-2 rounded-md p-1 cursor-pointer ${currentPage === 1 && 'hidden'}`} onClick={() => paginate(currentPage - 1)}>
          {'<'}
        </li>
        {paginationRange?.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={pageNumber} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li key={pageNumber} className={`border-2 rounded-md p-1 cursor-pointer ${pageNumber === currentPage && 'bg-slate-200'}`} onClick={() => paginate(number)}>
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li className={`border-2 rounded-md p-1 cursor-pointer ${currentPage === totalPageCount && 'hidden'}`} onClick={() => paginate(currentPage + 1)}>
          {'>'}
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
