import "../../Styles/constructor.css"
import UploadIcon from "../../Images/upload.png"
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Draggable from 'react-draggable';

function Constructor(){
    const [isFile1Uploaded, setIsFile1Uploaded] = useState(false);
    const [isFile2Uploaded, setIsFile2Uploaded] = useState(false);
    const [isDetectStarted, setIsDetectStarted] = useState(false);
    const [isConstructionStoped, setIsConstructionStoped] = useState(false);

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
        var dragImage = document.getElementById("draggImageId");
        console.log(dragImage.width + " " + dragImage.height)
        var newPosition = {
            x: position.x*25/134 + 50 - (dragImage.width*25/140)/2,
            y: position.y*5/17 + 50 - (dragImage.height*5/19)/2
        };
        
        if (croppedImage) {
            setCroppedImages([
                ...croppedImages,
                { src: croppedImage, position: {...newPosition}, width:croppedImageDimensions.width, height: croppedImageDimensions.height  },
            ]);
            setCroppedImage(null);
            setPosition({ x: 0, y: 0 });
        }
        console.log(croppedImages);
    };

    function clearCrops(){
        setCroppedImages([]);
    }
    const handleDrag = (e, data) => {
        console.log(data);
        setPosition({ x: data.x, y: data.y });
    };

    const onDrop = useCallback((acceptedFiles) => {
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        
        document.getElementById("uploadedImage1Id").src = imageUrl;
        document.querySelector(".FirstImageBoxUploaded").style.display = 'flex';
        setIsFile1Uploaded(true);
     }, []);
 
     const { getRootProps } = useDropzone({ onDrop });

     const onDrop2 = useCallback((acceptedFiles) => {
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        setImage2Url(imageUrl);
        document.querySelector(".SecondImageBoxUploaded").style.display = 'flex';
        setIsFile2Uploaded(true);
    }, []);

    const { getRootProps: getRootPropsSecond } = useDropzone({ onDrop: onDrop2 });
    function tryAgainClick(){
        setIsFile1Uploaded(false);
        document.querySelector('.FirstImageBoxUploaded').style.display = 'none';
    }
    function tryAgain2Click(){
        setIsFile2Uploaded(false);
        document.querySelector('.SecondImageBoxUploaded').style.display = 'none';
    }
    function startConstructing(){
        setIsDetectStarted(true);
        setIsConstructionStoped(false);
        setImage1Url(document.getElementById("uploadedImage1Id").src);
    }
    function StopConstructing(){
        setIsConstructionStoped(true);
        setIsDetectStarted(false);
    }

    function tryOtherImages(){
        setImage1Url(null);
        setImage2Url(null);
        setIsFile1Uploaded(false);
        setIsFile2Uploaded(false);
        setCroppedImages([]);
        setCroppedImage(null);
        setIsConstructionStoped(false);
        setIsDetectStarted(false);
    }
    function SaveImageToGallery(){
        const imageUrl = document.getElementById("uploadedImageId").src;
        
        fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const formdata = new FormData();
            formdata.append("File", blob, "image.jpg");
            formdata.append("Style", "Georgian");
            formdata.append("Email", "admin@test.com");

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch("http://localhost:5038/api/Gallery", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        })
        .catch(error => console.error(error));
    }
    const downloadMergedImage = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        var uploadedImage2Id = document.getElementById("uploadedImage2Id");
    
        canvas.width = uploadedImage2Id.width;
        canvas.height = uploadedImage2Id.height;
    
        ctx.drawImage(uploadedImage2Id, 0, 0);
    
        croppedImages.forEach(img => {
            const image = new Image();
            const x = (img.position.x / 100) * uploadedImage2Id.width;
            const y = (img.position.y / 100) * uploadedImage2Id.height;
            const width = img.width ;
            const height = img.height;
            image.src = img.src;

            ctx.drawImage(image, x, y, width, height);
        });
    
        const imageURL = canvas.toDataURL('image/png');
        fetch(imageURL)
        .then(response => response.blob())
        .then(blob => {
            const formdata = new FormData();
            formdata.append("File", blob, "image.jpg");
            formdata.append("Style", "Georgian");
            formdata.append("Email", "admin@test.com");

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch("http://localhost:5038/api/Gallery", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        })
        .catch(error => console.error(error));
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'merged_image.png';
    
        link.dispatchEvent(new MouseEvent('click'));
    };
    const handleImage2Load = (e) => {
        setImage2Dimensions({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
        });
    };

    return (
        <div>
            <div className="UploadImagesArea" >
                <div className="FirstImageBox" {...getRootProps()} style={{ display: isFile1Uploaded ? 'none' : 'flex' }} >
                <button className="UploadPhoto">
                        <img src={UploadIcon}></img>    
                    </button>
                    <div>
                        Drag and drop file here
                    </div>
                    
                </div>
                <div className="FirstImageBoxUploaded" style={{ display: isFile1Uploaded ? 'flex' : 'none' }}>
                    <img className="UploadedImageConstructor" id="uploadedImage1Id" style={{ display: image1Url == null ? 'flex' : 'none' }}></img>
                    <Cropper className="UploadedImageConstructor" 
                        style={{ display: image1Url == null ? 'none' : 'flex' }}
                        src={image1Url}
                        initialAspectRatio={NaN}
                        aspectRatio={NaN}
                        guides={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />
      
                </div>
                <div className="SecondImageBox" {...getRootPropsSecond()}  style={{ display: isFile2Uploaded ? 'none' : 'flex' }}>
                    <button className="UploadPhoto">
                            <img src={UploadIcon}></img>    
                        </button>
                        <div>
                            Drag and drop file here
                        </div>
                    </div>
                    <div className="SecondImageBoxUploaded" style={{ display: isFile2Uploaded ? 'flex' : 'none' }}>
                        {image2Url && (
                            <img className="UploadedImageConstructor" id="uploadedImage2Id" src={image2Url} alt="Uploaded" onLoad={handleImage2Load} />
                        )}
                        {croppedImages.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            className="CroppedImage"
                            style={{
                                position: 'absolute',
                                cursor: 'move',
                                left: `${(img.position.x)}%`,
                                top: `${(img.position.y)}%`,
                                width: `${(img.width / image2Dimensions.width) * 100}%`,
                                height: `${(img.height / image2Dimensions.height) * 100}%`,
                                
                            }}
                            alt={`Cropped ${index}`}
                        />
                        ))}
                        {croppedImage && (
                            <Draggable position={position} onDrag={handleDrag} bounds="parent">
                                <img src={croppedImage} className="CroppedImage" id="draggImageId" style={{
                                        position: 'absolute',
                                        cursor: 'move',
                                        width: `${(croppedImageDimensions.width / image2Dimensions.width) * 100}%`,
                                        height: `${(croppedImageDimensions.height / image2Dimensions.height) * 100}%`,
                                    }} alt="Cropped" />
                            </Draggable>
                        )}
                    </div>
            </div>

            <div className="BeforeConstructorArea" style={{ display: isFile1Uploaded && isFile2Uploaded && !isDetectStarted && !isConstructionStoped ? 'flex' : 'none' }}>
                <button className="TryAgainButton" onClick={tryAgainClick}>Try another picture</button>
                <button className="TryAgainButton" onClick={startConstructing}>Start constructing</button>
                <button className="TryAgainButton" onClick={tryAgain2Click}>Try another picture</button>

            </div>
            <div className="ConstructorArea" style={{ display: isDetectStarted && !isConstructionStoped ? 'flex' : 'none' }}>
                <button className="TryAgainButton" onClick={fixCroppedImage}>Fix last cropp</button>
                <button className="TryAgainButton" onClick={StopConstructing}>Stop constructing</button>
                <button className="TryAgainButton" onClick={clearCrops}>Clear cropps</button>
            </div>
            <div className="ConstructorArea" style={{ display: !isDetectStarted && isConstructionStoped ? 'flex' : 'none' }}>
                <button className="TryAgainButton" onClick={SaveImageToGallery}>Save To Gallery</button>
                <button className="TryAgainButton" onClick={startConstructing}>Start constructing</button>
                <button className="TryAgainButton" onClick={tryOtherImages}>Try other images</button>
                <button className="TryAgainButton" onClick={downloadMergedImage}>Save To Gallery</button>
            </div>           
        </div>
    );
}

export default Constructor;