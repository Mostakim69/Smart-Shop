import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaSmile, FaBox, FaChartPie, FaStar } from "react-icons/fa";

export default function Count() {
    const { ref, inView } = useInView({
        triggerOnce: true, threshold: 0.3,
    });

    const stats = [
        {
            title: "Happy Customers", value: 20000, duration: 3, icon: <FaSmile />,
        },
        {
            title: "Orders Processed", value: 8500, duration: 3, icon: <FaBox />,
        },
        {
            title: "Inventory Optimized", value: 92, suffix: "%", duration: 3, icon: <FaChartPie />,
        },
        {
            title: "Customer Satisfaction", value: 99, suffix: "%", duration: 3, icon: <FaStar />,
        },
    ];

    return (
        <section ref={ref} className="py-16 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"> {stats.map((stat, index) => (
                    <div
                        key={index} className="p-6 sm:p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2 flex flex-col items-center"
                    >
                        {/* Icon */}
                        <div className={`text-4xl sm:text-5xl mb-3 sm:mb-4 ${stat.color}`}> {stat.icon}
                        </div>
                        {/* Number */}
                        <h3 className={`text-3xl sm:text-4xl font-extrabold ${stat.color}`}> {inView && (
                            <CountUp end={stat.value} duration={stat.duration}  suffix={stat.suffix || ""} separator="," />
                        )}
                        </h3>
                        {/* Title */}
                        <p className="mt-2 sm:mt-3 text-gray-600 font-semibold text-sm sm:text-base text-center"> {stat.title}
                        </p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
}
