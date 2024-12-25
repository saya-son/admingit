import React, { useEffect, useState } from 'react';
import axiosGetExam from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';

export default function GetExam() {
    const [exams, setExams] = useState([]); // Lưu danh sách bài thi
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    useEffect(() => {
        getAllExams();
    }, []); // Thêm dependency [] để tránh gọi API lặp lại.

    // Hàm gọi dữ liệu từ API
    const getAllExams = async () => {
        try {
            const response = await axiosGetExam.get("/public/admin/exams");
            console.log('Response data: ', response.data);
            setExams(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Error fetching exams: ', error);
        }
    };

    // Render dữ liệu ra bảng
    const elementExams = exams.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.subjectId}</td> {/* Mã môn học */}
                <td>{item.title}</td> {/* Tên đề thi */}
                <td>{item.description}</td> {/* Mô tả đề thi */}
                <td>{item.duration} phút</td> {/* Thời gian */}
                <td>{item.questions.length} câu hỏi</td> {/* Số câu hỏi */}
            </tr>
        );
    });

    return (
        <div>
            <h2>Quản lý bài thi</h2>
            
            {/* Nút "Thêm bài thi" góc trên bên phải */}
            <button
                className="btn btn-primary mb-3 float-end"
                onClick={() => navigate('/public/admin/add/exams')}
            >
                Thêm bài thi
            </button>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Mã môn học</th>
                        <th>Tên đề thi</th>
                        <th>Mô tả</th>
                        <th>Thời gian</th>
                        <th>Số câu hỏi</th>
                    </tr>
                </thead>
                <tbody>
                    {elementExams}
                </tbody>
            </table>
        </div>
    );
}
