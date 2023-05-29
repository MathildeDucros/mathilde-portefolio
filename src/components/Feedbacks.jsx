import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const FeedbackCard = ({ testimonial, name, designation, company }) => (
  <motion.div
    variants={fadeIn("", "spring")}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation} à {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonialText, setTestimonialText] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  //   const BACKEND_URL= "https://portfolio-server-q50p.onrender.com/"

  const fetchTestimonials = () => {
    fetch("https://portfolio-server-q50p.onrender.com/")
      .then((response) => response.json())
      .then((data) => {
        setTestimonialsData(data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des témoignages :",
          error
        );
      });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTestimonial = {
      testimonial: testimonialText,
      name: name,
      designation: designation,
      company: company,
    };

    fetch("https://portfolio-server-q50p.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTestimonial),
    })
      .then((response) => response.json())
      .then((data) => {
        setTestimonialsData([...testimonialsData, data]);
        setModalOpen(false);
        setTestimonialText("");
        setName("");
        setDesignation("");
        setCompany("");
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'enregistrement du témoignage :",
          error
        );
      });
  };

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Avis</p>
          <h2 className={styles.sectionHeadText}>Témoignages.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonialsData.map((testimonial) => (
          <FeedbackCard
            key={testimonial._id}
            testimonial={testimonial.testimonial}
            name={testimonial.name}
            designation={testimonial.designation}
            company={testimonial.company}
            image={testimonial.image}
          />
        ))}
      </div>

      <button
        onClick={handleOpenModal}
        // className="flex items-center justify-center bg-secondary text-primary px-4 py-2 rounded-full mt-4 transition-all duration-200 ease-in-out"
        className="flex items-center justify-center w-full bg-secondary text-primary px-4 py-2 rounded-full mt-4 transition-all duration-200 ease-in-out"
      >
        Donner son avis
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 ">
          <div className="bg-tertiary p-8 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-secondary">
              Donner votre avis
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-secondary  rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="testimonial" className="block font-medium mb-1">
                  Témoignage
                </label>
                <textarea
                  id="testimonial"
                  value={testimonialText}
                  onChange={(e) => setTestimonialText(e.target.value)}
                  placeholder="Écrivez votre avis ici..."
                  className="w-full p-2 border border-secondary  rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="designation" className="block font-medium mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full p-2 border border-secondary  rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block font-medium mb-1">
                  Société
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2 border border-secondary rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-primary text-secondary px-4 py-2 rounded-md"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
