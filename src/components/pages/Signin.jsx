import { cn } from "@/lib/utils";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RequiredIndicator from "../commonComponents/RequiredIndicator";
import { requiredValidator } from "@/validation/valication";
import ErrorMessage from "../commonComponents/ErrorMessage";
import { pythonPostFunction } from "@/globalFunctions/globalFunction";
import { toast } from "sonner";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      username: data.username,
      password: data.password,
    };

    try {
      const res = await pythonPostFunction("https://localhost:8000/login", payload);
      if (res.status) {
        localStorage.setItem("token", res.data.retall_api_key);
        localStorage.setItem("auth", res.data.token);
        setIsLoading(false);
        toast.success("User logged in successfully!");
        navigate("/agents/list");
      } else {
        setIsLoading(false);
        toast.error("Failed to login user!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setIsLoading(false);
      toast.error("Failed to create user!");
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="https://webviotechnologies.com/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Webvio Technology Pvt. Ltd.
        </Link>
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="username">
                        Username <RequiredIndicator />
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        className={cn(
                          errors.username &&
                            "border-red-600 focus:border-red-600 focus:ring-red-600"
                        )}
                        {...register("username", { ...requiredValidator })}
                      />
                      {errors.username && (
                        <ErrorMessage text={errors.username.message} />
                      )}
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">
                          Password <RequiredIndicator />
                        </Label>
                        {/* <Link to="#" className="ml-auto text-sm underline-offset-4 hover:underline" >Forgot your password?</Link> */}
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                          errors.password &&
                            "border-red-600 focus:border-red-600 focus:ring-red-600"
                        )}
                        {...register("password", { ...requiredValidator })}
                      />
                      {errors.password && (
                        <ErrorMessage text={errors.password.message} />
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={!isValid || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-1 animate-spin" />{" "}
                          Submitting...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/sign-up"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signin;
