import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/Movie.css";

function Movie({ id, coverImg, title, summary, genres, rating }) {
    return (
        <div className="movie">
            <img src={coverImg} alt={title} />
            <h2>
                <Link to={`/movie/${id}`}>{title}</Link>
            </h2>
            <p>{summary}</p>
            <div className="movie-rating">✨Rating: {rating}</div>
            <ul>
                {genres.map((g) => (
                    <li key={g}>{g}</li>
                ))}
            </ul>
            <Link to={`/movie/${id}`} className="detail-button">
                <button>View Details</button>
            </Link>
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
};

export default Movie;
