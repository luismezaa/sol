import { notFound } from 'next/navigation';

import { getPositionById } from '@/actions/position';
import { getElections } from '@/actions/election';
import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import PositionForm from '@/components/dashboard/positions/form';

interface UpdatePositionPageProps {
  params: {
    positionId?: string;
  };
}

const UpdatePositionPage = async ({ params }: UpdatePositionPageProps) => {
  const position = await getPositionById(params);
  const elections = await getElections();
  if (!position) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Editar dignidad"
          subtitle="Actualice los datos de una dignidad existente"
        />
        <GoBack />
      </div>
      <PositionForm initialData={position} elections={elections} />
    </div>
  );
};

export default UpdatePositionPage;
