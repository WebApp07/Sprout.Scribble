"use client";

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerification = async () => {
    if (success || error) return;
    if (!token) {
      setError("No token found.");
    }
    newVerification(token).then((data) => {
      if (data.error) {
        data.error(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
      }
    });
  };

  return <div></div>;
};
