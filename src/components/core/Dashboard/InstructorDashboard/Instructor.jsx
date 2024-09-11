import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData);

            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='text-white p-6'>
      <div className='bg-richblack-800 p-6 rounded-lg mb-6'>
        <h1 className='text-3xl font-semibold mb-2'>Hi {user?.firstName}</h1>
        <p className='text-lg text-richblack-300'>Let's start something new today!</p>
      </div>

      {loading ? (
        <div className='flex justify-center items-center'>
          <div className='spinner border-t-transparent border-4 border-blue-500 w-12 h-12 rounded-full animate-spin'></div>
        </div>
      ) : courses.length > 0 ? (
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='bg-richblack-800 p-6 rounded-lg'>
              <InstructorChart courses={instructorData} />
            </div>
            <div className='bg-richblack-800 p-6 rounded-lg'>
              <p className='text-xl font-semibold mb-4'>Statistics</p>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <p>Total Courses</p>
                  <p>{courses.length}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Total Students</p>
                  <p>{totalStudents}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Total Income</p>
                  <p>Rs {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Courses */}
          <div className='mt-8'>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-xl font-semibold'>Your Courses</p>
              <Link to="/dashboard/my-courses" className='text-blue-500 hover:underline'>
                View all
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className='bg-richblack-800 p-4 rounded-lg'>
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className='w-full h-32 object-cover rounded-md mb-4'
                  />
                  <div>
                    <p className='text-lg font-semibold'>{course.courseName}</p>
                    <div className='flex items-center gap-2 text-sm text-richblack-300 mt-2'>
                      <p>{course.studentsEnrolled.length} students</p>
                      <p>|</p>
                      <p>Rs {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-richblack-800 p-6 rounded-lg text-center'>
          <p className='text-lg'>You have not created any courses yet.</p>
          <Link to={"/dashboard/addCourse"} className='text-blue-500 hover:underline mt-4 inline-block'>
            Create a Course
          </Link>
        </div>
      )}
    </div>
  );
}

export default Instructor;
