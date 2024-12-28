import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateChapter() {
    const { chapterId } = useParams(); // Lấy chapterId từ URL
    const navigate = useNavigate();
    const [chapter, setChapter] = useState({
        name: '',
        subjectId: '',
        chapterNumber: ''
    });

    // Lấy thông tin chương ban đầu
    useEffect(() => {
        fetchChapterDetails();
    }, []);

    const fetchChapterDetails = async () => {
        try {
            // Lấy Bearer Token từ localStorage
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `http://localhost:8080/admin/chapters/${chapterId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Thêm Bearer Token vào header
                    }
                }
            );
            setChapter(response.data);
        } catch (error) {
            console.error('Lỗi API:', error.response?.data || error.message);
            alert('Không thể lấy thông tin chương!');
        }
    };

    // Hàm xử lý cập nhật chương
    const handleUpdate = async () => {
        try {
            // Lấy Bearer Token từ localStorage
            const token = localStorage.getItem('token');

            await axios.patch(
                `http://localhost:8080/admin/chapters/${chapterId}`,
                chapter,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Thêm Bearer Token vào header
                    }
                }
            );
            alert('Cập nhật chương thành công!');
            navigate('/subject/chapters');
        } catch (error) {
            console.error('Lỗi API:', error.response?.data || error.message);
            alert('Không thể cập nhật chương!');
        }
    };

    // Xử lý thay đổi dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setChapter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h2>Cập nhật thông tin chương</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Tên chương</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={chapter.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mã môn học</label>
                    <input
                        type="text"
                        className="form-control"
                        name="subjectId"
                        value={chapter.subjectId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Số chương</label>
                    <input
                        type="number"
                        className="form-control"
                        name="chapterNumber"
                        value={chapter.chapterNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    Cập nhật
                </button>
                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => navigate('/subject/chapters')}
                >
                    Hủy
                </button>
            </form>
        </div>
    );
}
