import { useNavigate } from "react-router-dom";
import { Button } from "@/components/custom/button";
import { cn } from "@/components";

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate();
  return (
    <div className={cn("h-svh w-full", className)}>
      <div className="flex flex-col items-center justify-center w-full h-full gap-2 m-auto">
        {!minimal && (
          <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        )}
        <span className="font-medium">Oops! Something went wrong {`:')`}</span>
        <p className="text-center text-muted-foreground">
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
