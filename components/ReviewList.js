"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import StarRating from "@/components/StarRating";
import { createReview, deleteReview, updateReview } from "@/app/action/reviewAction";

export default function ReviewList({ reviews, movieId }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // 상태 관리
  const [reviewInput, setReviewInput] = useState("");
  const [reviewRating, setReviewRating] = useState(1); // 기본 10점
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const textareaRef = useRef(null);

  // 날짜 포맷 함수
  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}. ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // 작성/수정 취소
  const resetForm = () => {
    setReviewInput("");
    setReviewRating(1);
    setIsEdit(false);
    setEditingId(null);
  };

  // 리뷰 등록 및 수정 실행
  const handleSubmit = async () => {
    if (!reviewInput.trim()) return alert("리뷰 내용을 입력해주세요.");

    if (isEdit) {
      const res = await updateReview({ id: editingId, content: reviewInput, rating: reviewRating });
      if (res.success) {
        alert("리뷰가 수정되었습니다.");
        resetForm();
      }
    } else {
      const res = await createReview({
        movieId,
        content: reviewInput,
        rating: reviewRating,
        userId: session?.user?.id,
      });
      if (res.success) {
        alert("리뷰가 등록되었습니다.");
        resetForm();
      }
    }
  };

  // 수정 모드 진입
  const handleEditMode = (review) => {
    setIsEdit(true);
    setEditingId(review._id);
    setReviewInput(review.content);
    setReviewRating(review.rating);
    textareaRef.current?.focus();
  };

  // 삭제 실행
  const handleDelete = async (id) => {
    if (confirm("삭제하시겠습니까?")) {
      const res = await deleteReview(id);
      if (res.success) alert("삭제되었습니다.");
    }
  };

  return (
    <div className="reviews">
      <h2 className="detail_title">Reviews</h2>

      {session ? (
        <div className="review_write_area">
          <textarea
            className="review_input"
            rows="5"
            ref={textareaRef}
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            placeholder="감상평을 등록해주세요."
          />
          <div className="review_write">
            <div className="star_rating">
              <span className="number">{reviewRating}</span>
              <StarRating
                rating={reviewRating}
                setRating={setReviewRating}
              />
            </div>
            <div className="btn_update">
              <button className="btn primary" onClick={handleSubmit}>
                {isEdit ? "리뷰 수정" : "리뷰 작성"}
              </button>
              {isEdit && <button className="btn" onClick={resetForm}>취소</button>}
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="review_login">
          <em>로그인</em> 후 리뷰를 입력해주세요.
        </Link>
      )}

      <div className="review_list">
        {reviews && reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                <p className="rating">{review.rating}</p>
                <p className="name">
                  <Image src={review.user?.image} alt={review.user?.name} width={30} height={30} />
                  {review.user?.name}
                </p>
                <p className="review">{review.content}</p>
                <p className="review_date">{formatFullDate(review._createdAt)}</p>

                {/* 본인 리뷰일 때만 수정/삭제 노출 */}
                {session?.user?.id === review.user?._id && (
                  <div className="btn_right">
                    <button className="btn sub" onClick={() => handleEditMode(review)}>수정</button>
                    <button className="btn sub" onClick={() => handleDelete(review._id)}>삭제</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="nodata">첫번째 리뷰를 남겨주세요.</p>
        )}
      </div>
    </div>
  );
}