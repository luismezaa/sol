import Link from 'next/link';

import SignupForm from '@/src/components/auth/SignupForm';
import Heading from '@/src/components/ui/Heading';

const SignupPage = () => {
  if (process.env.SIGNUP_ALLOWED !== 'true') {
    return (
      <div className="flex flex-col gap-6">
        <Heading
          title="Opción deshabilitada"
          subtitle="Contacte con un administrador"
        />
        <Link href="/login" className="btn-primary btn w-full">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return <SignupForm />;
};

export default SignupPage;
