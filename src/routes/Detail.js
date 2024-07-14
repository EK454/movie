import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Detail.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
    const savedLikes = localStorage.getItem(`likes-${id}`);
    if (savedLikes) {
      setLikes(parseInt(savedLikes, 10));
    }
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if (savedMovies.includes(id)) {
      setIsSaved(true);
    }
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, newLikes);
  };

  const handleSave = () => {
    let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if (!savedMovies.includes(id)) {
      savedMovies.push(id);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      setIsSaved(true);
    } else {
      savedMovies = savedMovies.filter(movieId => movieId !== id);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      setIsSaved(false);
    }
  };

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="movie-detail" style={{ backgroundImage: `url(${movie.background_image_original})` }}>
      <div className="movie-detail-overlay">
        <div className="poster-container">
          <img src={movie.large_cover_image} alt={movie.title} className="shining-poster" />
        </div>
        <div className="movie-detail-content">
          <h1>{movie.title}</h1>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Genres:</strong> {movie.genres.join(", ")}</p>
          <p><strong>Description:</strong> {movie.description_full}</p>
          <div className="actions">
            <button className="like-button" onClick={handleLike}>👍 Like ({likes})</button>
            <button className="save-button" onClick={handleSave}>
              {isSaved ? "Unsave" : "⭐ Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;