import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

import Layout from './layout/Layout';
import MainPage from "./components/MainPage/MainPage";
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import PasswordReset from "./components/PasswordReset/PasswordReset";
import AccountActivation from "./components/Registration/AccountActivation";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Listing from "./components/Listing/Listing";

// Test

function App() {
  return (
      <Router>
          <Layout isLoggedIn={false} isParent={false}>
              <AuthProvider>
              <Routes>
                  {/*<Route exact path="/" element={<PrivateRoute />}>*/}
                      <Route exact path="/" element={<MainPage isLoggedIn={true} isParent={true}/>} />
                  {/*</Route>*/}
                  {/*<Route exact path="/dashboard" element={<PrivateRoute />}>*/}
                  {/*    <Route exact path="/dashboard" element={<Dashboard />} />*/}
                  {/*</Route>*/}
                  {/*<Route path="/update-profile" element={<PrivateRoute />}>*/}
                  {/*    <Route path="/update-profile" element={<UpdateProfile />} />*/}
                  {/*</Route>*/}
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="/account-activation" element={<AccountActivation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="listing/:type" element={<Listing/>}/>
                  <Route path="/*" element={<NotFound />} />

                  {/*<Navigate to="/404" />*/}
                  {/*<Route path="/parent-zone" element={<ParentDashboard />} />*/}
                  {/*<Route path="/parent-profile" element={<ParentProfile />} />*/}
                  {/*<Route path="/parent-settings" element={<ParentSettings />} />*/}
                  {/*<Route path="/author-zone" element={<AuthorDashboard />} />*/}
                  {/*<Route path="/author-profile" element={<AuthorProfile />} />*/}
                  {/*<Route path="/contact" element={<Contact />} />*/}
                  {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
              </Routes>
              </AuthProvider>
              {/*<MainPage />*/}
          </Layout>
      </Router>
  );
}

export default App;
