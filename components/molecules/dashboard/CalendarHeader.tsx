'use client';

import { ToolbarProps as RBBToolbarProps, View, Event as RBCEvent } from 'react-big-calendar';
import React from 'react';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import Button from '../../atoms/form/Button';

// Generic over the calendar's event/resource types so this toolbar can be
// used with any `<Calendar events={...} />` (e.g. `ActivityEvent[]`), not
// just react-big-calendar's default `Event` shape.
export const CalendarHeader = <
  TEvent extends object = RBCEvent,
  TResource extends object = object,
>(
  toolbarProps: RBBToolbarProps<TEvent, TResource>
) => {
  const { label, onNavigate, onView, views, view } = toolbarProps;

  return (
    <div className="flex justify-between items-center my-7">
      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => onNavigate('TODAY')}
          className={cn(
            // 'px-3 py-1 bg-primary text-white rounded',
            'px-3 py-1 bg-primary text-white border text-sm border-primary rounded',
            poppins_400.className
          )}
        >
          Today
        </Button>
        <Button
          onClick={() => onNavigate('PREV')}
          className={cn(
            // 'px-3 py-1 bg-primary text-white rounded',
            'px-3 py-1 bg-white text-primary border text-sm border-primary rounded',
            poppins_400.className
          )}
        >
          Prev
        </Button>
        <Button
          onClick={() => onNavigate('NEXT')}
          className={cn(
            'px-3 py-1 bg-white text-primary border text-sm border-primary rounded',
            poppins_400.className
          )}
        >
          Next
        </Button>
      </div>

      {/* Current Date Label */}
      <div className={cn('text-xl text-[#071E3B]', poppins_600.className)}>
        {label}
      </div>

      {/* View Selectors */}
      <div className="flex gap-2">
        {/* `views` can either be an array of view names, or an object
            mapping view name -> enabled (boolean/custom component). */}
        {(Array.isArray(views)
          ? views
          : (Object.keys(views) as View[]).filter((key) => views[key])
        ).map((availableView: View) => (
          <button
            key={availableView}
            onClick={() => onView(availableView)}
            className={cn(
              'px-3 py-1 rounded',
              view === availableView
                ? 'bg-primary text-white'
                : 'bg-white text-primary border border-primary',
              poppins_400.className
            )}
          >
            {availableView.charAt(0).toUpperCase() + availableView.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
