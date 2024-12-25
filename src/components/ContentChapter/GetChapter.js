import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GetChapter() {
    const [chapters, setChapters] = useState([]);
    const navigate = useNavigate();

    // Lấy danh sách chương
    useEffect(() => {
        fetchChapters();
    }, []);

    // Hàm lấy dữ liệu chương
    const fetchChapters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/public/subject/chapters');
            setChapters(response.data);
        } catch (error) {
            console.error('Lỗi API:', error.response?.data || error.message);
            alert('Không thể lấy danh sách chương!');
        }
    };

    // Hàm xóa chương
    const deleteChapter = async (chapterId) => {
        try {
            await axios.delete(`http://localhost:8080/public/admin/chapters/${chapterId}`);
            setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
            alert('Xóa chương thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa chương:', error.response?.data || error.message);
            alert('Không thể xóa chương!');
        }
    };

    return (
        <div>
            <h2>Quản lý Chương</h2>

            {/* Nút chuyển đến trang thêm chương */}
            <button
                className="btn btn-primary mb-3 float-end"
                onClick={() => navigate('/public/admin/add/chapter')}
            >
                Thêm chương
            </button>

            {/* Bảng danh sách chương */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Mã chương</th>
                        <th>Tên chương</th>
                        <th>Mã môn học</th>
                        <th>Chương số</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map((chapter) => (
                        <tr key={chapter.chapterId}>
                            <td>{chapter.chapterId}</td>
                            <td>{chapter.name}</td>
                            <td>{chapter.subjectId}</td>
                            <td>{chapter.chapterNumber}</td>
                            <td>
                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => deleteChapter(chapter.chapterId)}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="btn btn-success mx-1"
                                    onClick={() =>
                                        navigate(`/public/admin/chapters/${chapter.chapterId}`)
                                    }
                                >
                                    Cập nhật
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
