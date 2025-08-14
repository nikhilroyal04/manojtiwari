"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Tv, Search, Calendar, Award, ThumbsUp, Filter, X } from 'lucide-react';
import Link from 'next/link';

// Film data
const films = [
  { year: "2004", title: "Sasura Bada Paisawala", poster: "/images/films/film1.jpg", rating: 4.5 },
  { year: "2005", title: "Bandan Tute na", poster: "/images/films/film2.jpg", rating: 4.2 },
  { year: "2005", title: "Daroga Babu I love you", poster: "/images/films/film3.jpg", rating: 4.3 },
  { year: "2005", title: "Damad ji", poster: "/images/films/film4.jpg", rating: 3.9 },
  { year: "2006", title: "Hamka maphi deido", poster: "/images/films/film5.jpg", rating: 4.0 },
  { year: "2006", title: "Dhartiputra", poster: "/images/films/film6.jpg", rating: 4.1 },
  { year: "2006", title: "Dehatibabu", poster: "/images/films/film7.jpg", rating: 3.8 },
  { year: "2006", title: "Dharti Kahe Pukar Ke", poster: "/images/films/film8.jpg", rating: 4.2 },
  { year: "2007", title: "Naihar ke Maro piya ke chunari", poster: "/images/films/film9.jpg", rating: 3.7 },
  { year: "2008", title: "Deshdrohi (Bollywood)", poster: "/images/films/film10.jpg", rating: 3.5 },
  { year: "2015", title: "Andha Kanun", poster: "/images/films/film11.jpg", rating: 4.0 },
  { year: "2015", title: "Yadav Ji Pan Wale", poster: "/images/films/film12.jpg", rating: 3.9 },
  { year: "2010", title: "Balma 420", poster: "/images/films/film13.jpg", rating: 3.8 },
  { year: "2011", title: "Mard no.-1", poster: "/images/films/film14.jpg", rating: 4.1 },
  { year: "2009", title: "Pyar ke bandhan", poster: "/images/films/film15.jpg", rating: 4.2 },
  { year: "2007", title: "Kab Aiabu aganba hamar", poster: "/images/films/film16.jpg", rating: 3.9 },
  { year: "2008", title: "Bhaiya Hamar", poster: "/images/films/film17.jpg", rating: 4.0 },
  { year: "2009", title: "Ranbhumi", poster: "/images/films/film18.jpg", rating: 4.3 },
  { year: "2010", title: "Bhojpuriya Don", poster: "/images/films/film19.jpg", rating: 4.2 },
  { year: "2012", title: "International Daroga", poster: "/images/films/film20.jpg", rating: 3.8 },
  { year: "2007", title: "Hum hai khalnayak", poster: "/images/films/film21.jpg", rating: 3.7 },
  { year: "2008", title: "Tu Hamae Hau", poster: "/images/films/film22.jpg", rating: 3.9 },
  { year: "2009", title: "Janam Janam ke Sath", poster: "/images/films/film23.jpg", rating: 4.0 },
  { year: "2006", title: "Purab", poster: "/images/films/film24.jpg", rating: 3.8 },
  { year: "2007", title: "Mangalsutra", poster: "/images/films/film25.jpg", rating: 3.9 },
  { year: "2011", title: "Gobar Singh", poster: "/images/films/film26.jpg", rating: 3.6 },
  { year: "2010", title: "Bhaiya Hamar Bara Dayaban", poster: "/images/films/film27.jpg", rating: 4.1 },
  { year: "2012", title: "Insaaf", poster: "/images/films/film28.jpg", rating: 4.2 },
  { year: "2008", title: "Ye Bhauji ke sister", poster: "/images/films/film29.jpg", rating: 3.7 },
  { year: "2009", title: "Pappu ke pyar ho gail", poster: "/images/films/film30.jpg", rating: 3.8 },
  { year: "2010", title: "Chotka Bhaiya Jindabad", poster: "/images/films/film31.jpg", rating: 4.0 },
  { year: "2011", title: "Munna Pandey Berojgar", poster: "/images/films/film32.jpg", rating: 4.1 },
  { year: "2012", title: "Hanuman bhakt Hawaldar", poster: "/images/films/film33.jpg", rating: 4.3 },
  { year: "2007", title: "Bhole Shankar", poster: "/images/films/film34.jpg", rating: 4.2 },
  { year: "2008", title: "Ganga", poster: "/images/films/film35.jpg", rating: 4.4 },
  { year: "2009", title: "Gangotri", poster: "/images/films/film36.jpg", rating: 4.3 },
  { year: "2010", title: "Saugandh", poster: "/images/films/film37.jpg", rating: 3.9 },
  { year: "2011", title: "Ganga Jamuna Sarswati", poster: "/images/films/film38.jpg", rating: 4.0 },
  { year: "2012", title: "Devra Bhail Deewana", poster: "/images/films/film39.jpg", rating: 3.8 },
  { year: "2007", title: "Aurat khilauna nahi", poster: "/images/films/film40.jpg", rating: 4.1 },
  { year: "2008", title: "Daroga ji Chori Hogail", poster: "/images/films/film41.jpg", rating: 3.9 },
  { year: "2009", title: "Ego chuma deda raja ji", poster: "/images/films/film42.jpg", rating: 3.7 },
  { year: "2010", title: "Raja thakur", poster: "/images/films/film43.jpg", rating: 4.0 },
  { year: "2011", title: "Chhotka Bhaiya Jindabad", poster: "/images/films/film44.jpg", rating: 4.2 },
  { year: "2013", title: "Parmveer Parshuram", poster: "/images/films/film45.jpg", rating: 4.3 }
];

