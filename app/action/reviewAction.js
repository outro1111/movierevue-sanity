"use server"

import { createClient } from "next-sanity";
import { revalidateTag } from "next/cache";

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// 리뷰 등록
export async function createReview({ movieId, content, rating, userId }) {
  try {
    await serverClient.create({
      _type: 'review',
      movie: { _type: 'reference', _ref: movieId },
      user: { _type: 'reference', _ref: userId },
      content,
      rating,
    });
    revalidateTag('reviews')
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 리뷰 삭제
export async function deleteReview(id) {
  try {
    await serverClient.delete(id);
    revalidateTag('reviews')
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// 리뷰 수정
export async function updateReview({ id, content, rating }) {
  try {
    await serverClient.patch(id).set({ content, rating }).commit();
    revalidateTag('reviews')
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}