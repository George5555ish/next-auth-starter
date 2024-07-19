'use client';
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./auth/CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
function VerificationForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.message);
          return;
        }
        setError(data.message);
        return;
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  useEffect(() => {
    return () => {
      onSubmit();
    };
  }, []);
  return (
    <CardWrapper
      headerLabel={"Confirming your email"}
      backButtonLabel={"Back To Login"}
      backButtonHref={""}
      showSocial={false}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}

export default VerificationForm;
