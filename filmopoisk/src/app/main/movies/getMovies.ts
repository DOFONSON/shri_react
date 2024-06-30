    export async function getMovies(page: string, genre: string = '', year: string = '', str: string = '') {
        let queryString = `http://localhost:3030/api/v1/search?page=${page}`;
        if (genre) queryString += `&genre=${genre}`;
        if (year) queryString += `&release_year=${year}`;
        if (str) queryString += `&title=${str}`;
        try {
            const response = await fetch(queryString);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching movies:');
            throw error; 
        }
    }