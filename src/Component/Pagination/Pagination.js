import React, { useState, useEffect, useCallback, useRef } from "react"
// import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../Select/Select"

const sortOption = [
  {
    _id: 'nameASC',
    title: 'Name ASC',
  },
  {
    _id: 'nameDSC',
    title: 'Name DSC',
  },
  {
    _id: 'emailASC',
    title: 'Email ASC',
  },
  {
    _id: 'emailDSC',
    title: 'Email DSC',
  },
]

const Pagination = (props) => {

  const { pageData, changeUrlProps } = props;
  const entriesRef = useRef();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortOrder] = useState(1);
  const [pageArr, setPageArr] = useState([])

  const getPaginationGroup = useCallback(() => {
    let links = new Array(pageData.totalPage).fill().map((_, idx) => idx + 1);
    setPageArr(links)
  }, [pageData, setPageArr]);

  useEffect(() => {
    getPaginationGroup()
    return () => setPageArr([]);
  }, [getPaginationGroup])

  useEffect(() => {
    changeUrlProps({
      page,
      limit,
      sortBy,
      sortOrder,
    })
  }, [changeUrlProps, limit, page, sortBy, sortOrder]);

  const changePage = (i) => {
    setPage(i + 1);
    setCurrentPage(i + 1);
  }
  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
    setPage(pageData.previousPage)
  }
  const goToNextPage = () => {
    setPage(pageData.nextPage)
    setCurrentPage((page) => page + 1);
  }

  const handleEntries = () => {
    setTimeout(() => { setLimit(entriesRef.current.value) }, 500);
  }

  return (
    <>
      <div className="col-lg-5">
        <div className="form-row">
          <div className="col-6">
            <div className="form-group">
              <label>Show Entries</label>
              <input type="number" className="form-control" onChange={handleEntries} defaultValue={limit} ref={entriesRef} />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Sort By</label>
              <Select value={sortBy} type="select"
                changed={(e) => setSortBy(e.target.value)}
                options={sortOption} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${!pageData.previousPage && "disabled"}`}>
              <button className="page-link" onClick={goToPreviousPage}>
                {'<'}
              </button>
            </li>
            {pageArr.map((item, i) => (<li className={`page-item ${currentPage === item && "active"}`} key={"page" + i}>
              <button className="page-link" onClick={() => changePage(i)} >{i + 1}</button>
            </li>))}

            <li className={`page-item ${!pageData.nextPage && "disabled"}`}>
              <button className="page-link" onClick={goToNextPage}>
                {">"}
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </>
  )
}

export default Pagination