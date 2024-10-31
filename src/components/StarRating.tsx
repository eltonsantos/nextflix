import { FaRegStar, FaStar } from "react-icons/fa";

export type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const filledStars = Math.round(rating / 2);
  const emptyStars = 5 - filledStars;

  return (
    <div className="flex gap-1 mt-1 text-yellow-400">
      {[...Array(filledStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
}
