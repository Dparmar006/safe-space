"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup.object({
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  email: yup.string().required("Please enter email"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .max(20, "Password must be less than 20 characters")
    .required("Please enter password"),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/register", {
        body: JSON.stringify(data),
        method: "POST",
      });
      const { message } = await response.json();
      if (response.ok) {
        toast.success(message);
        router.push("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setupProviders = async () => {
    try {
      const response = await getProviders();
      setProviders(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setupProviders();
  }, []);

  return (
    <section className="w-full flex items-center justify-center h-full my-12">
      <form
        className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-4 sm:p-20 items-center"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/* <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-2">
            <button
              key={providers?.google?.name}
              type="button"
              onClick={() => signIn(providers?.google?.id)}
              className="btn gap-2 bg-gray-5"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                viewBox="0 0 48 48"
                enableBackground="new 0 0 48 48"
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
   c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Sign up with google</span>
            </button>
          </div>
        </div>
        <div className="divider my-6 text-xs text-content2">
          or continue with
        </div> */}
        <h1 className="font-bold mb-2">Welcome to untold, Please signup...</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label className="form-label">First name</label>
            <input
              placeholder="First name"
              type="text"
              className="input max-w-full"
              {...register("firstName", { required: true })}
            />
            <label className="form-label">
              {errors.firstName && (
                <span className="form-label-alt text-error">
                  {errors.firstName?.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-field">
            <label className="form-label">Last name</label>
            <input
              placeholder="Last name"
              type="text"
              className="input max-w-full"
              {...register("lastName", { required: true })}
            />
            <label className="form-label">
              {errors.lastName && (
                <span className="form-label-alt text-error">
                  {errors.lastName?.message}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Email address</label>
            <input
              placeholder="Type here"
              type="email"
              className="input max-w-full"
              {...register("email", { required: true })}
            />
            <label className="form-label">
              {errors.email && (
                <span className="form-label-alt text-error">
                  {errors.email?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-field">
            <label className="form-label">
              <span>Password</span>
            </label>
            <input
              placeholder="Type here"
              type="password"
              className="input max-w-full"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
            />
            <label className="form-label">
              {errors.password && (
                <span className="form-label-alt text-error">
                  {errors.password?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-field pt-5">
            <div className="form-control justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <div className="spinner-dot-intermittent [--spinner-color:var(--gray-1)]"></div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </div>

          <div className="form-field">
            <div className="form-control">
              <Link
                href="/"
                className="link link-underline-hover link-primary text-sm"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
