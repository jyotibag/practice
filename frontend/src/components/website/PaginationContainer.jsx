import React from 'react';

const PaginationContainer = ({ pageCount, currentPage, onPageChange }) => {
  const renderList = () => {
    const listItems = [];

    // Previous Button
    if (currentPage > 1) {
      listItems.push(
        <li key="prev" className="custom-page-item page-item">
          <button className="custom-page-link page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        </li>
      );
    }

    // Page Numbers
    for (let i = 1; i <= pageCount; i++) {
      listItems.push(
        <li key={i} className={`custom-page-item page-item ${i === currentPage ? 'active' : ''}`}>
          <button className="custom-page-link page-link" onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }

    // Next Button
    if (currentPage < pageCount) {
      listItems.push(
        <li key="next" className="custom-page-item page-item">
          <button className="custom-page-link page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </li>
      );
    }

    return listItems;
  };

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-auto">
        <nav aria-label="Page navigation example">
          <ul className="custom-pagination pagination">
            {renderList()}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PaginationContainer;
