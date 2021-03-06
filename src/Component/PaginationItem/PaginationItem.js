import PropTypes from 'prop-types'

const PaginationItem = ({ postPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumber = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <nav>
      <ul className="pagination justify-content-end">
        {pageNumber.map(number => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? 'page-link bg-info text-white' : 'page-link hover'}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default PaginationItem

PaginationItem.propTypes = {
  postPerPage: PropTypes.any.isRequired,
  totalPosts: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
}
