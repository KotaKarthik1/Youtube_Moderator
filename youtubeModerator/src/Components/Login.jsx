// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom'; // Corrected import for navigate

// function Login() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); // Initialize navigate for programmatic navigation
//   const [textsample,setTextsample]=useState("hey bro tap!");
//   useEffect(() => {
//     // Check if the user is authenticated when the component mounts
//     axios
//       .get('http://localhost:3000/auth/user', { withCredentials: true })
//       .then((response) => {
//         setUser(response.data);
//         console.log(response.data);
//       })
//       .catch(() => {
//         setUser(null);
//       });
//   }, []);

//   const handleLogin = () => {
//     // Redirect to the backend to initiate Google login
//     window.open('http://localhost:3000/auth/google', '_self');
//   };
//   const handletestupload=()=>{
//     const response=axios.get('http://localhost:3000/uploadtest',{withCredentials:true})
//     .then((response)=>{
//       setTextsample(response.data);
//       console.log(response);
//     })
//     // setTextsample(response.data.text);
    
//   }
//   const handleLogout = () => {
//     // Logout from backend
//     axios
//       .get('http://localhost:3000/auth/logout', { withCredentials: true })
//       .then(() => {
//         setUser(null);
//         console.log('setted null');
//         navigate('/'); // Navigate to login or homepage after logout
//       });
//       console.log('in the function');
//   };

//   return (
//     <div>
//       {user ? (
//         <>
//         <div>
//           <h2>Welcome, {user.displayName}</h2>
//           <img src={user.photos[0].value} alt="User profile" />
    
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//         <div> 
//             <Link to='/testupload' ><button >Upload video</button></Link>
//             <button onClick={handletestupload} >{textsample}</button>
//         </div>
//         </>
//       ) : (
//         <button onClick={handleLogin}>Login with Google</button>
//       )}
//     </div>
//   );
// }

// export default Login;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(null);
  const [loginOption, setLoginOption] = useState(''); // To keep track of selected login option (organizer or editor)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [textsample, setTextsample] = useState('hey bro tap!');
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/user', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  const handletestupload = () => {
    axios.get('http://localhost:3000/uploadtest', { withCredentials: true })
      .then((response) => {
        setTextsample(response.data);
        console.log(response);
      });
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:3000/auth/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/'); // Navigate to login or homepage after logout
      });
  };

  const handleEditorLogin = () => {
    // Handle login with username and password for editor
    axios.post('http://localhost:3000/auth/editor-login', { username, password })
      .then((response) => {
        setUser(response.data);
        navigate('/'); // Redirect after successful login
      })
      .catch(() => {
        alert('Invalid login credentials');
      });
  };

  return (
    <div>
      {user ? (
        <>
          <div>
            <h2>Welcome, {user.displayName}</h2>
            <img src={user.photos[0].value} alt="User profile" />
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div> 
            <Link to='/testupload'><button>Upload video</button></Link>
            <button onClick={handletestupload}>{textsample}</button>
          </div>
        </>
      ) : (
        <>
          <h2>Select Login Option</h2>
          <div>
            <button onClick={() => setLoginOption('organizer')}>Login as Organizer</button>
            <button onClick={() => setLoginOption('editor')}>Login as Editor</button>
          </div>
          
          {/* Conditionally show Google login button for Organizer */}
          {loginOption === 'organizer' && (
            <div>
              <button onClick={handleLogin}>Login with Google</button>
            </div>
          )}

          {/* Conditionally show Username/Password form for Editor */}
          {loginOption === 'editor' && (
            <div>
              <h3>Editor Login</h3>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleEditorLogin}>Login as Editor</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Login;
