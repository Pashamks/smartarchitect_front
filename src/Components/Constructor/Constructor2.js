import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Draggable from 'react-draggable';
import "../../Styles/constructor.css"
import UploadIcon from "../../Images/upload.png"

function Constructor() {
    const [isFile1Uploaded, setIsFile1Uploaded] = useState(false);
    const [isFile2Uploaded, setIsFile2Uploaded] = useState(false);
    const [isDetectStarted, setIsDetectStarted] = useState(false);

    const [image1Url, setImage1Url] = useState(null);
    const [image2Url, setImage2Url] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [croppedImageDimensions, setCroppedImageDimensions] = useState({ width: 0, height: 0 });
    const [image2Dimensions, setImage2Dimensions] = useState({ width: 'auto', height: 'auto' });
    const [croppedImages, setCroppedImages] = useState([]);

    const cropperRef = useRef(null);

    const onCrop = () => {
        const cropper = cropperRef.current.cropper;
        const croppedCanvas = cropper.getCroppedCanvas();
        setCroppedImage(croppedCanvas.toDataURL());
        setCroppedImageDimensions({ width: croppedCanvas.width, height: croppedCanvas.height });
    };

    const fixCroppedImage = () => {
        if (croppedImage) {
            setCroppedImages([
                ...croppedImages,
                { src: croppedImage, position: { ...position }, width: croppedImageDimensions.width, height: croppedImageDimensions.height },
            ]);
            setCroppedImage(null);
            setPosition({ x: 0, y: 0 });
        }
    };

    const clearCrops = () => {
        setCroppedImages([]);
    };

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    const onDrop = useCallback((acceptedFiles) => {
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        setImage1Url(imageUrl);
        setIsFile1Uploaded(true);
    }, []);

    const { getRootProps } = useDropzone({ onDrop });

    const onDrop2 = useCallback((acceptedFiles) => {
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        setImage2Url(imageUrl);
        setIsFile2Uploaded(true);
    }, []);

    const { getRootProps: getRootPropsSecond } = useDropzone({ onDrop: onDrop2 });

    const tryAgainClick = () => {
        setIsFile1Uploaded(false);
        setImage1Url(null);
        setCroppedImage(null);
    };

    const tryAgain2Click = () => {
        setIsFile2Uploaded(false);
        setImage2Url(null);
        setCroppedImages([]);
    };

    const startConstructing = () => {
        setIsDetectStarted(true);
    };

    const handleImage2Load = (e) => {
        setImage2Dimensions({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
        });
    };

    return (
        <div>
            <div className="UploadImagesArea">
                <div className="FirstImageBox" {...getRootProps()} style={{ display: isFile1Uploaded ? 'none' : 'flex' }}>
                    <button className="UploadPhoto">
                        <img src={UploadIcon} alt="Upload Icon" />
                    </button>
                    <div>Drag and drop file here</div>
                </div>
                <div className="FirstImageBoxUploaded" style={{ display: isFile1Uploaded ? 'flex' : 'none' }}>
                    {image1Url && (
                        <Cropper
                            className="UploadedImageConstructor"
                            style={{ display: image1Url == null ? 'none' : 'flex' }}
                            src={image1Url}
                            guides={false}
                            crop={onCrop}
                            ref={cropperRef}
                        />
                    )}
                </div>
                <div className="SecondImageBox" {...getRootPropsSecond()} style={{ display: isFile2Uploaded ? 'none' : 'flex' }}>
                    <button className="UploadPhoto">
                        <img src={UploadIcon} alt="Upload Icon" />
                    </button>
                    <div>Drag and drop file here</div>
                </div>
                <div
                    className="SecondImageBoxUploaded"
                    style={{
                        display: isFile2Uploaded ? 'flex' : 'none',
                        position: 'relative',
                        width: image2Dimensions.width,
                        height: image2Dimensions.height,
                    }}
                >
                    {image2Url && (
                        <img
                            className="UploadedImageConstructor"
                            id="uploadedImage2Id"
                            src={image2Url}
                            alt="Uploaded"
                            onLoad={handleImage2Load}
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                    {croppedImages.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            className="CroppedImage"
                            style={{
                                position: 'absolute',
                                cursor: 'move',
                                left: `${(img.position.x / image2Dimensions.width) * 100}%`,
                                top: `${(img.position.y / image2Dimensions.height) * 100}%`,
                                width: `${(img.width / image2Dimensions.width) * 100}%`,
                                height: `${(img.height / image2Dimensions.height) * 100}%`,
                            }}
                            alt={`Cropped ${index}`}
                        />
                    ))}
                    {croppedImage && (
                        <Draggable position={position} onDrag={handleDrag} bounds="parent">
                            <img
                                src={croppedImage}
                                className="CroppedImage"
                                style={{
                                    position: 'absolute',
                                    cursor: 'move',
                                    width: `${(croppedImageDimensions.width / image2Dimensions.width) * 100}%`,
                                    height: `${(croppedImageDimensions.height / image2Dimensions.height) * 100}%`,
                                }}
                                alt="Cropped"
                            />
                        </Draggable>
                    )}
                </div>
            </div>

            <div className="BeforeConstructorArea" style={{ display: isFile1Uploaded && isFile2Uploaded && !isDetectStarted ? 'flex' : 'none' }}>
                <button className="TryAgainButton" onClick={tryAgainClick}>Try another picture</button>
                <button className="TryAgainButton" onClick={startConstructing}>Start constructing</button>
                <button className="TryAgainButton" onClick={tryAgain2Click}>Try another picture</button>
            </div>
            <div className="ConstructorArea" style={{ display: isDetectStarted ? 'flex' : 'none' }}>
                <button className="TryAgainButton" onClick={fixCroppedImage}>Fix last crop</button>
                <button className="TryAgainButton" onClick={tryAgain2Click}>Stop constructing</button>
                <button className="TryAgainButton" onClick={clearCrops}>Clear crops</button>
            </div>
        </div>
    );
}

export default Constructor;
