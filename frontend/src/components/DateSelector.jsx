import React from 'react';

export default function DateSelector({ startDate, endDate, type, onStartChange, onEndChange, onTypeChange, onRefresh }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div className="form-control">
        <label className="label label-text">Start Date</label>
        <input
          type="date"
          className="input input-bordered"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label label-text">End Date</label>
        <input
          type="date"
          className="input input-bordered"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label label-text">Type</label>
        <select
          className="select select-bordered"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button className="btn btn-accent mt-4" onClick={onRefresh}>
        Refresh
      </button>
    </div>
  );
}
