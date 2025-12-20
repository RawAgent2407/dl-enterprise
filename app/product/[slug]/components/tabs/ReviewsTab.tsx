/** @format */

import { Star } from "lucide-react";
import { useState } from "react";

const ReviewsTab = () => {
  const allReviews = [
    {
      rating: 5,
      title: "Excellent Quality!",
      review:
        "Never in my experience have I come across products of such exceptional quality and premium packaging as I found with this valve from BrassBlitz. The level of detail and care put into both the product and its presentation exceeds everything I have seen before. It's clear that BrassBlitz prioritises customer satisfaction.",
      author: "Preda Jha",
      location: "Bangalore, India",
      date: "2 months ago",
    },
    {
      rating: 5,
      title: "Supreme Class!",
      review:
        "Never in my experience have I come across products of such exceptional quality and premium packaging as I found with this valve from BrassBlitz. The level of detail and care put into both the product and its presentation exceeds everything I have seen before. It's clear that BrassBlitz prioritises customer satisfaction.",
      author: "Joen Wong",
      location: "London, UK",
      date: "2 months ago",
    },
    {
      rating: 5,
      title: "Excellent Quality!",
      review:
        "Never in my experience have I come across products of such exceptional quality and premium packaging as I found with this valve from BrassBlitz. The level of detail and care put into both the product and its presentation exceeds everything I have seen before. It's clear that BrassBlitz prioritises customer satisfaction.",
      author: "Michael Fong",
      location: "Norwich, USA",
      date: "2 months ago",
    },
    {
      rating: 4,
      title: "Mind Blowing Packaging!",
      review:
        "The packaging itself feels premium and well-crafted. The valve quality is exceptional and performs better than the ones we used before.",
      author: "Arun Mehta",
      location: "Mumbai, India",
      date: "1 month ago",
    },
    {
      rating: 5,
      title: "Highly Recommend",
      review:
        "Solid build, perfect fitting and great customer experience. BrassBlitz is setting new benchmarks!",
      author: "Lara Smith",
      location: "Sydney, Australia",
      date: "3 weeks ago",
    },
    {
      rating: 5,
      title: "Excellent Quality!",
      review:
        "Never in my experience have I come across products of such exceptional quality and premium packaging as I found with this valve from BrassBlitz. The level of detail and care put into both the product and its presentation exceeds everything I have seen before. It's clear that BrassBlitz prioritises customer satisfaction.",
      author: "Preda Jha",
      location: "Bangalore, India",
      date: "2 months ago",
    },
    {
      rating: 5,
      title: "Supreme Class!",
      review:
        "Never in my experience have I come across products of such exceptional quality and premium packaging as I found with this valve from BrassBlitz. The level of detail and care put into both the product and its presentation exceeds everything I have seen before. It's clear that BrassBlitz prioritises customer satisfaction.",
      author: "Joen Wong",
      location: "London, UK",
      date: "2 months ago",
    },
    {
      rating: 5,
      title: "Excellent Quality!",
      review:
        "Never in my experience have I come across products of such exceptional quality and premium packaging as I found with this valve from BrassBlitz. The level of detail and care put into both the product and its presentation exceeds everything I have seen before. It's clear that BrassBlitz prioritises customer satisfaction.",
      author: "Michael Fong",
      location: "Norwich, USA",
      date: "2 months ago",
    },
    {
      rating: 4,
      title: "Mind Blowing Packaging!",
      review:
        "The packaging itself feels premium and well-crafted. The valve quality is exceptional and performs better than the ones we used before.",
      author: "Arun Mehta",
      location: "Mumbai, India",
      date: "1 month ago",
    },
    {
      rating: 5,
      title: "Highly Recommend",
      review:
        "Solid build, perfect fitting and great customer experience. BrassBlitz is setting new benchmarks!",
      author: "Lara Smith",
      location: "Sydney, Australia",
      date: "3 weeks ago",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 2); // Show 2 more each time
  };

  const reviewsToShow = allReviews.slice(0, visibleCount);

  return (
    <div className='space-y-10'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-900'>Customer Reviews</h2>
        <span className='text-gray-500'>{allReviews.length}</span>
      </div>

      {/* Reviews */}
      <div className='space-y-10'>
        {reviewsToShow.map((review, index) => (
          <div
            key={index}
            className='border border-gray-100 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition-all duration-300'
          >
            {/* Rating + Title */}
            <div className='flex items-center space-x-3 mb-3'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className='text-lg font-medium text-gray-900'>
                {review.title}
              </span>
            </div>

            {/* Review text */}
            <p className='text-gray-700 leading-relaxed mb-4'>
              {review.review}
            </p>

            {/* Author */}
            <div className='flex flex-wrap items-center gap-2 text-sm text-gray-500'>
              <div className='w-9 h-9 bg-gray-300 rounded-full'></div>
              <span className='font-medium'>{review.author}</span>
              <span>•</span>
              <span>{review.location}</span>
              <span>•</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < allReviews.length && (
        <div className='text-center'>
          <button
            onClick={loadMore}
            className='px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-sm'
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
