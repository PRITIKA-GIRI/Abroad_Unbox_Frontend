import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddExpAdvices from "./components/forms/AddExpAdvices";
import AddSuccess from "./components/forms/AddSuccess";
import EditInfo from "./components/info/EditInfo";
import AddVideo from "./components/essay/AddVideo";
import EditVideo from "./components/essay/EditVideo";
import ViewSubmittedEssay from "./components/essay/ViewSubmittedEssay";
import RegisterStudent from "./components/forms/RegisterStudent";
import AddInfo from "./components/info/AddInfo";
import Stage1AddVideo from "./components/application/stages_action/stage1AddVideo";
import AdminRoute from "./components/adminRoute/AdminRoute";
import Home from "./components/home/Home";
import Student from "./components/Student";
import Login from "./components/Login";
import Info from "./components/info/Info";
import Essay from "./components/essay/Essay";
import Application from "./components/application/Application";
import Stage1EditVideo from "./components/application/stages_action/Stage1EditVideo";
import Stage1View from "./components/adminView/Stage1View";
import AdminDashboard from "./components/adminView/AdminDashboard";
import Stage2View from "./components/adminView/Stage2View";
import Stage3View from "./components/adminView/Stage3View";

function App() {
  return (
    <>
      {/* <BrowserRouter basename="/abroad-unbox"> */}
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Student />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/essay" element={<Essay />} />
          <Route path="/application" element={<Application />} />

          {/* admin private routes */}
          <Route
            path="/add_new_alumni"
            element={
              <AdminRoute>
                <AddExpAdvices />
              </AdminRoute>
            }
          />
          <Route
            path="/add_success"
            element={
              <AdminRoute>
                <AddSuccess />
              </AdminRoute>
            }
          />
          <Route
            path="/edit_info/:id"
            element={
              <AdminRoute>
                <EditInfo />
              </AdminRoute>
            }
          />
          <Route
            path="/add_video"
            element={
              <AdminRoute>
                <AddVideo />
              </AdminRoute>
            }
          />
          <Route
            path="/edit_video/:id"
            element={
              <AdminRoute>
                <EditVideo />
              </AdminRoute>
            }
          />
          <Route
            path="/view_submitted_essay"
            element={
              <AdminRoute>
                <ViewSubmittedEssay />
              </AdminRoute>
            }
          />
          <Route
            path="/register_student"
            element={
              <AdminRoute>
                <RegisterStudent />
              </AdminRoute>
            }
          />
          <Route
            path="/add_info"
            element={
              <AdminRoute>
                <AddInfo />
              </AdminRoute>
            }
          />
          <Route
            path="/stage1/add_video"
            element={
              <AdminRoute>
                <Stage1AddVideo />
              </AdminRoute>
            }
          />
          <Route
            path="/stage1/edit_video/:id"
            element={
              <AdminRoute>
                <Stage1EditVideo />
              </AdminRoute>
            }
          />
          <Route
            path="/stage1/view"
            element={
              <AdminRoute>
                <Stage1View />
              </AdminRoute>
            }
          />
          <Route
            path="/admin_dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/stage2/view"
            element={
              <AdminRoute>
                <Stage2View />
              </AdminRoute>
            }
          />
          <Route
            path="/stage3/view"
            element={
              <AdminRoute>
                <Stage3View />
              </AdminRoute>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
