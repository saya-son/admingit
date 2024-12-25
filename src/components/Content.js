import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/content.css';
import AddChapter from './ContentChapter/AddChapter';
import GetChapter from './ContentChapter/GetChapter';
import UpdateChapter from './ContentChapter/UpdateChapter';
import AddExam from './ContentExam/AddExam';
import GetExam from './ContentExam/GetExam';
import { ContentHeader } from './ContentHeader';
import ContentHome from './ContentHome/ContentHome';
import AddQuestion from './ContentQuestion/AddQuestion';
import GetQuestion from './ContentQuestion/GetQuestion';
import UpdateQuestion from './ContentQuestion/UpdateQuestion';
import AddChapterById from './ContentSubject/AddChapterById';
import AddQuestionById from './ContentSubject/AddQuestionById';
import AddSubject from './ContentSubject/AddSubject';
import ChooseChapter from './ContentSubject/ChooseChapter';
import ChooseQuestion from './ContentSubject/ChooseQuestion';
import GetSubject from './ContentSubject/GetSubject';
import UpdateSubject from './ContentSubject/UpdateSubject';
import AddUser from './ContentUser/AddUser';
import GetUser from './ContentUser/GetUser';
import UpdateUser from './ContentUser/UpdateUser';
import Login from './Test/Login';

export default function Content() {
  return (
    <div className='content'>
        <ContentHeader />
        <Routes>

          <Route path='/home' element={<ContentHome />} />

          <Route path='/admin/users' element={<GetUser />} />
          <Route path='/public/admin/add/user' element={<AddUser />} />
          <Route path='/public/update/users/:userId' element={<UpdateUser />} />


          <Route path='/public/admin/exams' element={<GetExam />} />
          <Route path='/public/admin/add/exams' element={<AddExam />} />

          <Route path='/public/subjects' element={<GetSubject />} />
          <Route path='/public/admin/subjects/:subjectId' element={<UpdateSubject />} />
          <Route path='/public/admin/subjects' element={<AddSubject />} />
          <Route path='/public/subjects/:subjectId' element={<ChooseChapter />} />
          <Route path='/public/subjects/addChapters/:subjectId' element={<AddChapterById />} />
          <Route path='/chapter/questions/:chapterId' element={<ChooseQuestion />} />
          <Route path='/chapter/addQuestions/:chapterId' element={<AddQuestionById />} />

          <Route path='/public/subject/chapters' element={<GetChapter />} />
          <Route path='/public/admin/add/chapter' element={<AddChapter />} />
          <Route path='/public/admin/chapters/:chapterId' element={<UpdateChapter />} />

          <Route path='/public/chapter/questions' element={<GetQuestion />} />
          <Route path='/public/admin/questions' element={<AddQuestion />} />
          <Route path='/public/admin/questions/:questionId' element={<UpdateQuestion />} />

          <Route path='/auth/login' element={<Login />} />
        </Routes>       
    </div>
  )
}
