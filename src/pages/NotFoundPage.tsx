
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-food-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 mb-8 text-center max-w-md text-gray-600">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