// TV Shows data
const tvShows = [
  { 
    year: "2008", 
    title: "Chak de bachche", 
    role: "Host", 
    channel: "Star Plus",
    image: "/images/tv/tv1.jpg",
    description: "A singing reality show for children where Manoj Tiwari was the main host."
  },
  { 
    year: "2010", 
    title: "Bigg Boss 4", 
    role: "Contestant", 
    channel: "Colors TV",
    image: "/images/tv/tv2.jpg",
    description: "Participated as a contestant in the fourth season of India's biggest reality show."
  },
  { 
    year: "2011", 
    title: "Sur Sangram (season 1 & 2)", 
    role: "Host", 
    channel: "Mahuaa TV",
    image: "/images/tv/tv3.jpg",
    description: "A singing competition show focused on Bhojpuri music and talent."
  },
  { 
    year: "2012", 
    title: "Nehle Pe Dehla", 
    role: "Host", 
    channel: "Mahuaa TV",
    image: "/images/tv/tv4.jpg",
    description: "A comedy show featuring various Bhojpuri artists and celebrities."
  },
  { 
    year: "2012", 
    title: "Bharat Ki Shaan: Singing Star (Season 2)", 
    role: "Host", 
    channel: "DD National",
    image: "/images/tv/tv5.jpg",
    description: "A patriotic singing reality show celebrating India's musical diversity."
  },
  { 
    year: "2013", 
    title: "Welcome - Baazi Mehmaan-Nawaazi ki", 
    role: "Contestant", 
    channel: "Life OK",
    image: "/images/tv/tv6.jpg",
    description: "A cooking-based reality show where celebrities cook for each other."
  }
];

// Music Albums
const musicAlbums = [
  { 
    year: "2009", 
    title: "Hey Mahadev", 
    type: "Devotional",
    image: "/images/albums/album1.jpg"
  },
  { 
    year: "2005", 
    title: "Jiya Ho Bihar Ke Lala", 
    type: "Film Song",
    image: "/images/albums/album2.jpg"
  },
  { 
    year: "2010", 
    title: "Bhojpuri Hits", 
    type: "Collection",
    image: "/images/albums/album3.jpg"
  },
  { 
    year: "2012", 
    title: "Hanuman Chalisa", 
    type: "Devotional",
    image: "/images/albums/album4.jpg"
  }
];

