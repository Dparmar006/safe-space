import React from 'react'
import CommunityTile from './CommunityTile'

const CommunityList = ({ cummunities = [] }) => {
  return (
    <>
      <h3 className='text-bold text-lg'>Communities</h3>
      <ul>
        {cummunities.map((cummunitiy, _id) => (
          <CommunityTile key={_id} cummunitiy={cummunitiy} />
        ))}
      </ul>
    </>
  )
}

export default CommunityList
