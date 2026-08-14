import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    openDrawer?: (id: string) => void;
    onDelete?: (id: string, name: string) => void;
  }

  interface ColumnMeta<TData extends unknown, TValue> {
    useTypography?: boolean;
    useHeaderTypography?: boolean;
  }
}
