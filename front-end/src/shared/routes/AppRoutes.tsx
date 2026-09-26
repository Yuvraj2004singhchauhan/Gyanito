import { Route, Routes } from "react-router-dom";
import Home from "../../modules/users/pages/Home.tsx";
import About from "../../modules/users/pages/About.tsx";
import Leaderboard from "../../modules/users/pages/Leaderboard.tsx";
import Signup from "../../modules/users/pages/SignUp.tsx";
import Login from "../../modules/users/pages/Login.tsx";
import Dashboard from "@/modules/users/pages/Dashboard.tsx";
import AdminDashboard from "@/modules/users/pages/adminDashboard.tsx";
import CreateQuiz from "@/modules/users/pages/CretaeQuiz.tsx";
import EditQuiz from "@/modules/users/pages/EditQuiz.tsx";
import QuizPage from "@/modules/users/pages/QuizPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx"; // adjust path to wherever you place PrivateRoute.tsx




const AppRoutes = ()=>{
    return (<>
        <Routes>
              <Route path="/" element={<Home/>}/>
             <Route path="/about" element={<About/>}/>
             <Route path="/leaderboard" element={<Leaderboard/>}/>
             <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path="/admindashboard" element={<PrivateRoute requiredRole="admin"><AdminDashboard/></PrivateRoute>}></Route>
            <Route path="/admin/create-quiz" element={<PrivateRoute requiredRole="admin"><CreateQuiz /></PrivateRoute>} />
            <Route path="/admin/edit-quiz/:id" element={<PrivateRoute requiredRole="admin"><EditQuiz /></PrivateRoute>} />
            <Route path="/quiz/:id" element={<QuizPage />} />

        </Routes>
    </>)

}

export default AppRoutes;