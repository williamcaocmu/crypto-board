import { useState } from "react";
import { useFetch } from "./useFetch";
import type { Coin } from "../types/coin";

const API_URL = import.meta.env.VITE_API_URL;

export const useCoins = () => {
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<
    | "market_cap_desc"
    | "price_desc"
    | "price_asc"
    | "change_desc"
    | "change_asc"
  >("market_cap_desc");
  const {
    data: coins,
    status,
    errorMessage,
  } = useFetch(
    `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`
  );

  const filteredCoins = [
    ...coins.filter(
      (coin: Coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    ),
  ].sort((a, b) => {
    switch (sortBy) {
      case "market_cap_desc":
        return b.market_cap - a.market_cap;
      case "price_desc":
        return b.current_price - a.current_price;
      case "price_asc":
        return a.current_price - b.current_price;
      case "change_desc":
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      case "change_asc":
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      default:
        return 0;
    }
  });

  return {
    coins: filteredCoins,
    status,
    errorMessage,
    limit,
    setLimit,
    filter,
    setFilter,
    sortBy,
    setSortBy,
  };
};
