import { Link } from "react-router";
import { AuthCard } from "../../components/cards/AuthCard";

export default function Register() {
  return (
    <AuthCard title="Pagina en construcción">
      <p className="text-center font-semibold text-sm text-slate-700 dark:text-slate-300">
        <Link
          className="ml-1 font-bold text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out"
          to="/auth/login"
        >
          Ir a iniciar sesión
        </Link>
      </p>
    </AuthCard>
  );
}
