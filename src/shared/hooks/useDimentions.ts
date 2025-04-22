import { useMemo, useSyncExternalStore, RefObject } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

function useDimensions(ref: RefObject<HTMLElement | null>) {
  const dimensions = useSyncExternalStore(subscribe, () =>
    JSON.stringify({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetHeight ?? 0,
    })
  );

  return useMemo(() => {
    const parsed = JSON.parse(dimensions);
    return {
      width: parsed.width as number,
      height: parsed.height as number,
    };
  }, [dimensions]);
}

export { useDimensions };
