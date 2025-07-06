import React from 'react';

const YouTubeSection = () => {
  // Replace these with your actual YouTube video IDs and channel URL
  const youtubeChannelUrl = "https://www.youtube.com/@Dr.IshitaKesharwani";
  
  const videos = [
    {
      id: "thvXaPYR93Q", // Diabetes myths and facts video
      title: "Diabetes Myths and Facts - Ayurvedic Perspective",
      description: "Discover the truth about diabetes and learn natural Ayurvedic approaches to manage blood sugar levels.",
      duration: "0:60"
    },
    {
      id: "GUj6Imq1brw", // Periods myths and facts video
      title: "Periods Myths and Facts - Ayurvedic Wisdom",
      description: "Debunking common period myths and understanding menstrual health from an Ayurvedic perspective.",
      duration: "0:60"
    },
    {
      id: "0VJf17MBlLo", // Fatty liver myths and facts video
      title: "Fatty Liver Myths and Facts - Natural Healing",
      description: "Learn the truth about fatty liver and discover Ayurvedic approaches to liver health.",
      duration: "0:60"
    },
    {
      id: "3ppIeHFp7bw", // UTI myths and facts video
      title: "UTI Myths and Facts - Ayurvedic Solutions",
      description: "Understanding urinary tract infections and natural Ayurvedic remedies for prevention and treatment.",
      duration: "0:60"
    },
    {
      id: "CJ7fc0fkM6I", // Late periods myths and facts video
      title: "Late Periods Myths and Facts - Hormonal Balance",
      description: "Exploring irregular periods and Ayurvedic methods to restore natural menstrual cycles.",
      duration: "0:60"
    },
    {
      id: "DpZITpZBKCY", // Thyroid myths and facts video
      title: "Thyroid Myths and Facts - Ayurvedic Approach",
      description: "Understanding thyroid disorders and natural Ayurvedic methods to support thyroid health.",
      duration: "0:60"
    }
  ];

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const handleChannelClick = () => {
    window.open(youtubeChannelUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sage-50 to-ayurveda-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">📺</div>
          <h2 className="section-title">
            Watch Our YouTube Videos
          </h2>
          <p className="section-subtitle">
            Educational content on Ayurveda, wellness tips, and guided therapies to support your health journey
          </p>
          <button
            onClick={handleChannelClick}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Visit Our YouTube Channel</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="card hover:scale-105 transition-all duration-300 cursor-pointer group" onClick={() => handleVideoClick(video.id)}>
              {/* Video Thumbnail */}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-ayurveda-100 to-earth-100 flex items-center justify-center relative">
                  {/* YouTube Thumbnail - Replace with actual thumbnail */}
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ayurveda-100 to-earth-100 flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <p className="text-ayurveda-600 font-medium">Video Thumbnail</p>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-semibold text-ayurveda-800 group-hover:text-ayurveda-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sage-600 text-sm line-clamp-2">
                  {video.description}
                </p>
                
                {/* Watch Now Button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-sm text-sage-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Watch Now</span>
                  </div>
                  <svg className="w-4 h-4 text-ayurveda-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-soft p-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="text-4xl">🔔</div>
              <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                Stay Updated with Our Latest Videos
              </h3>
              <p className="text-sage-600 max-w-2xl mx-auto">
                Subscribe to our YouTube channel for weekly videos on Ayurvedic healing, wellness tips, 
                guided meditations, and expert advice on natural health management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleChannelClick}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Subscribe Now</span>
                </button>
                <button
                  onClick={handleChannelClick}
                  className="btn-outline inline-flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>View All Videos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection; 