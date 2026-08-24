import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen place-items-center bg-[#f7f8f5] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_18px_50px_rgba(35,58,42,.08)]">
        <LoginForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
}
