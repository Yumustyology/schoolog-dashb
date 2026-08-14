import Dot from '@/components/atoms/dashboard/subjects/Dot';
import DownloadIcon from '@/components/atoms/icons/dashboard/DownloadIcon';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn, truncateFileName } from '@/app/lib/utils';
import { MaterialType } from '@/app/lib/types/materials.types';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import React from 'react';

interface MaterialProps extends MaterialType {
  onFolderClick?: () => void;
  onMaterialClick?: () => void;
}

function Material({ onFolderClick, onMaterialClick, ...material }: MaterialProps) {
  const { theme } = useSlgTheme();
  
  const handleClick = () => {
    if (material.type === 'folder' && onFolderClick) {
      onFolderClick();
    } else if (material.type === 'material' && onMaterialClick) {
      onMaterialClick();
    }
  };

  return (
    <div 
      className="min-w-[180px] p-3 py-6 rounded-[12px] bg-white flex flex-col justify-center gap-4 relative border border-transparent hover:border-primary transition-all"
      style={{
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${theme.primary}10`;
        e.currentTarget.style.borderColor = theme.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {material.type === 'material' && (
        <div className="cursor-pointer absolute top-2.5 right-3 h-[30px] w-[30px] flex justify-center items-center bg-[#F5F5F5]  rounded-full">
          <DownloadIcon />
        </div>
      )}
      <div onClick={handleClick} className="cursor-pointer mx-auto">
        {material.icon}
      </div>
      <div
        className={cn(
          'cursor-pointer text-black1 text-center text-sm ',
          Inter_500.className
        )}
      >
        <h3 title={material.name}>{truncateFileName(material.name)}</h3>
      </div>
      <p
        className={cn(
          'text-gray mx-auto text-xs flex items-center gap-4 mb-0',
          poppins_400.className
        )}
      >
        {material.type === 'folder' ? (
          material.date
        ) : (
          <>
            {material.size} <Dot size={1} /> {material.date}
          </>
        )}
      </p>
    </div>
  );
}

export default Material;
