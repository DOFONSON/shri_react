export default async function getMovies(id: string) {
    const url = `http://localhost:3030/api/v1/movie/${id}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching movies:');
        throw error; 
    }
}