import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { Actor, HttpAgent } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'
import { idlFactory } from '../../../declarations/nft'

function Item({ id }) {
  const [nft, setNft] = useState(null)

  const localhost = 'http://127.0.0.1:8080'
  const agent = new HttpAgent({ host: localhost })
  const canisterId = Principal.fromText(id)

  const loadNFT = async () => {
    const NFTActor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    })

    const name = await NFTActor.getName()
    const asset = await NFTActor.getAsset()
    const imageContent = new Uint8Array(asset)
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: 'image/png' })
    )
    const owner = await NFTActor.getOwner()
    setNft({ name, image, owner: owner.toText() })
  }

  useEffect(() => {
    loadNFT()
  }, [])

  return (
    nft && (
      <div className="disGrid-item">
        <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
          <img
            className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
            src={nft.image}
          />
          <div className="disCardContent-root">
            <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
              {nft.name}
              <span className="purple-text"></span>
            </h2>
            <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
              Owner: {nft.owner}
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default Item
