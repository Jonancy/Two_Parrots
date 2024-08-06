import { Star } from "lucide-react";

export default function ProductReviewCard({ name, picture, rating, comment }) {
  return (
    <div className="flex items-center gap-4">
      <img src={picture} className="h-8 w-8 rounded-full object-cover"></img>
      <div>
        <div>
          <p>{name}</p>
          <div className="flex items-center gap-2">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
}
