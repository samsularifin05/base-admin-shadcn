import * as React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "./button";
import { cn } from "@/components/lib/utils";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative rounded-md">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none",
            className,
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute w-6 h-6 -translate-y-1/2 rounded-md right-1 top-1/2 text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
