import React from "react";

export interface ReviewType {
  id: number;
  user: string;
  date: string;
  like: number;
  content: string;
  images: string[];
}

interface CommentListProps {
  reviews: ReviewType[];
  visibleReviews: number;
  handleShowMore: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  reviews,
  visibleReviews,
  handleShowMore,
}) => (
  <>
    {reviews.slice(0, visibleReviews).map((review) => (
      <div key={review.id} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <span className="font-semibold">{review.user}</span>
          <span className="text-xs text-gray-500">{review.date}</span>
          <span className="ml-2 text-red-500">♥ {review.like}</span>
        </div>
        <div className="flex gap-2 items-center mb-2">
          <div className="w-16 h-16 bg-gray-300" />
          <div className="flex-1 bg-gray-100 rounded p-2">{review.content}</div>
          <button className="text-xs text-gray-400">신고</button>
        </div>
      </div>
    ))}
    {visibleReviews < reviews.length && (
      <div
        className="text-center text-gray-500 mt-8 cursor-pointer"
        onClick={handleShowMore}
      >
        댓글 더보기+
      </div>
    )}
  </>
);

export default CommentList;
