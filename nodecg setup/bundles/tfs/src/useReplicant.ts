import { useState, useEffect } from 'react';

// Utility to deep-clone the replicant value (not needed in every render)
const deepClone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export function useReplicant<T>(
  name: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // Initialize the replicant from NodeCG
    const replicant = nodecg.Replicant<T>(name, { defaultValue });

    const handleChange = (newVal: T | undefined) => {
      if (newVal !== undefined) {
        // Only update if the new value is different to prevent unnecessary re-renders
        setValue((prevValue) => {
          // Check if the value has changed before updating
          if (JSON.stringify(prevValue) !== JSON.stringify(newVal)) {
            return deepClone(newVal);
          }
          return prevValue;
        });
      }
    };

    // Listen for changes to the replicant and handle them
    replicant.on('change', handleChange);

    // Clean up the listener when the component is unmounted or dependencies change
    return () => {
      replicant.removeListener('change', handleChange);
    };
  }, [name, defaultValue]);

  return [value, setValue];
}
