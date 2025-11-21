const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";


export async function fetchCompanies(params) {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('_page', params.page);
  if (params.limit) searchParams.append('_limit', params.limit);
  if (params.searchTerm) searchParams.append('q', params.searchTerm);
  if (params.location) searchParams.append('location', params.location);
  if (params.industry) searchParams.append('industry', params.industry);
  searchParams.append('_sort', 'name');
  searchParams.append('_order', params.sortOrder || 'asc');

  const url = `${API_BASE_URL}/companies?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const totalCount = Number(response.headers.get('X-Total-Count') || data.length);

  return { data, totalCount };
}
