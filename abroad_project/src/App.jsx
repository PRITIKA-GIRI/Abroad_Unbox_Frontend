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
import Register from "./components/Register";
import Info from "./components/info/Info";
import Essay from "./components/essay/Essay";
import Application from "./components/application/Application";
import Stage1EditVideo from "./components/application/stages_action/Stage1EditVideo";
import Stage1View from "./components/adminView/Stage1View";
import AdminDashboard from "./components/adminView/AdminDashboard";
import AddUniversity from "./components/adminView/AddUniversity";
import AddSession from "./components/adminView/AddSession";
// import Stage1View from "./components/adminView/Stage1View";
import Stage2View from "./components/adminView/Stage2View";
import Stage3View from "./components/adminView/Stage3View";
import Stage4View from "./components/adminView/Stage4View";
import Stage5View from "./components/adminView/Stage5View";
import Stage6View from "./components/adminView/Stage6View";
import Stage7View from "./components/adminView/Stage7View";
import Stage8View from "./components/adminView/Stage8View";
import Stage9View from "./components/adminView/Stage9View";
import EsewaSucess from "./components/esewa/Sucess";
import EsewaFail from "./components/esewa/Fail";
import ViewTransactions from "./components/adminView/ViewTransactions";
import UpdateVideo from "./components/adminView/UpdateVideo";
import UpdateEmailSample from "./components/adminView/UpdateEmailSample";
import MastersApplication from "./components/application/masters/MastersApplication";
import ViewStudent from "./components/adminView/adminDashboard/ViewStudent";
import ViewStudentApplication from "./components/adminView/adminDashboard/ViewStudentApplication";
import ViewStudentDetail from "./components/adminView/adminDashboard/ViewStudentDetail";
import UpdateStudent from "./components/adminView/adminDashboard/UpdateStudent";
import StudentDashboard from "./components/student_dashboard/StudentDashboard";
import ApplicationSatPayment from "./components/esewa/ApplicationSatPayment";
import ApplicationPaymentSuccess from "./components/esewa/ApplicationPaymentSuccess";
import SatPaymentSuccess from "./components/esewa/SatPaymentSuccess";

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
          <Route path="/register" element={<Register />} />
          <Route path="/info" element={<Info />} />
          <Route path="/essay" element={<Essay />} />
          <Route path="/application" element={<Application />} />
          <Route path="/masters-application" element={<MastersApplication />} />
          <Route path="/esewa-success" element={<EsewaSucess />} />
          <Route path="/esewa-fail" element={<EsewaFail />} />
          <Route path="/student-dashboard/:id" element={<StudentDashboard />} />
          <Route path="/application-sat-payment" element={<ApplicationSatPayment />} />
          <Route path="/application-payment-success" element={<ApplicationPaymentSuccess />} />
          <Route path="/sat-payment-success" element={<SatPaymentSuccess />} />

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
          <Route path="/view/student" element={<AdminRoute> <ViewStudent /> </AdminRoute>} />
          <Route path="/view/student/application/:id" element={<AdminRoute> <ViewStudentApplication /> </AdminRoute>} />
          <Route path="/view/student/detail/:id" element={<AdminRoute> <ViewStudentDetail /> </AdminRoute>} />
          <Route path="/update/student/:id" element={<AdminRoute> <UpdateStudent /> </AdminRoute>} />
          
          <Route path="/add_info" element={ <AdminRoute> <AddInfo /> </AdminRoute> } />

          <Route path="/admin_dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
          <Route path="/add-university" element={ <AdminRoute> <AddUniversity /> </AdminRoute> } />
          <Route path="/add-session" element={ <AdminRoute> <AddSession /> </AdminRoute> } />
          <Route path="/update-stage-videos" element={ <AdminRoute> <UpdateVideo /> </AdminRoute> } />
          <Route path="/update-email-sample" element={ <AdminRoute> <UpdateEmailSample /> </AdminRoute> } />
          
          <Route path="/stage1/add_video" element={ <AdminRoute> <Stage1AddVideo /> </AdminRoute> } />
          <Route path="/stage1/edit_video/:id" element={ <AdminRoute> <Stage1EditVideo /> </AdminRoute> } />
          <Route path="/stage1/view" element={ <AdminRoute> <Stage1View /> </AdminRoute> } />
          <Route path="/stage2/view" element={<AdminRoute><Stage2View /></AdminRoute>} />
          <Route path="/stage3/view" element={<AdminRoute><Stage3View /></AdminRoute>} />
          <Route path="/stage4/view" element={<AdminRoute><Stage4View /></AdminRoute>} />
          <Route path="/stage5/view" element={<AdminRoute><Stage5View /></AdminRoute>} />
          <Route path="/stage6/view" element={<AdminRoute><Stage6View /></AdminRoute>} />
          <Route path="/stage7/view" element={<AdminRoute><Stage7View /></AdminRoute>} />
          <Route path="/stage8/view" element={<AdminRoute><Stage8View /></AdminRoute>} />
          <Route path="/stage9/view" element={<AdminRoute><Stage9View /></AdminRoute>} />
          
          <Route path="/view-transactions" element={<AdminRoute><ViewTransactions /></AdminRoute>} />
          {/* <Route
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
           <Route
            path="/stage4/view"
            element={
              <AdminRoute>
                <Stage4View />
              </AdminRoute>
            }
          />
          <Route
            path="/stage5/view"
            element={
              <AdminRoute>
                <Stage5View />
              </AdminRoute>
            }
          />

          <Route
            path="/stage6/view"
            element={
              <AdminRoute>
                <Stage6View />
              </AdminRoute>
            }
          />
          <Route
            path="/stage7/view"
            element={
              <AdminRoute>
                <Stage7View />
              </AdminRoute>
            }
          />
          <Route
            path="/stage8/view"
            element={
              <AdminRoute>
                <Stage8View />
              </AdminRoute>
            }
          />
          <Route
            path="/stage9/view"
            element={
              <AdminRoute>
                <Stage9View />
              </AdminRoute>
            }
          />
          <Route
            path="/view-transactions"
            element={
              <AdminRoute>
                <ViewTransactions/>
              </AdminRoute>
            }
          /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;




// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import AdminRoute from './components/adminRoute/AdminRoute';
// import Layout from './components/layout/Layout';
// import AdminLayout from './components/layout/AdminLayout';


// // Public pages
// const Home = lazy(() => import('./components/home/Home'));
// const Student = lazy(() => import('./components/Student'));
// const Login = lazy(() => import('./components/Login'));
// const Register = lazy(() => import('./components/Register'));
// const Info = lazy(() => import('./components/info/Info'));
// const Essay = lazy(() => import('./components/essay/Essay'));
// const Application = lazy(() => import('./components/application/Application'));
// const MastersApplication = lazy(() => import('./components/application/masters/MastersApplication'));
// const EsewaSuccess = lazy(() => import('./components/esewa/Sucess'));
// const EsewaFail = lazy(() => import('./components/esewa/Fail'));
// const ApplicationSatPayment = lazy(() => import('./components/esewa/ApplicationSatPayment'));
// const ApplicationPaymentSuccess = lazy(() => import('./components/esewa/ApplicationPaymentSuccess'));
// const StudentDashboard = lazy(() => import('./components/student_dashboard/StudentDashboard'));

// // Admin pages: forms & info
// const AdminDashboard = lazy(() => import('./components/adminView/AdminDashboard'));
// const AddExpAdvices = lazy(() => import('./components/forms/AddExpAdvices'));
// const AddSuccess = lazy(() => import('./components/forms/AddSuccess'));
// const RegisterStudent = lazy(() => import('./components/forms/RegisterStudent'));
// const AddInfo = lazy(() => import('./components/info/AddInfo'));
// const EditInfo = lazy(() => import('./components/info/EditInfo'));

// // Admin pages: essays & videos
// const AddVideo = lazy(() => import('./components/essay/AddVideo'));
// const EditVideo = lazy(() => import('./components/essay/EditVideo'));
// const ViewSubmittedEssay = lazy(() => import('./components/essay/ViewSubmittedEssay'));
// const UpdateVideo = lazy(() => import('./components/adminView/UpdateVideo'));
// const UpdateEmailSample = lazy(() => import('./components/adminView/UpdateEmailSample'));

// // Admin pages: stages
// const Stage1AddVideo = lazy(() => import('./components/application/stages_action/stage1AddVideo'));
// const Stage1EditVideo = lazy(() => import('./components/application/stages_action/Stage1EditVideo'));
// const Stage1View = lazy(() => import('./components/adminView/Stage1View'));
// const Stage2View = lazy(() => import('./components/adminView/Stage2View'));
// const Stage3View = lazy(() => import('./components/adminView/Stage3View'));
// const Stage4View = lazy(() => import('./components/adminView/Stage4View'));
// const Stage5View = lazy(() => import('./components/adminView/Stage5View'));
// const Stage6View = lazy(() => import('./components/adminView/Stage6View'));
// const Stage7View = lazy(() => import('./components/adminView/Stage7View'));
// const Stage8View = lazy(() => import('./components/adminView/Stage8View'));
// const Stage9View = lazy(() => import('./components/adminView/Stage9View'));

// // Admin pages: student management
// const ViewStudent = lazy(() => import('./components/adminView/adminDashboard/ViewStudent'));
// const ViewStudentApplication = lazy(() => import('./components/adminView/adminDashboard/ViewStudentApplication'));
// const ViewStudentDetail = lazy(() => import('./components/adminView/adminDashboard/ViewStudentDetail'));
// const UpdateStudent = lazy(() => import('./components/adminView/adminDashboard/UpdateStudent'));

// // Admin pages: others
// const AddUniversity = lazy(() => import('./components/adminView/AddUniversity'));
// const AddSession = lazy(() => import('./components/adminView/AddSession'));
// const ViewTransactions = lazy(() => import('./components/adminView/ViewTransactions'));

// export default function App() {
//   return (
//     <BrowserRouter basename="/abroad-unbox">
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {/* Public routes wrapped in Layout */}
//           <Route element={<Layout />}>  
//             <Route index element={<Home />} />
//             <Route path="students" element={<Student />} />
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="info" element={<Info />} />
//             <Route path="essay" element={<Essay />} />
//             <Route path="application" element={<Application />} />
//             <Route path="masters-application" element={<MastersApplication />} />
//             <Route path="esewa-success" element={<EsewaSuccess />} />
//             <Route path="esewa-fail" element={<EsewaFail />} />
//             <Route path="application-sat-payment" element={<ApplicationSatPayment />} />
//             <Route path="application-payment-success" element={<ApplicationPaymentSuccess />} />
//             <Route path="student-dashboard/:id" element={<StudentDashboard />} />
//           </Route>

