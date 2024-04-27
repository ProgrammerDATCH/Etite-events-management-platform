import React from 'react'
import { Blurhash } from 'react-blurhash'

const ImagePlaceHolder = ({width, height}) => {
    return (
        <Blurhash
            hash="LDD?Kkj[K5jZ2[ay2YbH|HfQN[a|"
            width={width}
            height={height}
            resolutionX={32}
            resolutionY={32}
            punch={1} />
    )
}

export default ImagePlaceHolder;