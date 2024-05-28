import React, { useState } from 'react'
import { shekles_backend } from '../../../declarations/shekles_backend'
import { Principal } from '@dfinity/principal'
import Item from './Item'

function Minter() {
  // State to hold the form data
  const [minting, setMinting] = useState(false)
  const [mintedId, setMintedId] = useState('')
  const [formData, setFormData] = useState({
    imageFile: null,
    collectionName: '',
  })

  // Handler for the file input change event
  const handleImageChange = async (event) => {
    const imageArray = await event.target.files[0].arrayBuffer()
    const imageByteData = [...new Uint8Array(imageArray)]
    setFormData({ ...formData, imageFile: imageByteData })
  }

  // Handler for the text input change event
  const handleCollectionNameChange = (event) => {
    setFormData({ ...formData, collectionName: event.target.value })
  }

  // Handler for the form submission
  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent the default form submission behavior
    setMinting(true)
    // Process the form data here
    const newMintID = await shekles_backend.mint(
      formData.imageFile,
      formData.collectionName
    )
    setMintedId(newMintID.toText())
    console.log(newMintID.toText())

    // Reset the form
    setFormData({
      imageFile: null,
      collectionName: '',
    })
    setMinting(false)
  }

  return mintedId == '' ? (
    <div className="minter-container">
      {minting && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Create NFT
      </h3>
      <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
        Upload Image
      </h6>
      <form
        className="makeStyles-form-109"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div className="upload-container">
          <input
            className="upload"
            type="file"
            accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
            onChange={handleImageChange}
            required
          />
        </div>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Collection Name
        </h6>
        <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
          <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
            <input
              placeholder="e.g. CryptoDunks"
              type="text"
              className="form-InputBase-input form-OutlinedInput-input"
              value={formData.collectionName}
              onChange={handleCollectionNameChange}
              required
            />
            <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
          </div>
        </div>
        <button
          type="submit"
          className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable"
        >
          Mint NFT
        </button>
      </form>
    </div>
  ) : (
    <div className="minter-container">
      <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Minted!
      </h3>
      <div className="horizontal-center">
        <Item id={mintedId} />
      </div>
    </div>
  )
}

export default Minter
