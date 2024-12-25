import React, { useEffect, useState } from 'react';
import axiosGetQuestion from '../../Api/userApi';

export default function GetQuestion() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getAllQuestions();
    }, []);

    const getAllQuestions = async () => {
        try {
            const rep = await axiosGetQuestion.get("/public/chapter/questions");
            setQuestions(rep.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleDelete = async (questionId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?");
        if (confirmDelete) {
            try {
                await axiosGetQuestion.delete(`/public/admin/questions/${questionId}`);
                alert("Xóa câu hỏi thành công!");
                setQuestions(questions.filter((question) => question.questionId !== questionId));
            } catch (error) {
                console.error("Error deleting question:", error);
                alert("Không thể xóa câu hỏi!");
            }
        }
    };

    const renderAnswers = (answers) => {
        const columns = answers.map((answer, index) => (
            <td key={index}>{answer.content}</td>
        ));
        while (columns.length < 4) {
            columns.push(<td key={`empty-${columns.length}`}>-</td>);
        }
        return columns;
    };

    const elementQuestion = questions.map((item) => (
        <tr key={item.questionId}>
            <td>{item.questionId}</td>
            <td>{item.content}</td>
            <td>{item.difficulty}</td>
            <td>{item.chapterName}</td>
            {renderAnswers(item.answers)}
            <td>
                {item.answers.find(answer => answer.isCorrect)?.content || "No correct answer"}
            </td>
            <td>
                <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(item.questionId)}
                >
                    Xóa
                </button>
                <button
                    className="btn btn-success mx-1"
                    onClick={() => window.location.href = `/public/admin/questions/${item.questionId}`}
                >
                    Cập nhật
                </button>
            </td>
        </tr>
    ));

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Quản lý câu hỏi</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => window.location.href = "/public/admin/questions"}
                >
                    Thêm Câu Hỏi
                </button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Mã câu hỏi</th>
                        <th>Nội dung</th>
                        <th>Mức độ</th>
                        <th>Tên chương</th>
                        <th>Đáp án A</th>
                        <th>Đáp án B</th>
                        <th>Đáp án C</th>
                        <th>Đáp án D</th>
                        <th>Đáp án đúng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {elementQuestion}
                </tbody>
            </table>
        </div>
    );
}
