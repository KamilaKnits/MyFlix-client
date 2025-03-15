import { useState, useEffect } from "react";


export const SearchView = ({ movies, setRenderedMovies}) => {

    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (event) => {
        
      setSearchTerm(event.target.value);
      const filterMovies =  movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase()) );

      setRenderedMovies(filterMovies);
    };
  
    
    return(
        <div>
            <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            />
        </div>
    );
};
  
  


    
    


    