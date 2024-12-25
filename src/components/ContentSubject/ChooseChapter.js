import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ChooseChapter() {
    const { subjectId } = useParams(); // Lấy subjectId từ URL
    const navigate = useNavigate(); // Dùng để điều hướng
    const [chapters, setChapters] = useState([]);

    // Lấy dữ liệu các chương
    useEffect(() => {
        if (subjectId) {
            fetchChapters(subjectId);
        }
    }, [subjectId]);

    // Hàm gọi API để lấy danh sách các chương
    const fetchChapters = async (subjectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/public/subject/chapters/${subjectId}`);
            if (response.data && response.data.length > 0) {
                setChapters(response.data);
            } else {
                setChapters([]); // Trường hợp không có chương nào
                alert('Không có chương nào cho môn học này!');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách chương:', error.response?.data || error.message);
            alert('Không thể lấy danh sách chương!');
        }
    };

    // Hàm xóa chương
    const deleteChapter = async (chapterId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa chương này?");
        if (!confirmDelete) return;

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
            <h2>Danh sách chương</h2>

            {/* Nút thêm chương */}
            <button
                className="btn btn-primary mb-3 float-end"
                onClick={() => navigate(`/public/subjects/addChapters/${subjectId}`)}
            >
                Thêm chương
            </button>

            {/* Kiểm tra xem có chương nào không */}
            {chapters.length === 0 ? (
                <p>Không có chương nào cho môn học này.</p>
            ) : (
                // Bảng danh sách chương
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã chương</th>
                            <th>Tên chương</th>
                            <th>Chương số</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((chapter) => (
                            <tr key={chapter.chapterId}>
                                <td>{chapter.chapterId}</td>
                                <td>{chapter.name}</td>
                                <td>{chapter.chapterNumber}</td>
                                <td>
                                    {/* Nút Xóa */}
                                    <button 
                                        className="btn btn-danger me-2"
                                        onClick={() => deleteChapter(chapter.chapterId)}
                                    >
                                        Xóa
                                    </button>

                                    {/* Nút Chọn Câu Hỏi */}
                                    <button 
                                        className="btn btn-warning me-2"
                                        onClick={() => navigate(`/chapter/questions/${chapter.chapterId}`)}
                                    >
                                        Chọn câu hỏi
                                    </button>

                                    {/* Nút Cập Nhật */}
                                    <button 
                                        className="btn btn-success"
                                        onClick={() => navigate(`/public/admin/chapters/${chapter.chapterId}`)}
                                    >
                                        Cập Nhật
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
