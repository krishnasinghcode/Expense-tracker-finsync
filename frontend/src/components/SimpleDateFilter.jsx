// components/SimpleDateFilter.jsx
import React from 'react';
import Button from './Button';

export default function SimpleDateFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  type,
  setType,
  loadData,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      {/* Start Date */}
      <div className="form-control">
        <label className="label label-text">Start Date</label>
        <input
          type="date"
          className="input input-bordered"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="form-control">
        <label className="label label-text">End Date</label>
        <input
          type="date"
          className="input input-bordered"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Type Selector */}
      <div className="form-control">
        <label className="label label-text">Type</label>
        <select
          className="select select-bordered"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Refresh Button */}
      <Button text="Refresh" variant="accent" onClick={loadData} />
    </div>
  );
}
