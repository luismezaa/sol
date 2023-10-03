'use client';

import { useCallback, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import { IoMdEye } from 'react-icons/io';

import { SafeElection } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';
import Button from '../../common/Button';

interface ElectionsClientProps {
  elections: SafeElection[] | null;
}

const ElectionsClient: React.FC<ElectionsClientProps> = ({ elections }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleViewPositions = useCallback(
    (id: string) => {
      router.push(`/dashboard/elections/${id}/positions`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/elections/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/elections/${id}`)
        .then(() => {
          toast.success('Eliminado correctamente');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data);
        })
        .finally(() => setIsLoading(false));
    },
    [router],
  );

  const columnHelper = createColumnHelper<SafeElection>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('startTime', {
      header: () => 'Inicio',
      cell: (props) => dayjs(props.getValue()).format('DD/MM/YYYY HH:mm'),
    }),
    columnHelper.accessor('endTime', {
      header: () => 'Finalización',
      cell: (props) => dayjs(props.getValue()).format('DD/MM/YYYY HH:mm'),
    }),
    columnHelper.accessor('id', {
      id: 'candidates',
      header: () => 'Puestos electivos',
      cell: (props) => (
        <Button
          label="Lista de puestos"
          icon={IoMdEye}
          color="secondary"
          onClick={() => handleViewPositions(props.getValue())}
          disabled={isLoading}
        />
      ),
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => 'Acciones',
      cell: (props) => (
        <Actions
          onEdit={() => handleEdit(props.getValue())}
          onDelete={() => handleDelete(props.getValue())}
          disabled={isLoading}
        />
      ),
    }),
  ];

  return <Table columns={columns} data={elections} />;
};

export default ElectionsClient;
