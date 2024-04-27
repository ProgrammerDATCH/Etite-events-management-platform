import React, { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';
import { blurhashImg } from './constants';

const ImageHolder = ({ src }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageWidth, setImageWidth] = useState(200);
    const [imageHeight, setImageHeight] = useState(200);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageWidth(img.naturalWidth);
            setImageHeight(img.naturalHeight);
            setImageLoaded(true);
        };
        img.src = src;
    }, [src]);

    return (
        <>
            <div style={{ display: imageLoaded ? 'none' : 'inline' }}>
                <Blurhash
                    hash={blurhashImg}
                    width={imageWidth}
                    height={imageHeight}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            </div>
            <img
                src={src}
                style={{ display: !imageLoaded ? 'none' : 'inline' }}
                width={imageWidth}
                height={imageHeight}
                alt="Placeholder"
            />
        </>
    );
};

export default ImageHolder;
