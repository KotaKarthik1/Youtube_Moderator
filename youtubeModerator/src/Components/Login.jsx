import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [userEditor, setUserEditor] = useState(JSON.parse(localStorage.getItem('userEditor')) || null);
  const [loginOption, setLoginOption] = useState(''); // To keep track of selected login option (organizer or editor)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EditorText, setEditorText] = useState('Tap for Authentication');
  const [OrganizerText, setOrganizerText] = useState('Tap for Authentication');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user or editor is already logged in on component mount
    checkUserState();
  }, []);

  const checkUserState = () => {
    axios
      .get('http://localhost:3000/auth/user', { withCredentials: true })
      .then((response) => {
        // console.log(response.data.user?.role);
        console.log("role is ",response.data.user?.role);

        if(response.data.user?.role != undefined)
        {
          setUserEditor(response.data.user);
          localStorage.setItem('userEditor', JSON.stringify(response.data)); // Store user data in localStorage
        }
        else{
          console.log(" logged in org");
          localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
          setUser(response.data);
        }
      })
      .catch(() => {
        setUser(null);
        setUserEditor(null);
        localStorage.removeItem('userEditor'); // Clear localStorage on error
        localStorage.removeItem('user'); // Clear localStorage on error
      });
  };

  const handleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
    checkUserState();
  };

  const handleAuthenticationEditor = () => {
    axios.get('http://localhost:3000/testEditorAuthentication', { withCredentials: true })
      .then((response) => {
        setEditorText(response.data);
      })
      .catch(() => {
        console.log("error authentication");
      });
  }

  const handleAuthenticationOrganizer = () => {
    axios.get('http://localhost:3000/testOrganizerAuthentication', { withCredentials: true })
      .then((response) => {
        setOrganizerText(response.data);
      })
      .catch(() => {
        console.log("error authentication");
      });
  }

  const handleLogout = () => {
    axios
      .get('http://localhost:3000/auth/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
        localStorage.removeItem('user'); // Clear localStorage on logout
        navigate('/');
      });
  };

  const handleEditorLogin = () => {
    axios.post('http://localhost:3000/EditorLogin',
      { email, password },
      { withCredentials: true } // Ensure credentials are sent
    )
      .then((response) => {
        setUserEditor(response.data);
        localStorage.setItem('userEditor', JSON.stringify(response.data)); // Store editor data in localStorage
        checkUserState();
        navigate('/');
      })
      .catch(() => {
        alert('Invalid login credentials');
      });
  };

  const handleLogoutEditor = () => {
    axios.get('http://localhost:3000/EditorLogout', { withCredentials: true })
      .then(() => {
        setUserEditor(null);
        localStorage.removeItem('userEditor'); // Clear localStorage on editor logout
        navigate('/');
        setEmail('');
        setPassword('');
      })
      .catch(() => {
        alert('Logout not successful');
      });
  };

  useEffect(()=>{

    
  },[user,userEditor])
  return (
    <div>
      {user || userEditor ? (
        <>
          {user &&
            <>
              <div>
                <h2>Welcome, {user?.displayName}</h2>
                <img src={user?.photos[0]?.value} alt="User profile" />
                <button onClick={handleLogout}>Logout organizer</button>
              </div>
              <div>
                <Link to='/testupload'><button>Upload video</button></Link>
                <button onClick={handleAuthenticationOrganizer}>{OrganizerText}</button>
              </div>
            </>
          }
          {userEditor &&
            <>
              <div>
                <h2>Welcome, {userEditor?.name}</h2>
                <button onClick={handleLogoutEditor}>Logout editor</button>
              </div>
              <div>
                <button onClick={handleAuthenticationEditor}>{EditorText}</button>
              </div>
            </>
          }
        </>
      ) : (
        <>
          <h2>Select Login Option</h2>
          <div>
            <button onClick={() => setLoginOption('organizer')}>Login as Organizer</button>
            <button onClick={() => setLoginOption('editor')}>Login as Editor</button>
          </div>

          {loginOption === 'organizer' && (
            <div>
              <button onClick={handleLogin}>Login with Google</button>
            </div>
          )}

          {loginOption === 'editor' && (
            <div>
              <h3>Editor Login</h3>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
