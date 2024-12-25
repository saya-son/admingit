import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ fullName: '', email: '', password: '' });

    // Hàm lấy thông tin người dùng
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/public/${userId}`); // Đảm bảo URL chính xác
            setUser({
                fullName: response.data.fullName,
                email: response.data.email,
                password: '', // Mật khẩu có thể để trống, chỉ nhập khi muốn thay đổi
            });
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error.response?.data || error.message);
            alert('Không thể lấy thông tin người dùng!');
        }
    };

    // Hàm cập nhật thông tin người dùng
    const handleUpdate = async () => {
        try {
            // Kiểm tra nếu mật khẩu rỗng thì không gửi mật khẩu
            const updatedUser = { 
                fullName: user.fullName, 
                email: user.email, 
                password: user.password || undefined  // Nếu không có mật khẩu thì bỏ qua
            };

            await axios.patch(`http://localhost:8080/public/update/users/${userId}`, updatedUser);
            alert('Cập nhật thông tin người dùng thành công!');
            navigate('/public/admin/users'); // Quay lại trang danh sách người dùng
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error.response?.data || error.message);
            alert('Không thể cập nhật thông tin người dùng!');
            console.log(userId)
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    return (
        <div>
            <h2>Cập nhật thông tin người dùng</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Họ và tên</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={user.fullName}
                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu (nếu muốn thay đổi)</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleUpdate}>
                    Cập nhật
                </button>
            </form>
        </div>
    );
}
