'use client';
import { useState, useEffect } from 'react';

const useActiveTab = (name: string, data: { value: string }[]) => {
  const getInitialTab = () => {
    if (typeof window === 'undefined' || data.length === 0) {
      return data[0]?.value || '';
    }
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get(`${name}-tab`) || urlParams.get('tab');
    return data.some((item) => item.value === tabFromUrl)
      ? tabFromUrl
      : data[0]?.value;
  };
  const initialTab = getInitialTab();
  const [activeTab, setActiveTab] = useState<string>(initialTab || '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get(`${name}-tab`) || urlParams.get('tab');

    if (tabFromUrl && data.some((item) => item.value === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [name, data]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const defaultTab = data[0]?.value;
      const paramKey = urlParams.has(`${name}-tab`) ? `${name}-tab` : 'tab';

      if (tabValue === defaultTab) {
        urlParams.delete(`${name}-tab`);
        urlParams.delete('tab');
      } else {
        urlParams.set(paramKey, tabValue);
      }

      const queryString = urlParams.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.pushState({}, '', newUrl);
    }
  };

  return { activeTab, handleTabClick };
};

export default useActiveTab;

