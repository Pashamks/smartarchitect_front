import React, { useState, useEffect } from 'react';
import "../../Styles/gallery.css"
import House from "../../Images/house.jpg"
import House2 from "../../Images/house2.jpg"
import Loupe from "../../Images/loupe.png"
import { saveAs } from 'file-saver'

const defaultImages = [
    { id: 1, src: House, title: 'Назва стилю 1', description: '3h' },
    { id: 2, src: House2, title: 'Назва стилю 2', description: '5h' },
    { id: 3, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 4, src: House2, title: 'Назва стилю 2', description: '5h' },
    { id: 5, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 6, src: House2, title: 'Назва стилю 2', description: '5h' },
    { id: 7, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 8, src: House2, title: 'Назва стилю 2', description: '5h' },
    { id: 9, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 10, src: House, title: 'Назва стилю 2', description: '5h' },
  ];

function Gallery(){
    const [images, setImages] = useState([]);
    const [editBox, setEditBox] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        setImages(defaultImages);
      }, []);

    function loadMore(){
        setImages(images.concat(images));
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
        setImages(images.filter(function (img){
            return img.id != imageId
        }));
    }

    function DownloadOption(imageId){
        const imageToDownload = defaultImages.find(image => image.id === imageId);

        if (imageToDownload) {
            saveAs(imageToDownload.src, 'image.jpg')
        }
    }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("http://localhost:5000/api/Permission?email=" + localStorage.getItem("email"), requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            console.log(result.roles.permissions.includes("delete:pictures:all"));

            if(result.roles.permissions.includes("delete:pictures:all")){
                setEditBox(true);
            }
        })
        .catch((error) => console.error(error));
    return (
        <div>
            <div className='SearchArea'>
                <div className='SearchBox'>
                    <input className='InputText'></input>
                    <button className='ButtonSearch'>
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
                        <img className='ImagePhoto' src={image.src} alt={image.title} />
                     </div>   
                    <div className='ImageTitle'>{image.title}</div>
                    <div className='ImageSize'>{image.description}</div>
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