// src/components/DateFilter.jsx
import React from 'react';
import Button from './Button';

const DateFilter = ({ startDate, endDate, type, setStartDate, setEndDate, setType, onRefresh }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div className="form-control">
        <label className="label label-text">Start Date</label>
        <input
          type="date"
          className="input input-bordered"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label label-text">End Date</label>
        <input
          type="date"
          className="input input-bordered"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

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

      <div className="form-control">
        <label className="label label-text invisible">Refresh</label>
        <Button text="Refresh" variant="accent" onClick={onRefresh} />
      </div>
    </div>
  );
};

export default DateFilter;
