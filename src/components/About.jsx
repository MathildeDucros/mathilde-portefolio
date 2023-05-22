import React from "react";
// effets sur la carte = tilt
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Aperçu.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Je suis une développeuse full{" "}
        <span className="text-[#cb716c]">MERN </span>
        Stack passionnée par la création d'applications Web et Mobiles modernes
        et réactives. Ma spécialité réside dans l'utilisation des technologies
        <span className="text-[#cb716c]"> M</span>ongoDB,
        <span className="text-[#cb716c]"> E</span>xpress.js,
        <span className="text-[#cb716c]"> R</span>eact.js et
        <span className="text-[#cb716c]"> N</span>ode.js, qui me permettent de
        concevoir des solutions innovantes et polyvalentes. Mon objectif est de
        fournir des expériences utilisateur exceptionnelles en utilisant les
        meilleures pratiques de développement et en restant constamment à
        l'affût des nouvelles tendances et des améliorations de ces
        technologies. Je suis enthousiaste à l'idée de collaborer sur des
        projets stimulants et d'apporter ma contribution au monde numérique en
        constante évolution.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
