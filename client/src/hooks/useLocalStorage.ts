import React from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue?: T | undefined | (() => T | undefined)
) {
  const [value, setValue] = React.useState<T | undefined>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T | undefined)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue) as T;
    }
  });

  React.useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T | undefined, typeof setValue];
}
