import React, { useState, useEffect } from 'react';
import "../../Styles/gallery.css"
import Loupe from "../../Images/loupe.png"
import { saveAs } from 'file-saver'

function Gallery(){
    const [images, setImages] = useState([]);
    const [editBox, setEditBox] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [imageCount, setImageCount] = useState(10);
    const [inputStyle, setInputStyle] = useState("")

    function loadMore(){

        fetch("http://localhost:5038/api/Gallery?take=10&skip="+imageCount, requestOptions2)
            .then((response) => response.json())
            .then((result) => {
                setImages(images.concat(result));

            })
            .catch((error) => console.error(error));
        setImageCount(imageCount + 10);
    }


    function showOptions(imageId){
        if(selectedImageId == imageId)
        {
            setSelectedImageId(null);
        }
        else{
            setSelectedImageId(imageId);
        }
    }

    function deleteOption(imageId){

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          fetch("http://localhost:5038/api/Gallery/"+imageId, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        setImages(images.filter(function (img){
            return img.id != imageId
        }));

        if(images.length < 10){
            fetch("http://localhost:5038/api/Gallery?take=1&skip="+images.length, requestOptions2)
            .then((response) => response.json())
            .then((result) => {
                setImages(images.concat(result));

            })
            .catch((error) => console.error(error));
        }
    }

    const DownloadOption= async (imageId) => {
        const imageToDownload = images.find(image => image.id === imageId);
        try {
            const response = await fetch(imageToDownload.imagePath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const blob = await response.blob();
            saveAs(blob, `${imageToDownload.imageName}.png`);
        } catch (error) {
            console.error("Error downloading the image:", error);
        }
    }
    function findImagesByStyle(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch(process.env.REACT_APP_BUSINESS_LOGIC_URL + "/api/Gallery?take=10&filter[logic]=and&filter[filters][0][field]=styleName&filter[filters][0][operator]=contains&filter[filters][0][value]="+inputStyle, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setImages(result);
            })
            .catch((error) => console.error(error));
    }
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch(process.env.REACT_APP_IDENTITY_URL + "/api/Permission?email=" + localStorage.getItem("email"), requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.roles.permissions.includes("delete:pictures:all"));

            if(result.roles.permissions.includes("delete:pictures:all")){
                setEditBox(true);
            }
        })
        .catch((error) => console.error(""));

         var requestOptions2 = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch(process.env.REACT_APP_BUSINESS_LOGIC_URL + "/api/Gallery?take=10", requestOptions2)
            .then((response) => response.json())
            .then((result) => {
                if(images.length == 0)
                    setImages(result);
            })
            .catch((error) => console.error(error));
    return (
        <div>
            <div className='SearchArea'>
                <div className='SearchBox'>
                    <input className='InputText' value={inputStyle} onChange={(e) => setInputStyle(e.target.value)}></input>
                    <button className='ButtonSearch' onClick={findImagesByStyle}>
                        <img className='LoupeImage' src={Loupe}></img>
                    </button>
                </div>
                <div className='LoadMoreArea'>
                    <button onClick={loadMore} className='LoadMoreButton'>Load more</button>
                </div>
            </div>
            <div className='ImageArea'>
            {images.map((image) => (
                <div key={image.id} className="ImageItem">
                    <div className='ImagePhotoArea'>
                        <img className='ImagePhoto' src={image.imagePath} alt={image.imageName} />
                     </div>   
                    <div className='ImageTitle'>{image.imageName}</div>
                    <div className='ImageSize'>{image.styleName}</div>
                    <div className='OptionsArea' onClick={() => showOptions(image.id)}>
                        <p className='OptionsText'>...</p>
                    </div>
                    { selectedImageId === image.id  && 
                        <div className='OptionBox'>
                            <div className='OptionCase'>More options:</div>
                            <div onClick={() => DownloadOption(image.id)} className='OptionCase'>Download</div>
                            {editBox && <div onClick={() => deleteOption(image.id)} className='OptionCase'>Delete</div>}      
                        </div>
                    }
                </div>
            ))}
            </div>
            
        </div>
    );
}

export default Gallery;