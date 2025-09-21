import { useEffect, useState } from "react";

export const useFetch = (apiUrl: string) => {
  const [data, setData] = useState<any>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setStatus("success");
        setData(data);
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, status, errorMessage };
};
