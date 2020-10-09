import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const { perPage, totalData, paginate, nextPage, prevPage } = this.props

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalData / perPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <div className="page-link" onClick={() => prevPage()}>&laquo;</div>
                    </li>
                    {pageNumbers.map(num => (
                        <li key={num} className="page-item">
                            <div onClick={() => paginate(num)} className="page-link">{num}</div>
                        </li>
                    ))}
                    <li className="page-item">
                        <div className="page-link" onClick={() => nextPage()}>&raquo;</div>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination
