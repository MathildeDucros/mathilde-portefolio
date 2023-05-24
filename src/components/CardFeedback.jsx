import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { addTestimonials, removeTestimonials } from "../reducers/bookmarks";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

function CardFeedback(props) {
  const [data, setData] = useState(null);
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        // dispatch(addBookmark(data));
        setData(data);
      });
  }, []);

  return (
    <motion.div
      variants={fadeIn("", "spring", props.index * 0.5, 0.75)}
      className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
    >
      <p className="text-white font-black text-[48px]">"</p>

      {data && (
        <div className="mt-1">
          <p className="text-white tracking-wider text-[18px]">{data.text}</p>

          <div className="mt-7 flex justify-between items-center gap-1">
            <div className="flex-1 flex flex-col">
              <p className="text-white font-medium text-[16px]">
                <span className="blue-text-gradient">@</span> {data.name}
              </p>
              <p className="mt-1 text-secondary text-[12px]">
                {data.designation} of {data.company}
              </p>
            </div>

            {/* <img
              src={image}
              alt={`feedback_by-${name}`}
              className="w-10 h-10 rounded-full object-cover"
            /> */}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CardFeedback;
