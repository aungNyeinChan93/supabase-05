import RegisterForm from "@/components/share/RegisterForm";
import { supabase } from "@/config/supabase";
import React from "react";

const RegisterPage = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error instanceof Error) throw new Error(error?.message);
  console.log({ data });
  return (
    <React.Fragment>
      <main className="w-full min-h-screen flex items-center justify-center">
        <RegisterForm />
      </main>
    </React.Fragment>
  );
};

export default RegisterPage;
