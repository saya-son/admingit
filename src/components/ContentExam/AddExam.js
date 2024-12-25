import React, { useState } from 'react';
import axios from '../../Api/userApi';
import { useNavigate } from 'react-router-dom'; // Để điều hướng người dùng sau khi thêm bài thi

export default function AddExam() {
    const [subjectId, setSubjectId] = useState(''); // Mã môn học
    const [title, setTitle] = useState(''); // Tên bài thi
    const [description, setDescription] = useState(''); // Mô tả bài thi
    const [duration, setDuration] = useState(''); // Thời gian làm bài (phút)
    const [numberOfQuestion, setNumberOfQuestion] = useState(''); // Số câu hỏi
    const [loading, setLoading] = useState(false); // Trạng thái khi đang gửi yêu cầu
    const navigate = useNavigate(); // Dùng để điều hướng sau khi thêm bài thi thành công

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngừng mặc định của form

        // Kiểm tra các trường nhập liệu
        if (!subjectId || !title || !description || !duration || !numberOfQuestion) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        setLoading(true); // Bắt đầu gửi dữ liệu
        try {
            // Gọi API để thêm bài thi
            const response = await axios.post('/public/admin/exams', {
                examDto: {
                    subjectId,
                    title,
                    description,
                    duration,
                    createdBy: 'eb3edac2-4069-4a9b-b50e-8447150dba1d', // Thông tin người tạo bài thi (có thể thay đổi theo yêu cầu)
                },
                numberOfQuestion, // Số câu hỏi từ input người dùng
            });

            console.log('Thêm bài thi thành công:', response.data);
            alert('Bài thi đã được thêm thành công!');
            navigate('/public/admin/exams'); // Điều hướng về trang danh sách bài thi sau khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm bài thi:', error);
            alert('Không thể thêm bài thi. Vui lòng thử lại!');
        } finally {
            setLoading(false); // Kết thúc trạng thái tải
        }
    };

    return (
        <div>
            <h2>Thêm bài thi mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="subjectId" className="form-label">Mã môn học</label>
                    <input
                        type="number"
                        id="subjectId"
                        className="form-control"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Tên bài thi</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Thời gian (phút)</label>
                    <input
                        type="number"
                        id="duration"
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numberOfQuestion" className="form-label">Số câu hỏi</label>
                    <input
                        type="number"
                        id="numberOfQuestion"
                        className="form-control"
                        value={numberOfQuestion}
                        onChange={(e) => setNumberOfQuestion(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Đang thêm bài thi...' : 'Thêm bài thi'}
                </button>
            </form>
        </div>
    );
}
