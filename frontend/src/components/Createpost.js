import React,{useState , useEffect} from 'react';
import "./Createpost.css";
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Createpost() {
const [body, setBody] = useState("");
const [image, setImage] = useState("");
const [url, setUrl] = useState("");
const navigate=useNavigate();

//Toast function
const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)

useEffect(() => {
    //saving post to mongodb
    if(url)
    {
    
    fetch("/Createpost" ,
    {
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            body,
            pic:url
        })
    }).then(res=>res.json())
    .then(data=>{if(data.error){
        notifyA(data.error);
    }else{
        notifyB("Sucessfully posted!")
        navigate("/")
    }})
    .catch(err=>console.log(err))
}
}, [url])


// posting image to cloudinary
const postdeatils =()=>{
    console.log(body,image)
    const data=new FormData()
    data.append("file" , image)
    data.append("upload_preset" , "hello-world")
    data.append("cloud_name" , "socialworld")
    fetch("https://api.cloudinary.com/v1_1/socialworld/image/upload",
    {
        method:"POST",
        body:data,
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.log(err))


}

    const loadfile=(event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
}
  return (
    <div className="background-createpost">
    <div className="createpost">

        {/* Header */}
        <div className="post-header">
            <h4>Create New Post</h4>
            <button id="post-btn" onClick={()=>{postdeatils()}}><span className="material-symbols-outlined">share</span></button>
        </div>
        <hr />
        {/* image preview */}
        <div className="main-div">
            <img id="output" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswyS9t5Kk8qLSukr6FqtJlyGgQ8N22WoxZQ&usqp=CAU"/>
            <input type="file" accept="image/*" onChange={(event)=>{
                loadfile(event);
                setImage(event.target.files[0])
                }}/>
        </div>


        {/* details */}
        <div className="details">
            <div className="card-header">
                <div className="card-pic">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqzTV5qIqtBnIPix9yR-QzkX09x3rx6NAKw&usqp=CAU" alt="" />
                </div>
                <h5>hey_world</h5>
            </div>
            <textarea value={body} onChange={(e)=>{
                setBody(e.target.value)
            }} type="text" placeholder="Write a Caption!"></textarea>
        </div>
    </div>
    </div>
  )
}
