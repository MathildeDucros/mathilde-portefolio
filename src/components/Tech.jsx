import React, { useState } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  const handleTechnologyClick = (technologyName) => {
    setSelectedTechnology(technologyName);
  };

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          className="w-28 h-28 relative"
          key={technology.name}
          onClick={() => handleTechnologyClick(technology.name)}
        >
          <BallCanvas icon={technology.icon} />
          {selectedTechnology === technology.name && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
              <p className="bg-grey rounded-lg shadow px-2 py-1">
                {technology.name}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
