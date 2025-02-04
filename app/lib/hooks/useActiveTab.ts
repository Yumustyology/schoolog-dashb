'use client';
import { useState, useEffect } from 'react';

const useActiveTab = (name: string, data: { value: string }[]) => {
  const getInitialTab = () => {
    if (typeof window === 'undefined' || data.length === 0) {
      return data[0]?.value || '';
    }
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get(`${name}-tab`);
    return data.some((item) => item.value === tabFromUrl)
      ? tabFromUrl
      : data[0]?.value;
  };
  const initialTab = getInitialTab();
  const [activeTab, setActiveTab] = useState<string>(initialTab || '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get(`${name}-tab`);

    if (tabFromUrl && data.some((item) => item.value === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else if (!tabFromUrl) {
      const fallbackValue = data[0]?.value;
      if (fallbackValue) {
        urlParams.set(`${name}-tab`, fallbackValue);
        window.history.replaceState(
          {},
          '',
          `${window.location.pathname}?${urlParams}`
        );
      }
    }
  }, [name, data]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(`${name}-tab`, tabValue);
      window.history.pushState(
        {},
        '',
        `${window.location.pathname}?${urlParams}`
      );
    }
  };

  return { activeTab, handleTabClick };
};

export default useActiveTab;
