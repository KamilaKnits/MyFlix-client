import { useState } from "react";

export const MainView = () => {
    const [movies, setMovies] = useState([

        {id: 1, title: "Death Becomes Her"},
        {id: 2, title:"Back to the Future"},
        {id: 3, title: "Up"}
    ]);

   return (
    <div>
        {movies.map((movie) => {
            return <div>{movie.title}</div>;
        })}
    </div>
   );

};
