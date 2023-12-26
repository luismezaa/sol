'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';

import { SafeElection, SafeUser, SafeUserWithHasVoted } from '@/types';
import Heading from '@/components/shared/heading';
import GoBack from '@/components/shared/go-back';
import EmptyState from '@/components/shared/empty-state';
import { columns } from '@/app/dashboard/elections/[electionId]/voters/_components/columns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { toast } from '@/components/ui/use-toast';
import { UserPlus, UserX } from 'lucide-react';
import AlertModal from '@/components/modals/alert-modal';
import AddVotersModal from '@/components/modals/add-voters-modal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icons } from '@/components/shared/icons';
import { useAddVotersModalStore } from '@/store/add-voters-modal';

interface VotersClientProps {
  election: SafeElection | null;
  voters: SafeUserWithHasVoted[] | null;
  elegibleVoters: SafeUser[] | null;
}

const VotersClient: React.FC<VotersClientProps> = ({
  election,
  voters,
  elegibleVoters,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const isElectionOnGoing =
    dayjs().isAfter(dayjs(election?.startTime)) &&
    dayjs().isBefore(dayjs(election?.endTime));

  // disconnect voters
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] =
    React.useState(false);
  const [disconnectRowSelection, setDisconnectRowSelection] = React.useState(
    {},
  );
  const [disconnectSelectedData, setDisconnectSelectedData] = React.useState<
    SafeUserWithHasVoted[]
  >([]);

  const handleVotersDisconnect = () => {
    setIsLoading(true);

    // make an array of {id: string} from selectedData
    const selectedIds = disconnectSelectedData.map((user) => ({ id: user.id }));

    axios
      .post(`/api/elections/${election?.id}/voters/bulkDisconnect`, selectedIds)
      .then((response) => {
        toast({
          title: 'Votantes removidos',
          description: response?.data,
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error',
          description: error?.response?.data,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsDisconnectModalOpen(false);
        setDisconnectRowSelection({});
      });
  };

  const selectActions = (
    <>
      {disconnectSelectedData.length > 0 && (
        <Button
          variant="destructive"
          disabled={isElectionOnGoing}
          onClick={() => setIsDisconnectModalOpen(true)}
        >
          <UserX className="mr-2 h-4 w-4" />
          Eliminar votantes
        </Button>
      )}
    </>
  );

  // add voters

  const { isOpen: isAddVotersModalOpen, setIsOpen: setIsAddVotersModalOpen } =
    useAddVotersModalStore();

  return (
    <>
      <AlertModal
        description="Al modificar el padrón electoral se pondrá en cero el proceso electoral. Esta acción no se puede deshacer."
        confirmText="Aceptar"
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onConfirm={() => handleVotersDisconnect()}
        isLoading={isLoading}
      />
      <div className="space-y-8">
        <Alert variant="destructive">
          <Icons.warning className="h-4 w-4" />
          <AlertTitle>¡Atención!</AlertTitle>
          <AlertDescription>
            Cualquier cambio que realice en el padrón electoral pondrá en cero
            el conteo de votos y los certificados de votación generados.
          </AlertDescription>
        </Alert>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Heading
            title="Padrón electoral"
            subtitle={`Administre los votantes de ${election?.name}`}
          />
          <div className="flex flex-wrap gap-4 lg:flex-col lg:items-end">
            <GoBack />
            <>
              <AddVotersModal
                electionId={election?.id || ''}
                elegibleVoters={elegibleVoters}
              />
              <Button
                disabled={isElectionOnGoing || isAddVotersModalOpen}
                onClick={() => setIsAddVotersModalOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Agregar votantes
              </Button>
            </>
          </div>
        </div>
        {voters && voters.length > 0 ? (
          <DataTable
            columns={columns}
            data={voters}
            selectedRows={disconnectRowSelection}
            setSelectedRows={setDisconnectRowSelection}
            setSelectedData={setDisconnectSelectedData}
            showRowSelection
            selectActions={selectActions}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};

export default VotersClient;