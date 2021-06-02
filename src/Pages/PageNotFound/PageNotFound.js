import React from 'react'
import ErrorLoading from '../../assets/errorPage.gif'

const PageNotFound = ({ text }) => {
  return (
    <div className='text-center pt-3 pb-5 bg-white'>
      <h2 className='text-danger font-weight-bold'>Oh no...! <br />
        {text ? text : 'Page not found'}
      </h2>
      <img src={ErrorLoading} alt="ErrorLoading" className='w-25 mt-4' />
    </div>
  )
}


export default PageNotFound
