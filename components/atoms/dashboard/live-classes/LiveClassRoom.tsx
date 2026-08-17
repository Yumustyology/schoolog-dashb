'use client';

import React, { useEffect } from 'react';
import { useDyteClient } from '@dytesdk/react-web-core';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { closeLiveClassRoom } from '@/app/lib/entities/liveClass.entity';

type LiveClassRoomProps = {
  authToken: string;
};

export const LiveClassRoom = ({ authToken }: LiveClassRoomProps) => {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    initMeeting({
      authToken,
      defaults: { audio: false, video: false },
    });
  }, [authToken, initMeeting]);

  useEffect(() => {
    if (!meeting) return;
    meeting.self.on('roomLeft', closeLiveClassRoom);
    return () => {
      meeting.self.removeListener('roomLeft', closeLiveClassRoom);
    };
  }, [meeting]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {meeting ? (
        <DyteMeeting meeting={meeting} showSetupScreen />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-white">
          Connecting to live class…
        </div>
      )}
    </div>
  );
};
