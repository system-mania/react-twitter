import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function PostHeader() {
  const navigate = useNavigate();
  return (
    <div className="post__header">
      <button className="button" onClick={() => navigate(-1)}>
        <IoIosArrowBack className="post__header-btn" />
      </button>
    </div>
  );
}
