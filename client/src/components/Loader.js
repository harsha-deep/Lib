import React from 'react'

function Loader() {
  return (
    <div className='loader-parent' data-testid='loader-parent'>
      <div className='loader' data-testid='loader'></div>
    </div>
  )
}

export default Loader