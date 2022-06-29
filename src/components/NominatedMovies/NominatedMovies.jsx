import { useCallback } from 'react';
import {
    ResultBox,
    BoxTitle,
    ResultsWrapper,
    MovieItemButton,
    EmptyResultsWrapper,
    MovieItem,
} from '../component.styles';

import { useNominatedMovies } from '../../context/nominatedMovies.context';

const NominatedMovies = () => {
    const { nominatedMovies, setNominatedMovies } = useNominatedMovies();

    const handleRemove = useCallback((event) => {
        const imdbID = event.target?.dataset?.imdbid;
        if (imdbID) {
            const nominatedMovieMap = new Map(nominatedMovies);
            nominatedMovieMap.delete(imdbID);
            setNominatedMovies(nominatedMovieMap);
        }
    }, [nominatedMovies, setNominatedMovies]);

    if (nominatedMovies.size === 0) {
        return (
            <ResultBox>
                <EmptyResultsWrapper>
                    No Nominated Movies Found!
                </EmptyResultsWrapper>
            </ResultBox>
        );
    }

    return (
        <ResultBox>
            <BoxTitle>Nominated Movies</BoxTitle>
            <ResultsWrapper onClick={handleRemove}>
                {
                    [...nominatedMovies.keys()].map(imdbID => {
                        const movie = nominatedMovies.get(imdbID);
                        return (
                            <MovieItem key={imdbID}>
                                {movie.Title}
                                <MovieItemButton
                                    data-imdbid={movie.imdbID}>
                                    Remove
                                </MovieItemButton>
                            </MovieItem>
                        )
                    })
                }
            </ResultsWrapper>
        </ResultBox>
    );
}

export default NominatedMovies;
