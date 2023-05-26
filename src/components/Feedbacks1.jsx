import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  // image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
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
        {/* 
        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        /> */}
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // const BACKEND_URL:"https://portfolio-server-q50p.onrender.com/"

  useEffect(() => {
    fetch("https://portfolio-server-q50p.onrender.com/")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.log(error));
  }, []);

  const renderedTestimonials = testimonials.map((testimonial, index) => (
    <FeedbackCard
      key={testimonial._id}
      index={index}
      testimonial={testimonial.commentaire}
      name={testimonial.name}
      designation={testimonial.designation}
      company={testimonial.company}
      // image={testimonial.image}
    />
  ));

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
        {renderedTestimonials}
        <motion.button
          onClick={openModal}
          className="bg-secondary text-primary px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-200 ease-in-out"
        >
          Ajouter un témoignage
        </motion.button>
      </div>
      {modalOpen && (
        <FeedbackModal
          closeModal={closeModal}
          setTestimonials={setTestimonials}
        />
      )}
    </div>
  );
};

const FeedbackModal = ({ closeModal, setTestimonials }) => {
  const [testimonial, setTestimonial] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");

  const handleSoumettre = () => {
    fetch("https://portfolio-server-q50p.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        commentaire: testimonial,
        company: company,
        designation: designation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Réponse de la base de données :", data);
          // Mettez à jour votre liste de témoignages localement (optionnel)
          const newTestimonial = {
            commentaire: testimonial,
            name: name,
            designation: designation,
            company: company,
          };
          setTestimonials((prevTestimonials) => [
            ...prevTestimonials,
            newTestimonial,
          ]);
          closeModal();
        }
      })
      .catch((error) => {
        // Gestion des erreurs
        console.log("Erreur lors de l'enregistrement des données :", error);
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-tertiary p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-secondary">
          Ajouter un témoignage
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="testimonial" className="block mb-2">
              Commentaire
            </label>
            <textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="designation" className="block mb-2">
              Désignation
            </label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block mb-2">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 text-gray-600 rounded"
            >
              Annuler
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-tertiary text-secondary rounded"
              onClick={handleSoumettre}
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
