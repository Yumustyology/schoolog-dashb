import { useState, useEffect } from 'react';

const useActiveTab = (name: string, data: { value: string }[]) => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window === 'undefined') return data[0]?.value || '';
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get(`${name}-tab`);
    return tabFromUrl && data.some((item) => item.value === tabFromUrl)
      ? tabFromUrl
      : data[0]?.value;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get(`${name}-tab`);

    if (tabFromUrl && data.some((item) => item.value === tabFromUrl)) {
      setActiveTab(tabFromUrl);
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
