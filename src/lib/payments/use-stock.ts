import { useEffect, useState } from "react";

export function useStock(ids: string[]) {
  const key = ids.filter(Boolean).slice().sort().join(",");
  const [sold, setSold] = useState<string[]>([]);
  const [held, setHeld] = useState<string[]>([]);

  useEffect(() => {
    if (!key) return;
    let cancel = false;
    fetch(`/api/stock?ids=${key}`)
      .then((response) => response.json())
      .then((data: { sold?: string[]; held?: string[] }) => {
        if (cancel) return;
        setSold(data.sold ?? []);
        setHeld(data.held ?? []);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, [key]);

  return { sold, held, blocked: new Set([...sold, ...held]) };
}

export function formatPaise(paise: number) {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", {
    minimumFractionDigits: paise % 100 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
