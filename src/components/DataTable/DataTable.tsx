import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridSortModel,
  GridPaginationModel,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';

export type DataTableColumn<R extends Record<string, unknown> = Record<string, unknown>> =
  GridColDef<R>;

export interface DataTableProps<R extends { id: string | number } = { id: string | number }> {
  rows: GridRowsProp<R>;
  columns: DataTableColumn<R>[];
  loading?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  initialSort?: GridSortModel;
  height?: number | string;
  density?: 'compact' | 'standard' | 'comfortable';
  checkboxSelection?: boolean;
  disablePagination?: boolean;
  onRowClick?: (row: R) => void;
}

const DataTable = <R extends { id: string | number }>({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25,30,50],
  initialSort,
  height = 400,
  density = 'standard',
  checkboxSelection = false,
  disablePagination = false,
  onRowClick,
}: DataTableProps<R>) => {
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize });

  return (
    <Box sx={{ height, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        density={density}
        checkboxSelection={checkboxSelection}
        initialState={{
          sorting: initialSort ? { sortModel: initialSort } : undefined,
        }}
        paginationModel={disablePagination ? undefined : paginationModel}
        onPaginationModelChange={
          disablePagination ? undefined : setPaginationModel
        }
        pageSizeOptions={pageSizeOptions}
        hideFooterPagination={disablePagination}
        onRowClick={
          onRowClick ? (params) => onRowClick(params.row as R) : undefined
        }
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
