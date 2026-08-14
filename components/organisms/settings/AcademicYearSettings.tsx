import React, { useState } from 'react';
import { Calendar, Plus, Save, CloudDownload } from 'lucide-react';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { createAcademicYear } from '@/app/lib/actions/academicYear.actions';
import showToast from '@/app/lib/utils/toast';

const defaultYearData = {
  name: '2025/2026 Academic Session',
  startDate: '2025-09-01',
  endDate: '2026-07-15',
  terms: [
    { id: 1, name: 'First Term', start: '2025-09-01', end: '2025-12-15' }
  ],
  holidays: []
};

const AcademicYearSettings: React.FC = () => {
  const [yearData, setYearData] = useState(defaultYearData);
  const [loading, setLoading] = useState(false);

  // Example function to fetch holidays from your NestJS backend (which calls Nager.Date)
  const syncPublicHolidays = async () => {
    // const res = await fetch('/api/academic-year/fetch-holidays?country=NG');
    // const data = await res.json();
    // setYearData({...yearData, holidays: data});
    console.log('Holidays Synced!');
  };

  const handleTermChange = (idx: number, field: string, value: string) => {
    setYearData((prev) => ({
      ...prev,
      terms: prev.terms.map((term, i) =>
        i === idx ? { ...term, [field]: value } : term
      )
    }));
  };

  const addTerm = () => {
    setYearData((prev) => ({
      ...prev,
      terms: [
        ...prev.terms,
        {
          id: Date.now(),
          name: '',
          start: '',
          end: ''
        }
      ]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        name: yearData.name,
        startDate: yearData.startDate,
        endDate: yearData.endDate,
        terms: yearData.terms.map((t) => ({
          name: t.name,
          startDate: t.start,
          endDate: t.end,
          holidays: [],
          isCurrentlyActive: false
        })),
        isActive: true
      };
      await createAcademicYear(payload);
      showToast('Academic year initialized!', 'academic-year-success', {
        type: 'success',
      });
    } catch (e) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="text-blue-600" /> Academic Year Configuration
        </h2>
        <Button onClick={syncPublicHolidays} className="flex gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition">
          <CloudDownload size={18} /> Sync Public Holidays
        </Button>
      </div>

      {/* Date Range Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2">Session Start</label>
          <Input type="date" value={yearData.startDate} handleChange={e => setYearData({ ...yearData, startDate: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Session End</label>
          <Input type="date" value={yearData.endDate} handleChange={e => setYearData({ ...yearData, endDate: e.target.value })} />
        </div>
      </div>

      {/* Terms Section */}
      <div className="mb-8">
        <h3 className="font-bold mb-4 border-b pb-2">Terms / Semesters</h3>
        {yearData.terms.map((term, idx) => (
          <div key={term.id} className="flex gap-4 items-center mb-3 bg-blue-50 p-3 rounded-lg">
            <Input type="text" value={term.name} handleChange={e => handleTermChange(idx, 'name', e.target.value)} className="bg-transparent font-medium" />
            <Input type="date" value={term.start} handleChange={e => handleTermChange(idx, 'start', e.target.value)} className="text-sm p-1" />
            <span className="text-gray-400">to</span>
            <Input type="date" value={term.end} handleChange={e => handleTermChange(idx, 'end', e.target.value)} className="text-sm p-1" />
          </div>
        ))}
        <Button onClick={addTerm} className="text-blue-600 text-sm flex items-center gap-1 mt-2 hover:underline">
          <Plus size={16} /> Add Term
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave} loading={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
          <Save size={18} /> Initialize Academic Year
        </Button>
      </div>
    </div>
  );
};


export default AcademicYearSettings;
