import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";
import { useCoins } from "./hooks/useCoins";

const App = () => {
  const {
    coins,
    status,
    errorMessage,
    limit,
    setLimit,
    filter,
    setFilter,
    sortBy,
    setSortBy,
  } = useCoins();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return (
      <div className="error">
        <p>❌ {errorMessage}</p>
      </div>
    );
  }

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(
      sortBy as
        | "market_cap_desc"
        | "price_desc"
        | "price_asc"
        | "change_desc"
        | "change_asc"
    );
  };

  return (
    <>
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={handleFilterChange} />
        <LimitSelector limit={limit} onLimitChange={handleLimitChange} />
        <SortSelector sortBy={sortBy} onSortChange={handleSortChange} />
      </div>

      <main className="grid">
        {coins.map((coin) => (
          <CoinCard coin={coin} key={coin.id} />
        ))}
      </main>
    </>
  );
};

export default App;
