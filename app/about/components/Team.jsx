import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function OurTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Sarmin Akter",
      role: "Frontend Developer",
      bio: "Passionate about building responsive user interfaces.",
      image: "https://i.ibb.co.com/s9GfQRKd/photo.jpg",
    },
    {
      id: 2,
      name: "Md Mustakim Hosen",
      role: "Backend Developer",
      bio: "Expert in Node.js and database management.",
      image: "https://i.postimg.cc/SxJkjV5Y/IMG-20241224-232711-1.png",
    },
    {
      id: 3,
      name: "Maimuna Tabassum",
      role: "UI/UX Designer",
      bio: "Designs intuitive and beautiful web experiences.",
      image: "https://i.ibb.co/album/Charlie.jpg",
    },
    {
      id: 4,
      name: "Md Nazmul Haque",
      role: "Project Manager",
      bio: "Ensures projects are delivered on time and within scope.",
      image: "https://i.ibb.co/album/Diana.jpg",
    },
    {
      id: 5,
      name: "Md Asgor Ali",
      role: "Marketing Specialist",
      bio: "Drives engagement and growth through smart marketing.",
      image: "https://i.ibb.co/album/Ethan.jpg",
    },
    {
      id: 6,
      name: "Shanewaz ",
      role: "Sales Manager",
      bio: "Manages client relationships and sales strategies.",
      image: "https://i.ibb.co/album/Fiona.jpg",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Meet the talented individuals behind our success.
          </p>
        </motion.div>
        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className=" border border-gray-300 p-6 rounded-xl shadow hover:shadow-lg transition relative text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Member Image */}
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-yellow-400">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Member Info */}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-semibold">{member.role}</p>
              <p className="mt-2 text-sm">{member.bio}</p>
              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-4">
                <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800 transition" />
                <Twitter className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-600 transition" />
                <Github className="w-5 h-5 text-gray-800 cursor-pointer hover:text-black transition" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
