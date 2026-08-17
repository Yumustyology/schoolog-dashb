'use client';

import React, { useEffect, useState } from 'react';
import { useEntity } from 'simpler-state';
import {
  activeLiveClassId,
  closeLiveClassRoom,
} from '@/app/lib/entities/liveClass.entity';
import liveClassActions from '@/app/lib/actions/liveClass.action';
import showToast from '@/app/lib/utils/toast';
import { LiveClassRoom } from './LiveClassRoom';

/**
 * Watches activeLiveClassId — when a live class is opened for joining,
 * fetches a fresh Dyte auth token and mounts the meeting room.
 */
export const LiveClassRoomContainer = () => {
  const liveClassId = useEntity(activeLiveClassId);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (!liveClassId) {
      setAuthToken(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const response = await liveClassActions.joinLiveClass(liveClassId);
        if (!cancelled && response.data) {
          setAuthToken(response.data.authToken);
        }
      } catch (error) {
        showToast('Failed to join live class', 'live-class-join-error', {
          theme: 'light',
          type: 'error',
        });
        console.error('Error joining live class:', error);
        closeLiveClassRoom();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [liveClassId]);

  if (!liveClassId || !authToken) return null;

  return <LiveClassRoom authToken={authToken} />;
};
