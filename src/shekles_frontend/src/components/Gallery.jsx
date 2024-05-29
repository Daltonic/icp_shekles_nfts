import React, { useEffect, useState } from 'react'
import Item from './Item'
import { shekles_backend } from '../../../declarations/shekles_backend'
import CURRENT_USER_ID from '../main'

const Gallery = ({ title }) => {
  const [collection, setCollection] = useState([])

  const getNFTs = async () => {
    const userNFTIds = await shekles_backend.userCollection(CURRENT_USER_ID)
    setCollection(userNFTIds)
  }

  useEffect(() => {
    if (title == 'My NFTs') {
      getNFTs()
    }else {
      setCollection([])
    }
  }, [title])

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {collection.map((nftID, i) => (
              <Item id={nftID} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