export default function Filmography() {
  const [activeTab, setActiveTab] = useState('films');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Filter films based on search and year
  const filteredFilms = films.filter(film => {
    const matchesSearch = film.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === '' || film.year === filterYear;
    return matchesSearch && matchesYear;
  });

  // Get unique years for filter
  const uniqueYears = [...new Set(films.map(film => film.year))].sort();

  // Filter TV shows based on search
  const filteredTvShows = tvShows.filter(show => 
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/mp-manoj-tiwari" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                <span>फिल्मोग्राफी</span>
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-secondary">फिल्मोग्राफी</h1>
              <p className="text-xl text-primary max-w-2xl mx-auto">
                भोजपुरी सिनेमा के सुपरस्टार मनोज तिवारी की फिल्मों, टीवी शो और संगीत एल्बम की सम्पूर्ण सूची
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tabs and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="flex space-x-2 mb-6 md:mb-0">
              <button 
                onClick={() => setActiveTab('films')}
                className={`px-6 py-3 rounded-full flex items-center ${
                  activeTab === 'films' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Film className="w-5 h-5 mr-2" />
                फिल्में
              </button>
              <button 
                onClick={() => setActiveTab('tv')}
                className={`px-6 py-3 rounded-full flex items-center ${
                  activeTab === 'tv' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Tv className="w-5 h-5 mr-2" />
                टीवी शो
              </button>
              <button 
                onClick={() => setActiveTab('music')}
                className={`px-6 py-3 rounded-full flex items-center ${
                  activeTab === 'music' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Award className="w-5 h-5 mr-2" />
                संगीत
              </button>
            </div>
            
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <input
                  type="text"
                  placeholder="खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              {activeTab === 'films' && (
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 bg-white rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <Filter className="w-5 h-5 text-gray-700" />
                </button>
              )}
            </div>
          </div>
          
          {/* Year Filter (Only for Films) */}
          {activeTab === 'films' && showFilters && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-white rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-700">वर्ष के अनुसार फ़िल्टर करें</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterYear('')}
                  className={`px-4 py-2 rounded-full text-sm ${
                    filterYear === '' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  सभी
                </button>
                
                {uniqueYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setFilterYear(year)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filterYear === year 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Films Grid */}
          {activeTab === 'films' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Film className="w-6 h-6 mr-2 text-orange-500" />
                फिल्में
                <span className="ml-3 text-sm font-normal bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {filteredFilms.length} फिल्में
                </span>
              </h2>
              
              {filteredFilms.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredFilms.map((film) => (
                    <motion.div
                      key={film.title}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="relative h-60 bg-gray-200">
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                          {film.year}
                        </div>
                        <div className="h-full w-full flex items-center justify-center">
                          <Film className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{film.title}</h3>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <ThumbsUp className="w-4 h-4 text-orange-500 mr-1" />
                            <span className="text-sm text-gray-600">{film.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{film.year}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">कोई परिणाम नहीं मिला</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setFilterYear('');}}
                    className="mt-4 text-orange-500 hover:text-orange-600"
                  >
                    सभी फिल्में दिखाएं
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TV Shows */}
          {activeTab === 'tv' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Tv className="w-6 h-6 mr-2 text-orange-500" />
                टेलीविज़न शो
                <span className="ml-3 text-sm font-normal bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {filteredTvShows.length} शो
                </span>
              </h2>
              
              {filteredTvShows.length > 0 ? (
                <div className="space-y-6">
                  {filteredTvShows.map((show) => (
                    <motion.div
                      key={show.title}
                      variants={itemVariants}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
                    >
                      <div className="relative w-full md:w-48 h-48 bg-gray-200 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Tv className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{show.title}</h3>
                          <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                            {show.role}
                          </span>
                          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                            {show.channel}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{show.description}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{show.year}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">कोई परिणाम नहीं मिला</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-orange-500 hover:text-orange-600"
                  >
                    सभी शो दिखाएं
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Music Albums */}
          {activeTab === 'music' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-orange-500" />
                संगीत एल्बम
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {musicAlbums.map((album) => (
                  <motion.div
                    key={album.title}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="relative h-60 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                      <Award className="w-16 h-16 text-white/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-orange-500 border-b-8 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full inline-block mb-2">
                        {album.type}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{album.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{album.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}