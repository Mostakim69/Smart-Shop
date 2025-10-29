"use client";

import { motion } from "framer-motion";
import TypewriterText from "./TypeWriterEffect";

const PageIntro = ({
  h1 = "Welcome to the page ____",
  p = "This page is for you to see the details of the job you applied for",
}) => {
  return (
    <div className="mt-10">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          <TypewriterText words={[h1]} />
        </h1>
        
      </motion.div>
    </div>
  );
};

export default PageIntro;
