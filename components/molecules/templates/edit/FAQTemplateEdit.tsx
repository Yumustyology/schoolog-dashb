import React, { useEffect, useState } from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { IoAdd } from 'react-icons/io5';
import websiteContentActions from '@/app/lib/actions/website-content.action';
import showToast from '@/app/lib/utils/toast';

type Question = { title: string; description: string };

const DEFAULT_QUESTIONS: { [key: string]: Question[] } = {
  General: [{ title: '', description: '' }],
  Participants: [{ title: '', description: '' }],
  Recruiters: [{ title: '', description: '' }],
};

const FAQTemplateEdit = () => {
  const tabs = ['General', 'Participants', 'Recruiters'];
  const [activeTab, setActiveTab] = useState<string>('General');
  const [questions, setQuestions] = useState<{ [key: string]: Question[] }>(DEFAULT_QUESTIONS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    websiteContentActions
      .getMyWebsiteContent()
      .then((res) => {
        const faq = res.data?.faq;
        if (faq && Object.keys(faq).length > 0) {
          setQuestions({ ...DEFAULT_QUESTIONS, ...faq });
        }
      })
      .catch(() => {
        // no saved content yet — keep defaults
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await websiteContentActions.saveFaqSection(questions);
      showToast('FAQ saved', 'faq-save', { type: 'success' });
    } catch {
      showToast('Failed to save FAQ', 'faq-save-failed', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleTabChange = (tab: string): void => setActiveTab(tab);

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ): void => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = { ...prevQuestions };
      const updatedTabQuestions = [...updatedQuestions[activeTab]];
      updatedTabQuestions[index] = {
        ...updatedTabQuestions[index],
        [field]: value,
      };
      updatedQuestions[activeTab] = updatedTabQuestions;
      return updatedQuestions;
    });
  };

  const addNewQuestion = () => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [activeTab]: [
        ...prevQuestions[activeTab],
        { title: '', description: '' },
      ],
    }));
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Frequently Asked Questions
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Edit and add FAQ to the website
          </p>
        </div>
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="text-white text-sm rounded-full"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>

      <div className="flex space-x-4 mb-8">
        {tabs.map((tab) => (
          <Button
            type="button"
            key={tab}
            className={cn(
              tab === activeTab
                ? 'rounded-full bg-light text-primary'
                : 'rounded-full bg-gray7 text-gray-3',
              'h-[34px] py-2 px-[18px]'
            )}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {questions[activeTab].map((question, index) => (
        <div key={index} className="mb-6">
          <Input
            inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
            label="Question title"
            type="text"
            className="input h-14 rounded-lg mb-6"
            placeholder="Input question title"
            value={question.title}
            handleChange={(e) =>
              handleQuestionChange(index, 'title', e.target.value)
            }
          />
          <Input
            inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
            label="Description"
            type="textarea"
            className="input rounded-lg"
            placeholder="Describe the answer here"
            value={question.description}
            handleChange={(e) =>
              handleQuestionChange(index, 'description', e.target.value)
            }
            rows={5}
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={addNewQuestion}
        className="flex bg-[#F8F8F8] text-gray1 items-center rounded-full px-3 "
      >
        <IoAdd />
        Add new question
      </Button>
    </form>
  );
};

export default FAQTemplateEdit;
