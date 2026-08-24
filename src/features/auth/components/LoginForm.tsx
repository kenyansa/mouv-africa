import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../auth.hooks';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <p className="text-xs font-bold uppercase tracking-wider text-[#cf6a4c]">Welcome back</p>
      <h2 className="display mt-2 text-4xl text-[#193f32]">Sign in to mouv.</h2>
      <p className="mt-2 text-sm text-[#68756d]">Use your Firebase account to save favorite stays.</p>

      <Input
        label="Email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        containerClassName="mt-7"
      />
      <Input
        label="Password"
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        containerClassName="mt-4"
      />

      {error && <p className="mt-3 text-sm text-[#b9563a]">{error}</p>}

      <Button type="submit" className="mt-6 w-full" loading={submitting}>
        Continue
      </Button>
    </form>
  );
}
