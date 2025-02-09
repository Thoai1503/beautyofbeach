import React, { useEffect, useRef, useState } from "react";
import CommentSection from "../CommentSection/CommentSection";
import "./TabSection.css";
import { Rating } from "@mui/material";
import axios from "axios";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useStateContext } from "../../Context/ContextProvider";
import Feed from "../Feed/Feed";

const TabSection = ({ id }) => {
  const date = new FormData();
  const fileInputRef = useRef(null);
  const commentRef = useRef(null);
  const { userId } = useStateContext();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [selectedTab, setSelectedTab] = useState("radiofortab1");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const { token } = useStateContext();

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      console.log(selectedFile);
      console.log("Input file:" + fileInputRef.current.value);
      setSelectedTab("radiofortab2"); // Set the selected tab to "radiofortab2" after choosing a file
    } else {
      setFileName("");
      setFile(null);
    }
  };

  const setRemainTab2 = () => {
    setSelectedTab("radiofortab2");
  };

  const handleCommentChange = (e) => {
    e.preventDefault();
    const comment = e.target.value;
    setComment(e.target.value);
    if (comment) {
      setRemainTab2();
      setComment("");
      console.log("Value: " + commentRef.current.value);
      console.log(comment); // Set the selected tab to "radiofortab2" after choosing a file
    }
  };

  // console.log("Value: " + commentRef.current.value);

  const submitData = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Vui lòng đăng nhập để bình luận");
      return;
    } else if (token && commentRef.current.value === "") {
      setSelectedTab("radiofortab2");
    } else if (token && commentRef.current.value === "") {
      alert("Vui lòng nhập bình luận");
      return;
    }

    console.log("Value: " + commentRef.current.value);

    console.log("Filename :" + fileName);
    if (file == null || file == "") {
      alert("Vui lòng chọn hình ảnh");
      return;
    } else if (token && commentRef.current.value === "") {
      alert("Vui lòng nhập bình luận");
      return;
    }
    const fData = new FormData();
    fData.append("image", file);
    fData.append("comment", commentRef.current.value);
    fData.append("beachid", id);
    fData.append("accountid", userId);

    console.log(fData.image);
    axios
      .post(`http://127.0.0.1:8000/api/upload`, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Response :" + res.data);
        setFileName("");
        fetchReviews();
        setFile(null);

        setSelectedTab("radiofortab2");
        commentRef.current.value = "";
        fileInputRef.current.value = "";
      })
      .catch((e) => console.error("Failure", e));
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  console.log(id);
  return (
    <div id="tabscontainer">
      <input
        type="radio"
        name="radiogroupfortabs"
        id="radiofortab1"
        checked={selectedTab === "radiofortab1"}
        onChange={() => setSelectedTab("radiofortab1")}
      />
      <label
        id="tab-label1"
        for="radiofortab1"
        style={{
          boxShadow: "0 7px 19px 0 rgba(0, 0, 0, 0.3)",
          paddingBottom: "20px",
        }}
      >
        Comment
      </label>
      <div
        id="tab-content1"
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          transition: "0.3s",
        }}
      >
        <h2>Writting your comment</h2>
        <CommentSection id={id} />
      </div>

      <input type="radio" name="radiogroupfortabs" id="radiofortab2" />
      <label
        id="tab-label2"
        for="radiofortab2"
        style={{ paddingBottom: "20px" }}
      >
        Review
      </label>
      <div
        id="tab-content2"
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          transition: "0.3s",
        }}
      >
        <h2>Review</h2>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        <form onSubmit={submitData}>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleFileChange(e)}
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {fileName && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file:{" "}
                    <span className="font-medium">{fileName}</span>
                  </p>
                )}
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Comment
              </label>
              <div className="mt-2">
                <input
                  style={{ border: "1px solid gray" }}
                  id="comment"
                  name="commnet"
                  type="text"
                  placeholder="Writting your feedback.."
                  autoComplete="street-address"
                  ref={commentRef}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
              onClick={() => {
                setFileName("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-8">
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <Feed
                key={index}
                image={review.image_name}
                accountid={review.accountid}
                comment={review.comment}
                imageC={review.image_name}
                createdAt={review.created_at}
                ratingScore={review.ratingScore}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TabSection;
