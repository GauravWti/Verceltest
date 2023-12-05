import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Select from 'react-select';

const Form = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [Categories, setCategories] = useState({});
  const [Title, setTitle] = useState("");
  const [Paragraph, setParagraph] = useState("");
  const [slugs, setSlugs] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);
  const [readingtime, setReadingTime] = useState("");
  const [tagArr, setTagArr] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const[metadesc,setMetaDesc]=useState('');
  const[metakeyword,setMetaKeyword]=useState('');
  const[canonicalurl,setCanonicalUrl]=useState('');
  
  const [titleImage, setTitleImage] = useState(null);


  const categoriesList=[
    {value:"Things To Do",label:"Things To Do"},
    {value:"Best Time To Visit", label:"Best Time To Visit"},
    {value:"Explore Dubai", label:'Explore Dubai'},
    {value:"Travel", label:'Travel'},
    {value:"Rent A Car", label:'Rent A Car'},
    {value:"Airport Transfer", label:'Airport Transfer'},
    {value:"Hotels", label:'Hotels'},
    {value:"Food", label:'Food'},
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalSlugs = slugs.trim() === "" ? Title.trim() : slugs.trim();
    let tagsf=tagArr.join(',');
    finalSlugs = finalSlugs.replace(/\s+/g, "_").toLowerCase();
    try {
      if (Categories === "" || Title === "" || Paragraph === "") {
        window.alert("Fill in all data");
        return;
      } else {
        const response = await fetch(
          `https://wticarrental.ae:3000/app/v1/blogs/addblog`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              categories: Categories.value,
              title: Title,
              paragraph: Paragraph,
              slugs: finalSlugs,
              img: titleImage,
              canonicalurl:canonicalurl,
              metadesc:metadesc,
              metakeyword:metakeyword,
              readingtime:readingtime,
              tags:tagsf
            }),
            credentials: "include",
          }
        );

        const responseData = await response.json();
        console.log(responseData);
        if (response.status == 200) {
          window.alert("new blog added");
          window.location.reload(); // Reload the page
        } else {
          console.error("Failed to make Profile");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onEditorChange = (editorState) => {
    setEditorState(editorState);

    const currentContent = editorState.getCurrentContent();
    const rawContentState = convertToRaw(currentContent);

    const html = draftToHtml(rawContentState);
    setParagraph(html);
    console.log(html);
  };

  const handlePastedFiles = (files) => {
    const file = files[0];
    setImage(file);
    console.log(file);
    return "handled";
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setSlugs(e.target.value.trim().replace(/\s+/g, "_").toLowerCase());
  };

  const imageUploadApi = async (value) => {
    let result = await axios.request(value);
    // console.log(result.data.name);
    let imageName = result.data.name;
    return imageName;
  };
  const uploadImageCallback = async (file) => {
    const reader = new FormData();
    reader.append("file", file);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wticarrental.ae:3000/app/v1/aws/upload/blogimages",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: reader,
    };
    let imageName = await imageUploadApi(config);

    let totalUrl =
      `https://wticarrental.ae:3000/app/v1/aws/getImage/blogimages/` +
      imageName;
    console.log(totalUrl);
    return new Promise((resolve, reject) => {
      // Create a FileReader

      resolve({
        data: {
          link: totalUrl,
        },
      });
    });
  };

  const imageTest = async (e) => {
    console.log(e.target.files[0]);
    const reader = new FormData();
    reader.append("file", e.target.files[0]);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wticarrental.ae:3000/app/v1/aws/upload/blogimages",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: reader,
    };
    let imageName = await imageUploadApi(config);

    let totalUrl =
      `https://wticarrental.ae:3000/app/v1/aws/getImage/blogimages/` +
      imageName;
    console.log(totalUrl);
    setTitleImage(totalUrl);
  };

  const handleTags = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTagArr((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
    }
  };
  const removeTag = (index) => {
    const newTags = [...tagArr];
    newTags.splice(index, 1);
    setTagArr(newTags);
  };

  const handleSelect=(e)=>{
    // console.log(e.value);
      setCategories(e);
  }

  return (
    <>
      <div className="w-[90%] m-auto shadow-2xl px-4 py-2 box-content rounded-xl">
        <div className="text-2xl">Add Blog</div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="Categories"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Categories
            </label>
            {/* <input
              required={true}
              onChange={(e) => setCategories(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border-black border-[1px] rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            /> */}
            <Select
               options={categoriesList}
               placeholder="Select Categories"
               value={Categories}
               onChange={handleSelect}
               required={true}
               isSearchable={true}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Title"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Title
            </label>
            <input
              required={true}
              onChange={(e) => handleTitleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-[#053B50] border-black border-[1px] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
         
          <div className="mb-6">
            <label
              htmlFor="slugs"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Slugs
            </label>
            <input
              value={slugs}
              onChange={(e) => setSlugs(e.target.value)}
              className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Tags"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Tags (Add tags without space)
            </label>
            <input
            required
             
              value={tagInput}
              onChange={handleTags}
              onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              className="block w-full px-4 py-2 mt-2 text-[#053B50] border-black border-[1px] bg-white rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <div
              onClick={addTag}
              className="mt-2 w-fit bg-[#053B50] text-white px-4 py-2 rounded-md"
            >
              Add Tag
            </div>
            <div className="mt-2">
              {tagArr.map((tag, index) => (
                <div
                  key={index}
                  className="inline-block bg-[#053B50] text-white px-2 py-1 rounded-md mr-2"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-2 text-white"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="Meta Desc"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Meta Description
            </label>
            <textarea
              value={metadesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Meta Key"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Meta Keywords
            </label>
            <input
            required
              value={metakeyword}
              onChange={(e) => setMetaKeyword(e.target.value)}
              className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Canonocal Url"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Canonical Url
            </label>
            <input
            required
              value={canonicalurl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="slugs"
              className="text-left  block text-sm font-semibold text-gray-800"
            >
              Reading Time
            </label>
            <input
            required
              value={readingtime}
              onChange={(e) => setReadingTime(e.target.value)}
              className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-6">
            <p className="text-left  block text-sm font-semibold text-gray-800">
              Paragraph
            </p>
            <div className="border-[1px] border-black">
              <Editor
                editorStyle={{ height: "200px", padding: 10 }}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorChange}
                handlePastedFiles={handlePastedFiles}
                toolbar={{
                  image: {
                    uploadCallback: uploadImageCallback,
                    alt: { present: true, mandatory: false },
                  },
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="imageUpload"
              className="text-left block text-sm font-semibold text-gray-800"
            >
              Upload Title Image (1270px x 420px)
            </label>
            <input
            required
              type="file"
              id="imageUpload"
              onChange={imageTest}
              className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border-black border-[1px] rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover-bg-[#053B50] focus:outline-none focus-bg-[#053B50]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
