import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    setMatches(() => window && window.matchMedia(query).matches);
    const mediaQueryList = window.matchMedia(query);

    const handleMediaQueryChange = (event: any) => {
      setMatches(event.matches);
    };

    // Initial check
    setMatches(mediaQueryList.matches);

    // Add event listener for changes
    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
