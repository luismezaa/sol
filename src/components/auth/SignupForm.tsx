'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import axios from 'axios';

import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import validateDNI from '@/src/helpers/validateDNI';

const SignupForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, 'Ingrese su nombre'),
    document: z.custom(
      (value) => validateDNI((value as string) || ''),
      'El número de cédula ingresado no es válido',
    ),
    email: z
      .string()
      .email('El correo electrónico ingresado no es válido')
      .min(1, 'Ingrese su correo electrónico'),
    password: z
      .string()
      .min(1, 'Ingrese una contraseña')
      .min(8, 'La contraseña debe contener al menos 8 caracteres'),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/signup', data)
      .then((response) => {
        toast.success(response?.data?.msg);
        router.replace('/login');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
        resetField('name');
        resetField('document');
        resetField('email');
        resetField('password');
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading title="Bienvenido" subtitle="Crea una cuenta para continuar" />
      <Input
        id="name"
        label="Nombre"
        placeholder="Juan Pérez"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="document"
        label="Número de cédula"
        placeholder="1700000000"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="email"
        label="Correo electrónico"
        placeholder="usuario@correo.com"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Button
        disabled={isLoading}
        label="Crear Cuenta"
        onClick={handleSubmit(onSubmit)}
      />
      <div className="flex flex-row items-center justify-center gap-2 font-light text-neutral-500">
        <div>¿Ya tienes una cuenta?</div>
        <Link
          href="/login"
          className="cursor-pointer text-neutral-800 decoration-dotted hover:underline"
        >
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
