import React, {Component, useContext} from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import img1 from '../assets/images/clothes/image1.jpeg'
import img2 from '../assets/images/clothes/image1.jpeg'
import img3 from '../assets/images/clothes/image1.jpeg'
import img4 from '../assets/images/clothes/image1.jpeg'
import AppContext from "../context/AppContext";

const imageList = [img1, img2, img3, img4];

const ImagePick= () => {

    const {onPick, image} = useContext(AppContext);

        return (
            <div>
                <ImagePicker
                    images={imageList.map((image, i) => ({src: image, value: i}))}
                    onPick={onPick}
                />

                <button type="button" onClick={() => console.log(image)}>OK</button>
            </div>
        )
}

export default ImagePick