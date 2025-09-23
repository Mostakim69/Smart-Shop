import { motion } from "framer-motion";

export default function Stories() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="space-y-5">
                    <h2 className="text-4xl font-extrabold text-primary mb-6">Our Story</h2>
                    <p className="text-gray-700 leading-relaxed text-lg"> 🌱 Founded in 2019, Smart Shop Shopping began with a simple mission: to make quality products accessible to everyone, everywhere. </p>
                    <p className="text-gray-700 leading-relaxed text-lg"> 🚜 Shopping should be more than just a transaction – it should inspire. We curate products, partner with reliable suppliers, and use technology to ensure seamless experiences. </p>
                    <p className="text-gray-700 leading-relaxed text-lg"> 🌍 Today we serve over 50,000 customers worldwide — offering everything from fashion to gadgets, with <span className="font-semibold text-blue-600"> quality, affordability, and exceptional service.</span></p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="relative">
                    <div className=" rounded-2xl shadow-lg p-10 h-96 flex items-center justify-center">
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }} className="text-center">
                            <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"> <span className="text-5xl">🛍️</span>
                            </div>
                            <h3 className="text-2xl font-semibold">Quality First</h3>
                            <p className=" mt-2">Every product is carefully selected with love</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
