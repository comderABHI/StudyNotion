import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import { FaStar } from 'react-icons/fa';

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15; // Fix typo in variable name

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const data = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
                console.log(data);
                if (data?.success) {
                    setReviews(data?.data);
                }
            } catch (error) {
                console.error("Error fetching reviews: ", error);
            }
        };
        fetchAllReviews();
    }, []);

    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    return (
        <div className='text-white'>
            <div className='h-[190px] max-w-maxContent'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false, // Optional: keeps autoplay going when interacted with
                    }}
                    modules={[FreeMode, Pagination, Autoplay]} // Fix the module syntax
                    className='w-full'
                >
                    {
                        reviews.length > 0 ? reviews.map((review, index) => (
                            <SwiperSlide key={index} className='p-4 bg-gray-800 rounded-lg'>
                                <div className='flex items-center'>
                                    <img 
                                        src={review.user?.image ? review.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`}
                                        alt="Profile-pic"
                                        className='h-9 w-9 object-cover rounded-full'
                                    />
                                    <div className='ml-3'>
                                        <p className='font-semibold'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                        <p className='text-sm text-gray-400'>{review?.course?.courseName}</p>
                                    </div>
                                </div>
                                <p className='mt-2 text-sm'>{truncateText(review?.review, truncateWords)}</p>
                                <div className='flex items-center mt-2'>
                                    <p className='mr-2 font-bold'>{review?.rating.toFixed(1)}</p>
                                    <ReactStars
                                        count={5}
                                        value={review?.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>
                            </SwiperSlide>
                        )) : (
                            <p className='text-center'>No reviews available.</p>
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewSlider;
