import { FiImage } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import AuthContext from 'context/AuthContext';
import { db } from 'firebaseApp';

export default function PostForm() {
  const [content, setContent] = useState<string>('');
  const { user } = useContext(AuthContext);
  const handleFileUpload = () => {};
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        content: content,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        email: user?.email,
        uid: user?.uid,
      });
      setContent('');
      toast.success('포스트가 작성되었습니다.');
    } catch (e: any) {
      console.log(e);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'content') {
      setContent(value);
    }
  };
  return (
    <form action="" className="post-form" onSubmit={onSubmit}>
      <textarea
        name="content"
        id="content"
        className="post-form__textarea"
        required
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
}