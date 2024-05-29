import React, { useEffect, useState } from 'react'
import { Actor, HttpAgent } from '@dfinity/agent'
import { idlFactory } from '../../../declarations/nft'
import Button from './Button'
import { shekles_backend } from '../../../declarations/shekles_backend'

function Item({ id }) {
  const [nft, setNft] = useState(null)
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')
  const [inputing, setInputing] = useState(false)
  const [processing, setProcessing] = useState(false)

  const localhost = 'http://127.0.0.1:8080'
  const agent = new HttpAgent({ host: localhost })
  // TODO: Remove when deploying live
  agent.fetchRootKey()

  const loadNFT = async () => {
    const NFTActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    })

    const name = await NFTActor.getName()
    const asset = await NFTActor.getAsset()
    const imageContent = new Uint8Array(asset)
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: 'image/png' })
    )

    const owner = await NFTActor.getOwner()
    const itemListed = await shekles_backend.isListed(id)
    setNft({ name, image, owner: owner.toText(), itemListed })
  }

  useEffect(() => {
    loadNFT()
  }, [])

  useEffect(() => {
    if (processing) {
      setTimeout(() => {
        setMessage('')
        setProcessing(false)
      }, 3000) // 3000 milliseconds = 3 seconds
    }
  }, [message])

  const handleConfirm = async () => {
    setProcessing(true)
    const msg = await shekles_backend.listItem(id, Number(price))
    setMessage(msg)
    setInputing(false)
    setPrice('')

    if (msg == 'Success') {
      const shekleId = await shekles_backend.getSheklesCanisterId()
      const NFTActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: id,
      })
      const transferResult = await NFTActor.transferOwnership(shekleId)
      setMessage(transferResult)
    }
    setProcessing(false)
    loadNFT()
  }

  return (
    nft && (
      <div className="disGrid-item">
        <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
          <img
            className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
            src={nft.image}
            style={{ filter: !nft.itemListed ? 'blur(0px)' : 'blur(4px)' }}
          />

          {processing && (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}

          <div className="disCardContent-root">
            <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
              {nft.name}
              {nft.itemListed && <span className="purple-text"> Listed</span>}
            </h2>
            <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
              {message == ''
                ? `Owner: ${!nft.itemListed ? nft.owner : 'Shekles'}`
                : message}
            </p>

            {inputing && (
              <input
                placeholder="Price in Shekles"
                type="number"
                className="price-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            )}

            {inputing && <Button text="Confirm" handleClick={handleConfirm} />}
            {!inputing && !nft.itemListed && (
              <Button text="Sell" handleClick={() => setInputing(true)} />
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default Item
