import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface CTAProps {
    searchTerm?: string;
    setSearchTerm?: (searchTerm: string) => void;
    title?: string;
    description?: string;
    placeholder?: string;
}

export default function CTA({ searchTerm, setSearchTerm, title, description, placeholder }: CTAProps) {
    const showSearch = searchTerm !== undefined && setSearchTerm !== undefined;
    
    return (
        <div>
            <section className="relative py-20 h-auto min-h-[500px]">
                <div className="absolute h-full w-full inset-0 bg-black/30"></div>
                {/* <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/images/cta-bg.jpg"
                        alt="आगामी कार्यक्रम"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div> */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                                {description}
                            </p>
                            {showSearch && (
                                <div className="relative max-w-2xl mx-auto">
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full py-4 px-6 pl-14 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                                    />
                                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}