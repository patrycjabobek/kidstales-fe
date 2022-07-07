import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

import {UserContext} from "./contexts/UserContext";
import {db} from './utils/firebase/firebase.utils';
import {doc, getDoc} from "firebase/firestore";

import Layout from './layout/Layout';
import MainPage from "./components/MainPage/MainPage";
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import PasswordReset from "./components/PasswordReset/PasswordReset";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Listing from "./components/Listing/Listing";
import PasswordResetConfirmation from "./components/PasswordReset/PasswordResetConfirmation";
import {MaterialCard} from "./components/MaterialCard/MaterialCard";
import {UserProfile} from "./components/UserProfile/UserProfile";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import StoriesListing from "./components/Listing/StoriesListing";
import CartoonsListing from "./components/Listing/CartoonsListing";
import SongsListing from "./components/Listing/SongsListing";
import Settings from "./components/Settings/Settings";
import PrivacyPolicy from "./components/Regulations/PrivacyPolicy";
import TermsAndConditions from "./components/Regulations/TermsAndConditions";
import AuthorProfile from "./components/AuthorProfile/AuthorProfile";
import Statistics from "./components/Statistics/Statistics";
import AddMaterial from "./components/AuthorProfile/AddMaterial";
import Identity from "./components/Identity/Identity";

// Test

function App() {
    // const { currentUser } = useContext(UserContext);
    // const [identity, setIdentity] = useState("")
    //
    // useEffect(() => {
    //     const getUserData = async () => {
    //
    //         const usersRef = doc(db, "users", currentUser.uid);
    //         const docSnap = await getDoc(usersRef);
    //
    //         const data = docSnap.exists() ? docSnap.data() : null
    //
    //         setIdentity(data.identity);
    //     }
    //     getUserData();
    // }, [currentUser])

  return (
      <Router>
          <Layout >
              <AuthProvider>
              <Routes>
                      <Route exact path="/" element={<MainPage />} />
                  {/*<Route exact path="/profile" element={<PrivateRoute />}>*/}
                  {/*    <Route exact path="/profile" element={<UserProfile />} />*/}
                  {/*</Route>*/}
                  {/*<Route path="/listing" element={<PrivateRoute />}>*/}
                  {/*    <Route path="/listing" element={<Listing />} />*/}
                  {/*</Route>*/}
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="/password-reset-confirmation" element={<PasswordResetConfirmation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="listing/*" element={<Listing/>}/>
                  <Route path="/*" element={<NotFound />} />
                  <Route path="/listing/:id" element={<MaterialCard />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/stories" element={<StoriesListing />} />
                  <Route path="/cartoons" element={<CartoonsListing />} />
                  <Route path="/songs" element={<SongsListing />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/author" element={<AuthorProfile />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/add" element={<AddMaterial />} />
                  <Route path="/identity" element={<Identity />} />

              </Routes>
              </AuthProvider>
              {/*<MainPage />*/}
          </Layout>
      </Router>
  );
}

export default App;
