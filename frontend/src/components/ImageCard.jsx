import { useNavigate } from "react-router-dom";
const ImageCard = ({ id, image, title, description}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/course/${id}`);
    };
    return (
        <div
            className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={handleClick}
        >
            <figure className="rounded-t-xl overflow-hidden h-48">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};

export default ImageCard;
