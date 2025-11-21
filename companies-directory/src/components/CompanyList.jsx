import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import Filters from "./Filters";
import SortControls from "./SortControls";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import ErrorState from "./ErrorState";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

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

  const totalPages = Math.ceil(totalCount / limit);

  const handleRetry = () => {
    setPage(1);
    setError(null);
  };

  return (
    <section aria-label="Companies directory">
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        location={location}
        onLocationChange={setLocation}
        industry={industry}
        onIndustryChange={setIndustry}
        onReset={() => {
          setSearchTerm("");
          setLocation("");
          setIndustry("");
          setPage(1);
        }}
      />

      <SortControls sortOrder={sortOrder} onSortChange={setSortOrder} />

      {isLoading && <LoadingSpinner />}

      {error && !isLoading && <ErrorState message={error} onRetry={handleRetry} />}

      {!isLoading && !error && (
        <>
          <ul className="company-list">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </ul>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}

export default CompanyList;
