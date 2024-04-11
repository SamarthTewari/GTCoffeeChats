// @ts-ignore
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LogInPage from './LogInPage/LogInPage';
import SignupUpPage from './SignUpPage/SignUpPage';
import UserHomePage from './UserHomePage/UserHomePage';
import PickBuddyPage from './PickBuddy/PickBuddyPage';
import UserWeeklySignUpPage from './UserWeeklySignUp/UserWeeklySignUpPage';
import AdminHomePage from './AdminHomePage/AdminHomePage';
import AdminLogInPage from './AdminLogIn/AdminLogInPage';
import ViewMemberDataPage from './AdminHomePage/ViewMemberDataPage';
// @ts-ignore
import EditHistoryPage from './EditHistoryPage/EditHistoryPage';
import PrivateRouteUsers from './PrivateRouteUsers'
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRouteOTP from './PrivateRouteOTP';
import EnterOtpPage from './ForgotPassword/EnterOtpPage';
import MeetingHistoryPage from './MeetingHistory/MeetingHistoryPage';


function WebRoutes(props) {
    const [isCoffeeChatThisWeek, setisCoffeeChatThisWeek] = useState(false)
    const [userMadeDescions, setuserMadeDescions] = useState(false)



    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />  
            <Route path="/login" element={<LogInPage userDirectedFromSignUpPage = {props.userDirectedFromSignUpPage}/>} /> 
            <Route path="/signUp" element={<SignupUpPage setuserDirectedFromSignUpPage = {props.setuserDirectedFromSignUpPage}/>} />
            <Route path="/UserHomePage" element={
              <PrivateRouteUsers> 
                <UserHomePage isCoffeeChatThisWeek = {isCoffeeChatThisWeek} setisCoffeeChatThisWeek={setisCoffeeChatThisWeek} userMadeDescions = {userMadeDescions} setuserMadeDescions = {setuserMadeDescions}/>
              </PrivateRouteUsers>
            } />
            <Route path="/UserPickBuddyPage" element={
              <PrivateRouteUsers>
                <PickBuddyPage/>
              </PrivateRouteUsers>
            } />
            <Route path="/UserWeeklySignUp" element={
              <PrivateRouteUsers> 
                <UserWeeklySignUpPage isCoffeeChatThisWeek = {isCoffeeChatThisWeek} setisCoffeeChatThisWeek={setisCoffeeChatThisWeek} userMadeDescions = {userMadeDescions} setuserMadeDescions = {setuserMadeDescions}/>
              </PrivateRouteUsers>
            }/>
            <Route path="/AdminLogIn" element={<AdminLogInPage/>} />
            <Route path="/AdminHomePage" element={
              <PrivateRouteAdmin> 
                <AdminHomePage/>
              </PrivateRouteAdmin>
            } />
            <Route path="/ViewMemberData" element={
              <PrivateRouteAdmin>
                <ViewMemberDataPage/>
              </PrivateRouteAdmin>
            } />
            <Route path="/EditHistory" element={
              <PrivateRouteAdmin>
                <EditHistoryPage/>
              </PrivateRouteAdmin>
            } />
            <Route path = "/EnterOTP" element = {
              <PrivateRouteOTP> 
                <EnterOtpPage/>
              </PrivateRouteOTP>
            }> </Route>
            <Route path = "/MeetingHistory" element = {
              <PrivateRouteAdmin>
                <MeetingHistoryPage/>
              </PrivateRouteAdmin>
            }> </Route>
        </Routes>
      </BrowserRouter>
    );
  };

  export default WebRoutes