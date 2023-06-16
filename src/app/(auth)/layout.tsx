import Image from 'next/image';
import { redirect } from 'next/navigation';

import logo from '@/public/img/logo.svg';
import voting from '@/public/img/voting.svg';
import getCurrentUser from '../actions/getCurrentUser';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser) return redirect('/');

  return (
    <div className="grid min-h-screen grid-cols-3">
      {/* left */}
      <div className="col-span-3 hidden flex-col items-center justify-center gap-12 bg-gray-50 text-center xl:col-span-2 xl:flex">
        <Image src={voting} alt="voting" className="w-2/6" priority />
        <p className="w-3/6 text-lg leading-relaxed text-neutral-800">
          El sistema de votación electrónica que garantiza{' '}
          <span className="font-semibold">resultados rápidos y confiables</span>{' '}
          en sus procesos electorales.
        </p>
      </div>
      {/* right */}
      <div className="col-span-3 flex flex-col justify-center gap-8 bg-base-100 p-10 xl:col-span-1 xl:border-l-[1px] 2xl:px-20">
        <Image src={logo} width={120} alt="logo" priority />
        {children}
      </div>
    </div>
  );
}
