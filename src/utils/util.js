import { useCallback } from 'react';


  export function useScrollTo() {
    const scrollTo = useCallback((id = null, options = { behavior: 'smooth', block: 'start' }) => {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView(options);
        }
      } else {
        // Scroll to the top of the page if no id is provided
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, []);
  
    return scrollTo;
  }