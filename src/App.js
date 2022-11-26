import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Notify from './components/notify/Notify';
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';

import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ActivationEmail from './pages/ActivationEmail';


import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionsAction';
import { getNotifies } from './redux/actions/notifyAction';
import CallModal from './components/message/CallModal';

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient'
import Peer from 'peerjs'
import ForgotPassword from './pages/ForgotPasswork';
import ResetPassword from './pages/ResetPassword';
import EditRole from './components/adminDashboard/Management/EditRole';


function App() {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }

  }, [dispatch, auth.token])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
        }
      });
    }
  }, [])


  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  }, [dispatch])

  return (
    <Router>
      <Notify></Notify>
      <input type="checkbox" id='theme' />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header></Header>}
          {status && <StatusModal></StatusModal>}
          {auth.token && <SocketClient></SocketClient>}
          {call && <CallModal></CallModal>}
          <Routes>
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
            <Route exact path="/register" element={<Register></Register>} />
            <Route exact path="/forgot" element={<ForgotPassword></ForgotPassword>} />
            <Route exact path="/edit_role/:id" element={<EditRole></EditRole>} />
            <Route exact path="/api/reset/:activation_token" element={<ResetPassword></ResetPassword>} />
            <Route exact path="/api/activate/:activation_token" element={<ActivationEmail></ActivationEmail>} />


            <Route element={<PrivateRouter />}>
              <Route exact path="/:page" element={<PageRender />} />
              <Route exact path="/:page/:id" element={<PageRender />} />
            </Route>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
