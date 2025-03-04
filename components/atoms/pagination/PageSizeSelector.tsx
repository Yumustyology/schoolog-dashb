import SelectComp from '@/components/atoms/forms/Select';

const PageSizeSelector = ({
  pageSize,
  onPageSizeChange,
}: {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}) => {
  const availableSizes = [5, 10, 20, 30, 50, 100];

  return (
    <SelectComp
      triggerClasses="h-[40px]"
      value={pageSize.toString()}
      onValueChange={(val) => onPageSizeChange(Number(val))}
      options={availableSizes.map((size) => ({
        name: `${size} per page`,
        id: size.toString(),
      }))}
    />
  );
};

export default PageSizeSelector;
