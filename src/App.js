import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';



function getModalStyle() {
  const top = 50;
  const left = 50;                  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
    //setting up react state
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn,setOpenSignIn]=useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);



  //User auth start with use Effect
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser){
          //user has logged in..
          console.log(authUser);
          setUser(authUser);

        } else {
          //user has loged out..
          setUser(null);

        }
      })
      return () => {
        unsubscribe();
      }
    }, [user, username])

   useEffect(() =>{
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
   }, [])

   //user authentication

   const signup = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
     return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    
   }

   //sigin function
   const signIn = (event) =>{
     event.preventDefault();

     auth
     .signInWithEmailAndPassword(email, password)
     .catch((error) => alert(error.message))

     setOpenSignIn(false)
   }

  return (
    <div className="App">
    {/* Renderimage upload here */}
          <Modal
              open={open}
              onClose={() => setOpen(false)}
            >
            <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
           <img className="app__headerImage"
              src="https://i.ibb.co/kxTshFF/mainpostsallogo.png"
              alt="image"
            />
           </center>

             <Input 
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
             <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <Button type="submit" onClick={signup}>Sign Up</Button>
            </form>
            </div>
          </Modal>


          <Modal
              open={openSignIn}
              onClose={() => setOpenSignIn(false)}
            >
            <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
           <img className="app__headerImage"
              src="https://i.ibb.co/kxTshFF/mainpostsallogo.png"
              alt="image"
            />
           </center>

            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
             <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
            </div>
          </Modal>
      <div className="app__header">
          <img className="app__headerImage"
            src="https://i.ibb.co/kxTshFF/mainpostsallogo.png"
            alt="image"
            
          />        
        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>SignIn</Button>
            <Button onClick={() => setOpen(true)}>SignUp</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
      <div className="app__postsLeft">
      {
        posts.map( ({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username}  caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      </div>

      {/* <div className="app__postsRight">
      <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
      </div> */}

      </div>

          {user?.displayName ? (
          <ImageUpload username={user.displayName}/>
        ): (

          <h3 className="alert warning-alert">Sorry you need to login to upload</h3>
        )}
    </div>
    
  );
}

export default App;
