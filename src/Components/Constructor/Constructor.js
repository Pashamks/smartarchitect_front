import "../../Styles/constructor.css"
import UploadIcon from "../../Images/upload.png"
import Squere from "../../Images/dot-square.png"
import Circle from "../../Images/shape.png"
import Triangle from "../../Images/triangle.png"
import React, { useCallback, useRef, useState  } from 'react';
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
    const [isTriangleSelected, setIsTriangleSelected] = useState(false);
    const [isCircleSelected, setIsCircleSelected] = useState(false);

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
            let shape = 'square';
            if (isTriangleSelected) shape = 'triangle';
            if (isCircleSelected) shape = 'circle';
            setCroppedImages([
                ...croppedImages,
                { src: croppedImage, position: {...newPosition}, width:croppedImageDimensions.width, height: croppedImageDimensions.height, shape: shape  },
            ]);
            setCroppedImage(null);
            setPosition({ x: 0, y: 0 });
        }
    };

    function clearCrops(){
        setCroppedImages([]);
        setIsTriangleSelected(false);
        setIsCircleSelected(false);
        let cropBox = document.querySelector(".cropper-crop-box");
        let viewBox = document.querySelector(".cropper-view-box");
        cropBox.classList.remove("triangle-mask");
        viewBox.classList.remove("triangle-mask");
        viewBox.style.borderRadius = '0';
    }
    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });  
    };
    const handleStop = () => {
       
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

    function selectSquere(){
        const viewBox = document.querySelector('.cropper-view-box');
        if (viewBox) {
            viewBox.style.borderRadius = '0';
        }
        let cropBox = document.querySelector(".cropper-crop-box");

        cropBox.classList.remove("triangle-mask");
        viewBox.classList.remove("triangle-mask");
        setIsTriangleSelected(false);
        setIsCircleSelected(false);
    }

    function selectCircle(){
        document.querySelector(".cropper-crop-box").style["border-radius"] = "50%";
        document.querySelector(".cropper-view-box").style["border-radius"] = "50%";

        let cropBox = document.querySelector(".cropper-crop-box");
        let viewBox = document.querySelector(".cropper-view-box");
        let croppedImage = document.querySelector(".CroppedImage");

        cropBox.classList.remove("triangle-mask");
        viewBox.classList.remove("triangle-mask");
        setIsTriangleSelected(false);
        setIsCircleSelected(true);
    }
    function selectTriangleUp() {
        const roundViewBox = document.querySelector('.cropper-view-box');
        if (roundViewBox) {
            roundViewBox.style.borderRadius = '0';
        }

        let cropBox = document.querySelector(".cropper-crop-box");
        let viewBox = document.querySelector(".cropper-view-box");

        cropBox.classList.add("triangle-mask");
        viewBox.classList.add("triangle-mask");
        setIsTriangleSelected(true);
        setIsCircleSelected(false);
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

            fetch(process.env.REACT_APP_BUSINESS_LOGIC_URL + "/api/Gallery", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        })
        .catch(error => console.error(error));
    }
    const downloadMergedImage = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        var uploadedImage2Id = document.getElementById("uploadedImage2Id");
    
        canvas.width = uploadedImage2Id.width;
        canvas.height = uploadedImage2Id.height;
    
        ctx.drawImage(uploadedImage2Id, 0, 0);
        const loadImage = (img) => {
            return new Promise((resolve) => {
                const image = new Image();
                image.src = img.src;
                image.onload = () => resolve({ image, img });
            });
        };
        for (const img of croppedImages) {
            const { image, img: imgData } = await loadImage(img);
    
            const x = (imgData.position.x / 100) * uploadedImage2Id.width;
            const y = (imgData.position.y / 100) * uploadedImage2Id.height;
            const width = imgData.width;
            const height = imgData.height;
    
            ctx.save();
    
            if (imgData.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(x + width / 2, y);
                ctx.lineTo(x, y + height);
                ctx.lineTo(x + width, y + height);
                ctx.closePath();
                ctx.clip();
            } else if (imgData.shape === 'circle') {
                ctx.beginPath();
                ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
                ctx.clip();
            }
    
            ctx.drawImage(image, x, y, width, height);
            ctx.restore();
        }
    
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

            fetch(process.env.REACT_APP_BUSINESS_LOGIC_URL + "/api/Gallery", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        })
        .catch(error => console.error(error));
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
                    <div className="CroppArea">
                    <Cropper  
                        style={{ display: image1Url == null ? 'none' : 'flex' }}
                        src={image1Url}
                        initialAspectRatio={NaN}
                        aspectRatio={NaN}
                        guides={false}
                        viewMode={1}
                        background={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />
                    </div>
                    
                </div>
                <div className="BoxBetween" style={{ display: isFile1Uploaded && isFile2Uploaded && isDetectStarted ? 'flex' : 'none' }}>
                    <img className="OptionImage" src={Squere} onClick={selectSquere}></img>
                    <img className="OptionImage" src={Circle} onClick={selectCircle}></img>
                    <img className="OptionImage" src={Triangle} onClick={selectTriangleUp}></img>
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
                            className={`CroppedImage ${img.shape}-mask`}
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
                            <Draggable position={position} onDrag={handleDrag} bounds="parent" > 
                                <img src={croppedImage} 
                                className={`CroppedImage ${isTriangleSelected ? 'triangle-mask' : isCircleSelected ? 'circle-mask' : ''}`}
                                id="draggImageId" style={{
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