import React, { useEffect, useState } from 'react'
import { shekles_backend } from 'declarations/shekles_backend'
import CURRENT_USER_ID from '../main'
import Item from './Item'

const Gallery = ({ title, role }) => {
  const [collection, setCollection] = useState([])

  const getUserNFTs = async () => {
    const userNFTIds = await shekles_backend.userCollection(CURRENT_USER_ID)
    setCollection(userNFTIds)
  }

  const getNFTs = async () => {
    const nftIds = await shekles_backend.allCollection()
    setCollection(nftIds)
  }

  useEffect(() => {
    if (role) {
      getUserNFTs()
    } else {
      getNFTs()
    }
  }, [role, title])

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {collection.map((nftID, i) => (
              <Item id={nftID} key={i} role={role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
