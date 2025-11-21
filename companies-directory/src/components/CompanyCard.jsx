import React from "react";

function CompanyCard({ company }) {
  return (
    <li>
      <article className="company-card">
        <header>
          <h2>{company.name}</h2>
          <p>
            {company.location} • {company.industry}
          </p>
        </header>
        <p>{company.description}</p>
        <p>Size: {company.size} employees</p>
        <p>Founded: {company.foundedYear}</p>
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="company-link"
          aria-label={`Visit website for ${company.name}`}
        >
          Visit website
        </a>
      </article>
    </li>
  );
}

export default CompanyCard;
