import Button from '../Button';
import { EntryField } from '../inputs';
import './index.scss'
import React, { useState, useMemo } from 'react';

const Table = ({ columns, data, options }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [filter, setFilter] = useState('');

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = sortedData.filter(item =>
    columns.some(col => {
      const value = item[col.accessor];
      return value
        ? value.toString().toLowerCase().includes(filter.toLowerCase())
        : false;
    })
  );

  return (
    <div className='table-container-main'>
      <div className='table-functions'>
        <div>
          <EntryField
            type="text"
            placeholder="Buscar..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        <div>
          <Button onClick={options.onClick}> 
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            {options?.name}
          </Button>
        </div>

      </div>
      <table>
        <thead>
            <tr>
              {columns.map(column => (
                <th
                  key={column.accessor}
                  onClick={() => requestSort(column.accessor)}
                >
                  {column.label}
                  {sortConfig && sortConfig.key === column.accessor ? (
                    sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
                  ) : null}
                </th>
              ))}
            </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.accessor}>{ String(item[column.accessor]).length > 30 ? `${String(item[column.accessor]).slice(0,35)}...` : item[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
