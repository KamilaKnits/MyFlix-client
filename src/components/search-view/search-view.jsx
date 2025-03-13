import { useState, useEffect } from "react";


export const SearchView = ({ movies}) => {

    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    
    const filterMovies =  movies.filter(movie =>
        movie.toLowerCase().includes(searchTerm.toLowerCase())
            // genreFilter ? movie.Genre.Name.includes(genreFilter) : true &&
            //     directorFilter ? movie.Director.Name.includes(directorFilter) : true &&
            //         titleFilter ? movie.Title.includes(titleFilter) : true
        );
  
    return(
        <div>
            <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            />
            <ul>
                {filteredMovies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
        </div>
    );
};
  
  


    
    


    