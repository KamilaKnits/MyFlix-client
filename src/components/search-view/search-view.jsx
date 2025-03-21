import { useState } from "react";


export const SearchView = ({ movies, setRenderedMovies}) => {

    const handleSearch = ({target}) => {
        const filterMovies =  movies.filter((movie) =>
        movie.Title.toLowerCase().includes(target.value.toLowerCase()) );
      // setSearchTerm(target.value);
      // if (!searchTerm) {
      //   setRenderedMovies(movies);
      // }
      // const filterMovies =  movies.filter((movie) =>
      //   movie.Title.toLowerCase().includes(searchTerm.toLowerCase()) );
      
      setRenderedMovies(filterMovies);
    };
  
    
    return(
        <div>
            <input
            type="text"
            placeholder="Search..."
            // value={searchTerm}
            onChange={handleSearch}
            />
        </div>
    );
};
  

 


    
    


    