//           {/* Admin routes under /admin, protected by AdminRoute + AdminLayout */}
//           <Route
//             path="admin"
//             element={
//               <AdminRoute>
//                 <AdminLayout />
//               </AdminRoute>
//             }
//           >
//             <Route index element={<AdminDashboard />} />
//             {/* Forms & Info */}
//             <Route path="add-new-alumni" element={<AddExpAdvices />} />
//             <Route path="add-success" element={<AddSuccess />} />
//             <Route path="register-student" element={<RegisterStudent />} />
//             <Route path="add-info" element={<AddInfo />} />
//             <Route path="edit-info/:id" element={<EditInfo />} />

//             {/* Essays & Videos */}
//             <Route path="add-video" element={<AddVideo />} />
//             <Route path="edit-video/:id" element={<EditVideo />} />
//             <Route path="view-submitted-essay" element={<ViewSubmittedEssay />} />
//             <Route path="update-stage-videos" element={<UpdateVideo />} />
//             <Route path="update-email-sample" element={<UpdateEmailSample />} />

//             {/* University & Session */}
//             <Route path="add-university" element={<AddUniversity />} />
//             <Route path="add-session" element={<AddSession />} />

//             {/* Stage views */}
//             <Route path="stage1/add-video" element={<Stage1AddVideo />} />
//             <Route path="stage1/edit-video/:id" element={<Stage1EditVideo />} />
//             <Route path="stage1/view" element={<Stage1View />} />
//             <Route path="stage2/view" element={<Stage2View />} />
//             <Route path="stage3/view" element={<Stage3View />} />
//             <Route path="stage4/view" element={<Stage4View />} />
//             <Route path="stage5/view" element={<Stage5View />} />
//             <Route path="stage6/view" element={<Stage6View />} />
//             <Route path="stage7/view" element={<Stage7View />} />
//             <Route path="stage8/view" element={<Stage8View />} />
//             <Route path="stage9/view" element={<Stage9View />} />

//             {/* Student Management */}
//             <Route path="view/student" element={<ViewStudent />} />
//             <Route path="view/student/application/:id" element={<ViewStudentApplication />} />
//             <Route path="view/student/detail/:id" element={<ViewStudentDetail />} />
//             <Route path="update/student/:id" element={<UpdateStudent />} />

//             {/* Transactions */}
//             <Route path="view-transactions" element={<ViewTransactions />} />
//           </Route>

//           {/* Catch-all fallback */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }
