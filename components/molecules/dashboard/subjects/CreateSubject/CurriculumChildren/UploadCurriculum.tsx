import React, { useState } from 'react';
import CurriculumEditor from './CurriculumEditor';
import FileUploader, { renderUIProps } from '@/components/atoms/form/FileUploader';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import ExportIcon from '@/components/atoms/icons/dashboard/ExportIcon';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { parseCurriculumFile } from '@/app/lib/utils/curriculumParser';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';
import type { CurriculumEntry } from '@/app/lib/types/curriculum.types';

export default function UploadCurriculum({
  onParsed,
  classId,
  selectedTerm,
}: {
  onParsed?: (parsed: { term: string; topics: string[] }[]) => void;
  classId: string;
  selectedTerm: TermSessionType | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleFile = (f: File | null) => {
    setFile(f);
    setParseError(null);
    // mark curriculum source as upload
    // If consumer provided onParsed, the parent will handle state updates; otherwise fallback to createSubjectEntity
    if (!f) {
      // still clear curriculumSource when nothing selected
      createSubjectEntity.set((prev) => ({ ...prev, curriculumSource: null }));
      return;
    }

    setParsing(true);
    parseCurriculumFile(f)
      .then((parsed) => {
        // map ParsedCurriculum to the internal minimal curriculum shape expected by CurriculumEditor
        const mapped = parsed.map((p) => ({ term: p.term, topics: p.topics }));
        if (onParsed) {
          onParsed(mapped);
        } else {
          const termId = selectedTerm?._id || selectedTerm?.id || '';
          const curriculumEntries: CurriculumEntry[] = parsed.map((p, index) => ({
            termId: termId || `uploaded-term-${index + 1}`,
            classId,
            topics: p.topics.map((topic, topicIndex) => ({
              id: `topic-${index + 1}-${topicIndex + 1}`,
              title: topic,
            })),
          }));
          createSubjectEntity.set((prev) => ({ ...prev, curriculum: curriculumEntries, curriculumSource: 'upload' }));
        }
      })
      .catch((err) => {
        console.error('Failed to parse curriculum file', err);
        setParseError('Failed to parse file. Make sure it is a valid .csv or .xlsx file.');
      })
      .finally(() => setParsing(false));
  };

  return (
    <div>

        <div className="mx-auto mt-5">
          <FileUploader
            onFileSelected={handleFile}
            bordered
            renderUI={({ isDragOver, file, fileName, fileSize, removeFile, getInputProps }: renderUIProps) => (
              <div className={cn('flex  flex-col items-center justify-center w-full p-6')}> 
                <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-[#ECECEC] flex items-center justify-center rounded-full">
                    <ExportIcon color={isDragOver ? '#21B55A' : '#828282'} size={22} />
                  </div>

                  <div>
                    {!file ? (
                      <>
                        <p className={cn('text-sm text-primary', poppins_500.className)}>Upload file</p>
                        <p className={cn('text-xs text-gray3 mt-1', poppins_400.className)}>This upload supports .xlsx and .csv formats</p>
                        {parsing ? <p className={cn('text-xs text-gray3 mt-1', poppins_400.className)}>Parsing file...</p> : null}
                      </>
                    ) : (
                      <div>
                        <div className={cn('text-sm text-gray6', poppins_500.className)}>{fileName}</div>
                        {fileSize ? <div className={cn('text-xs text-gray3', poppins_400.className)}>{fileSize}</div> : null}
                      </div>
                    )}
                  </div>
                </div>
                {file ? (
                  <div className="mt-3">
                    <button type="button" onClick={removeFile} className="text-red-500">Remove</button>
                    {parseError ? <div className="text-xs text-red-500 mt-2">{parseError}</div> : null}
                  </div>
                ) : null}
              </div>
            )}
            overwriteAccepted={true}
            accept={{
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
              'text/csv': [],
            }}
            preview={false}
          />
          {file ? <div className="mt-2 text-sm text-gray-700">Selected: {file.name}</div> : null}
          <div className="mt-3 text-sm">
            <a href="/assets/sample-curriculum.xlsx" download className="underline mr-4">Download sample .xlsx</a>
            <a href="/assets/sample-curriculum.csv" download className="underline">Download sample .csv</a>
          </div>
        </div>

      {/* After upload, curriculum editor will be available. For now show the editor for preview */}
      <CurriculumEditor classId={classId} selectedTerm={selectedTerm} />
    </div>
  );
}
