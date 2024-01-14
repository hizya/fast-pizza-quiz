import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateUser } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateUser() {

  const dispatch=useDispatch();

  // const username=useSelector(state=>state.user.username)

  const [username,setUsername]=useState('');

  const navigate=useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    if(!username.trim()) return;
    dispatch(updateUser(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit} className='mb-8'>
      <p className="mb-4 text-sm tracking-wider text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-8"
      />

      {username.trim() !== '' && (
        <div>
          <Button type="primary">
            start ordering
         </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
