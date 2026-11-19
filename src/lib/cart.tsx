import { createContext, useContext, useEffect, useState } from "react";

const KEY = "mr-cart";

type Cart = {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Cart>({
  ids: [],
  count: 0,
  has: () => false,
  add: () => {},
  remove: () => {},
  clear: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      if (Array.isArray(parsed)) setIds(parsed.filter((id) => typeof id === "string"));
    } catch {
      setIds([]);
    }
  }, []);

  function write(next: string[]) {
    setIds(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  const value: Cart = {
    ids,
    count: ids.length,
    has: (id) => ids.includes(id),
    add: (id) => {
      if (ids.includes(id)) return;
      write([...ids, id]);
    },
    remove: (id) => write(ids.filter((item) => item !== id)),
    clear: () => write([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
