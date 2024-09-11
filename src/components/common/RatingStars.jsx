import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size = 20 }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    // Cap the review count at 5 and ensure it's at least 0
    const validReviewCount = Math.min(Math.max(Review_Count, 0), 5)
    
    // Calculate the number of full, half, and empty stars
    const fullStars = Math.floor(validReviewCount)
    const hasHalfStar = !Number.isInteger(validReviewCount)
    const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0))

    setStarCount({
      full: fullStars,
      half: hasHalfStar ? 1 : 0,
      empty: emptyStars,
    })
  }, [Review_Count])

  return (
    <div className="flex gap-1 text-yellow-100">
      {/* Full stars */}
      {Array.from({ length: starCount.full }, (_, i) => (
        <TiStarFullOutline key={i} size={Star_Size} />
      ))}
      {/* Half stars */}
      {Array.from({ length: starCount.half }, (_, i) => (
        <TiStarHalfOutline key={i} size={Star_Size} />
      ))}
      {/* Empty stars */}
      {Array.from({ length: starCount.empty }, (_, i) => (
        <TiStarOutline key={i} size={Star_Size} />
      ))}
    </div>
  )
}

export default RatingStars
