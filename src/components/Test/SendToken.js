import React, { useEffect, useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage

      if (!token) {
        alert('Bạn cần đăng nhập!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          alert(data.message || 'Không thể lấy thông tin người dùng!');
        }
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  return (
    <div>
      <h1>Chào, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
