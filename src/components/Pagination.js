import React from 'react';

const Pagination = (props) => {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className=''>
            <ul className='ul-class' style={{listStyleType: 'none', display: 'flex'}}>
                {pageNumbers.map((number, index) => {
                    return(
                        <li style={{color: 'white'}} key={index}>
                            <button className='btn' onClick={() => props.pageSelected(number)} href='!#'>{number}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Pagination;
