import React, { useReducer, useState } from 'react';
import WeekDetail from './WeekDetail';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import { cn } from '@/app/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

interface TermState {
  id: number;
  week: number;
  topic: string;
  brief: string;
}

type Action =
  | { type: 'ADD_WEEK'; payload: TermState }
  | { type: 'REMOVE_WEEK'; payload: { id: number } }
  | { type: 'EDIT_WEEK'; payload: { id: number; topic: string; brief: string } }
  | { type: 'CLEAR_WEEKS' };

// Initial state (empty array of TermState objects)
const initialState: TermState[] = [];

function reducer(state: TermState[], action: Action): TermState[] {
  switch (action.type) {
    case 'ADD_WEEK':
      return [...state, action.payload];

    case 'REMOVE_WEEK': {
      // Remove the week
      const updatedState = state.filter(
        (week) => week.id !== action.payload.id
      );

      // Reassign week numbers sequentially from 1
      return updatedState.map((week, index) => ({
        ...week,
        week: index + 1,
      }));
    }

    case 'EDIT_WEEK':
      return state.map((week) =>
        week.id === action.payload.id
          ? {
            ...week,
            topic: action.payload.topic,
            brief: action.payload.brief,
          }
          : week
      );

    case 'CLEAR_WEEKS':
      return [];

    default:
      return state;
  }
}

function Term() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState({ topic: '', brief: '' });
  const [editWeek, setEditWeek] = useState<number | null>(null); // Track which week is being edited
  const {theme} = useSlgTheme()

  console.log(state);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding or updating a week
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { topic, brief } = formData;

    if (!topic.trim() || !brief.trim()) {
      alert('Please fill in both fields.');
      return;
    }

    if (editWeek !== null) {
      // If editing an existing week
      dispatch({
        type: 'EDIT_WEEK',
        payload: { id: editWeek, topic, brief },
      });
      setEditWeek(null);
    } else {
      // If adding a new week
      const lastWeekNumber =
        state.length > 0 ? state[state.length - 1].week : 0;
      dispatch({
        type: 'ADD_WEEK',
        payload: {
          id: Date.now(),
          week: lastWeekNumber + 1,
          topic,
          brief,
        },
      });
    }

    setFormData({ topic: '', brief: '' });
  };

  // Handle deleting a week
  const handleRemoveWeek = (id: number) => {
    dispatch({ type: 'REMOVE_WEEK', payload: { id } });
  };

  // Handle editing a week
  const handleEditWeek = (week: TermState) => {
    setEditWeek(week.id);
    setFormData({ topic: week.topic, brief: week.brief });
  };

  return (
    <div className="w-full">
      {state.map((week) => (
        <WeekDetail
          key={week.id}
          week={week}
          handleRemoveWeek={handleRemoveWeek}
          handleEditWeek={handleEditWeek}
        />
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          id="topic"
          label="Topic"
          type="text"
          labelClassName="label mt-4"
          className="input h-14 rounded-lg"
          name="topic"
          placeholder="Input topic"
          value={formData.topic}
          handleChange={handleChange}
        />

        <Input
          type="textarea"
          label="Topic Brief"
          id="description"
          name="brief"
          placeholder="Briefly introduce students to the topic"
          rows={3}
          required
          labelClassName="label mt-4"
          className="input"
          inputClassName=""
          value={formData.brief}
          handleChange={handleChange}

        />

        <Button wide round type="submit" className='bg-light text-primary mt-5'>
          {editWeek !== null
            ? 'Update Week'
            : <span className={cn('text-base flex justify-center gap-2 p-1 items-center', poppins_500.className)}>
              
              <AdditionIcon color={theme.primary} /> 
              Add new topic
               </span>}
        </Button>
      </form>
    </div>
  );
}

export default Term;
