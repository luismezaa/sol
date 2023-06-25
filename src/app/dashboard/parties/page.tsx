import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import { getParties } from '../../actions/party';
import Parties from '@/src/components/dashboard/parties/Parties';
import Heading from '@/src/components/common/Heading';
import EmptyState from '@/src/components/common/EmptyState';

const PartiesPage = async () => {
  const parties = await getParties();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading
          title="Partidos Políticos"
          subtitle="Administrar partidos políticos"
        />
        <Link href="/dashboard/parties/create" className="btn-primary btn">
          <MdOutlineAdd size={20} />
          Crear
        </Link>
      </div>
      {parties && parties.length > 0 ? (
        <Parties parties={parties} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PartiesPage;
