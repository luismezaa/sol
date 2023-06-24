'use client';

import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import Button from '../ui/Button';

type TablePaginationProps = {
  pageIndex: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  pageIndex,
  pageCount,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-light">
        Página <span className="font-semibold">{pageIndex + 1}</span> de{' '}
        {pageCount}
      </span>
      <div className="flex gap-2">
        <Button
          label="Anterior"
          icon={MdArrowBackIos}
          onClick={onPreviousPage}
          color="ghost"
          disabled={!canPreviousPage}
        />
        <Button
          label="Siguiente"
          icon={MdArrowForwardIos}
          onClick={onNextPage}
          color="ghost"
          reverse
          disabled={!canNextPage}
        />
      </div>
    </div>
  );
};

export default TablePagination;
