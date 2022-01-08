import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Pagination from './Pagination';

const Giphy = () => {

    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage]= useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem- itemsPerPage;
    const currentIteams = data.slice(indexOfFirstItem, indexOfLastItem);

    const fetchData = async () => {
        setIsError(false)
        setIsloading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "iDrW7uAQsOf46LsSpyMuNDj402dOKEbo",
                    limit: 100
                }
            });
            console.log("allGifs", results);
            setData(results.data.data);

        } catch (err) {
            setIsError(true)
            console.log(err)
            setTimeout(() => setIsError(false), 4000);
        }


        setIsloading(false)
    }
    useEffect(() => {
        
        fetchData()
    }, []);

    const renderGifs = () => {
        if (isloading) {
            return <Loader />
        }
        return currentIteams.map((el) => {
            return (
                <div key={el.id} className='gif'>
                    <img src={el.images.fixed_height.url} alt={el.title} />
                </div>
            )
        })
    }

    const renderError = () => {
        if (isError) {
            return (
                <div className='alert alert-danger' role="alert">Unable to get Gifs, please try again few minutes</div>
            )
        }
    }

    const handelSearchChange = event => {
        setSearch(event.target.value);
    }

    const handelSubmit = async event => {
        event.preventDefault();
        setIsError(false)
        setIsloading(true);
        
        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "iDrW7uAQsOf46LsSpyMuNDj402dOKEbo",
                    q: search,
                    limit: 100
                }
            });
            setData(results.data.data);
            console.log('ser->', results.data.data);

        } catch (err) {
            setIsError(true)
            setTimeout(() => setIsError(false), 4000);
        }
        setIsloading(false);

    };

    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className='m-2'>
            {renderError()}
            <form className='form-inline justify-content-center m-2'>
                <input onChange={handelSearchChange} value={search} type="text" placeholder='Search' className='form-control' />
                <button onClick={handelSubmit} type='submit' className='btn btn-primary mx-2'><i className="fas fa-search"></i></button>
            </form>
            <div className='gifs'>{renderGifs()}</div>
            <div className=''>
            <Pagination pageSelected={pageSelected} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length} />

            </div>
        </div>
    )
}

export default Giphy;
