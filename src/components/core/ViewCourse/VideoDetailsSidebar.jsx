import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsChevronDown } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

export default function VideoDetailsSidebar({ setReviewModal }) {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        if (!courseSectionData.length) return;
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData?.[
            currentSectionIndex
        ]?.subSection.findIndex((data) => data._id === subSectionId);
        const activeSubSectionId =
            courseSectionData[currentSectionIndex]?.subSection?.[
                currentSubSectionIndex
            ]?._id;
        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
    }, [courseSectionData, courseEntireData, location.pathname]);

    return (
        <div className="flex h-[calc(100vh-3.5rem)]">
            {/* Sidebar */}
            <div className="w-[320px] max-w-[350px] border-r border-r-richblack-700 bg-richblack-800 overflow-y-auto">
                <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                    <div className="flex items-center justify-between">
                        <div
                            onClick={() => navigate(`/dashboard/enrolled-courses`)}
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
                            title="Back"
                        >
                            <IoIosArrowBack size={30} />
                        </div>
                        <IconBtn
                            text="Add Review"
                            customClasses="ml-auto"
                            onclick={() => setReviewModal(true)}
                        />
                    </div>
                    <div>
                        <p className="text-white">{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-500">
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                <div className="mt-2">
                    {courseSectionData.map((course, index) => (
                        <div
                            className="cursor-pointer text-sm text-richblack-5"
                            onClick={() => setActiveStatus(course?._id)}
                            key={index}
                        >
                            {/* Section */}
                            <div className="flex items-center justify-between bg-richblack-600 px-5 py-4">
                                <div className="font-semibold">{course?.sectionName}</div>
                                <BsChevronDown
                                    className={`transition-transform duration-500 ${
                                        activeStatus === course?._id ? "rotate-180" : ""
                                    }`}
                                />
                            </div>

                            {/* Sub Sections */}
                            {activeStatus === course?._id && (
                                <div className="transition-all duration-500 ease-in-out">
                                    {course.subSection.map((topic, i) => (
                                        <div
                                            className={`flex gap-3 px-5 py-2 ${
                                                videoBarActive === topic._id
                                                    ? "bg-yellow-200 font-semibold text-richblack-800"
                                                    : "hover:bg-richblack-900"
                                            }`}
                                            key={i}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                );
                                                setVideoBarActive(topic._id);
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={completedLectures.includes(topic?._id)}
                                                readOnly
                                            />
                                            <span>{topic.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Main content would go here */}
        </div>
    );
}
