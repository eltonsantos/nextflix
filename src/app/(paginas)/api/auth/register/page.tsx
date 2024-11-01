import { RegisterForm } from "@/components/RegisterForm";

export default function Login() {
  return (
    <div className="w-full flex mt-20 justify-center">
      <div className="w-full max-w-[500px] p-8 space-y-6 border border-slate-300 rounded-md bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Para favoritar os filmes</h1>
          <p className="text-gray-500">Cadastre-se no sistema</p>
        </div>

        <RegisterForm />

      </div>
    </div>
  );
}