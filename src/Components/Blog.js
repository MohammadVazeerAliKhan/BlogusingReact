import {useState, useRef, useEffect} from "react";
import {db} from "../firebaseinit";

import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"; 


//Blogging App using Hooks

// function blogReducer(state, action){
//     switch(action.type){
//         case "ADD":
//             return [action.blog, ...state];
//         case "REMOVE":
//             return state.filter((blog, index) => index !== action.index);
//         default:
//             return [];

//     }
// }


export default function Blog(){
    
    const [formData, setFormData] = useState({title:'', content: ''});
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [blogs, setBlogs] = useState([]);
    // const [blogs, dispatch] = useReducer(blogReducer, []);

    const titleRef = useRef(null);
    useEffect(()=>{
        titleRef.current.focus();
    },[]);

    useEffect(()=>{
        if (blogs.length){
            document.title = blogs[0].Title;
        }
        else{
            document.title = 'No Blogs'
        }
    },[blogs]);
    useEffect(()=> {
        async function fetchData(){
        //     const snapShot = await getDocs(collection(db,"blogs"));
        //     console.log(snapShot.docs);
        //     const blogs = snapShot.docs.map((doc) => {
                
        //         return {
        //             id : doc.id,
        //             ...doc.data()
        //         }
        //     }) ;
        //     setBlogs(blogs);

            const unsub = onSnapshot(collection(db,"blogs"),(snapShot) => {
                const blogs = snapShot.docs.map((doc) => {
                
                return {
                    id : doc.id,
                    ...doc.data()
                }
            }) ;
            setBlogs(blogs);
            } )
        }

        fetchData();


        
        
    },[])

    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();
        // if (formData.title.length>0 || formData.content.length>0){
            // setBlogs([{Title: formData.title, Content: formData.content},...blogs]);
                    
        // Add a new document with a generated id.
        const docRef = doc(collection(db, "blogs"));
        await setDoc( docRef, {
        Title: formData.title,
        Content: formData.content,
        CreatedAt : new Date()
        });
        // console.log("Document written with ID: ", docRef.id);

            // dispatch({type: "ADD", blog : {title: formData.title, content: formData.content}});

            // setTitle('');
            // setContent('');
        // }
        setFormData({title:'', content: ''});
        titleRef.current.focus();
    }

    async function handleRemove(id){
        // setBlogs(blogs.filter((blog)=> (blog.id !== index )));
        // dispatch({type: "REMOVE", index: index});
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
        titleRef.current.focus();

    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input" value = {formData.title} onChange={(e)=> setFormData({title: e.target.value, content: formData.content})}    ref={titleRef} required placeholder="Enter the Title of the Blog here.."/>
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.." value={formData.content} required onChange={(e)=> setFormData({title: formData.title, content: e.target.value})} />
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog, i)=> (
            <div className="blog" key={i}>
                <h3>{blog.Title}</h3>
                <p>{blog.Content}</p>
                <div className="blog-btn">
                   <button className=" btn remove" onClick={()=>handleRemove(blog.id)}>Delete</button>
                </div>
                <p></p>
            </div>
        ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
