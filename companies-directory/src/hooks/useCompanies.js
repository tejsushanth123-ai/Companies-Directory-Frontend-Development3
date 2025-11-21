import { useEffect, useState } from "react";

import { fetchCompanies } from '../services/api';

export function useCompanies({ page, limit, searchTerm, location, industry, sortOrder }) {
  const [companies, setCompanies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCompanies() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append("_page", page);
        params.append("_limit", limit);
        if (searchTerm) params.append("q", searchTerm);
        if (location) params.append("location", location);
        if (industry) params.append("industry", industry);
        params.append("_sort", "name");
        params.append("_order", sortOrder);

        const response = await fetch(
          `${API_BASE_URL}/companies?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        const total = response.headers.get("X-Total-Count");

        setCompanies(data);
        setTotalCount(total ? Number(total) : data.length);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();

    return () => controller.abort();
  }, [page, limit, searchTerm, location, industry, sortOrder]);

  return { companies, totalCount, isLoading, error };
}
