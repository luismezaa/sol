import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

import prisma from '@/src/lib/prisma';
import validateDNI from '@/src/helpers/validateDNI';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, document, password } = body;

  if (!email || !name || !document || !password) {
    return NextResponse.json(
      { error: 'Complete todos los campos' },
      { status: 400 },
    );
  }

  if (!validateDNI(document)) {
    return NextResponse.json(
      { error: 'El número de cédula ingresado no es válido' },
      { status: 400 },
    );
  }

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    return NextResponse.json(
      { error: 'Correo electrónico en uso' },
      { status: 400 },
    );
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email, name, document, hashedPassword },
  });

  return NextResponse.json({ msg: 'Cuenta creada correctamente' });
}