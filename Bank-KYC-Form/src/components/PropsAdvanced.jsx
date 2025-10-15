import React, { useState } from 'react';

// 1. Props 구조분해 (Destructuring)
const UserProfile = ({ name, age, email, isOnline = false }) => {
  return (
    <div style={{ 
      border: '2px solid #007bff', 
      padding: '15px', 
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: isOnline ? '#e8f5e9' : '#ffebee'
    }}>
      <h3>👤 {name}</h3>
      <p>📧 {email}</p>
      <p>🎂 {age}세</p>
      <span style={{ 
        color: isOnline ? 'green' : 'red',
        fontWeight: 'bold'
      }}>
        ● {isOnline ? '온라인' : '오프라인'}
      </span>
    </div>
  );
};

// 2. Children Props (특별한 props)
const Card = ({ title, children }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      margin: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#333', marginBottom: '15px' }}>{title}</h3>
      {children}
    </div>
  );
};

// 3. 함수를 Props로 전달
const Button = ({ onClick, children, color = 'blue' }) => {
  return (
    <button 
      onClick={onClick}
      style={{ 
        backgroundColor: color,
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px'
      }}
    >
      {children}
    </button>
  );
};

// 4. 객체와 배열을 Props로 전달
const ShoppingList = ({ items }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '8px', 
          margin: '5px 0',
          borderRadius: '4px'
        }}>
          {item.name} - {item.quantity}개 (₩{item.price.toLocaleString()})
        </li>
      ))}
    </ul>
  );
};

const PropsAdvanced = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([
    { name: '김철수', age: 25, email: 'kim@email.com', isOnline: true },
    { name: '이영희', age: 30, email: 'lee@email.com', isOnline: false },
    { name: '박민수', age: 28, email: 'park@email.com', isOnline: true }
  ]);

  const shoppingItems = [
    { name: '사과', quantity: 5, price: 3000 },
    { name: '바나나', quantity: 3, price: 2000 },
    { name: '우유', quantity: 1, price: 2500 }
  ];

  const handleButtonClick = (buttonName) => {
    setMessage(`${buttonName} 버튼이 클릭되었습니다! 🎉`);
  };

  const toggleUserStatus = (index) => {
    const newUsers = [...users];
    newUsers[index].isOnline = !newUsers[index].isOnline;
    setUsers(newUsers);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Props 고급 개념들</h1>
      
      {/* 1. 구조분해와 기본값 */}
      <Card title="1️⃣ Props 구조분해 & 기본값">
        <p>📝 <strong>구조분해:</strong> Props를 더 깔끔하게 받는 방법</p>
        <p>🔧 <strong>기본값:</strong> isOnline = false 처럼 기본값 설정</p>
        {users.map((user, index) => (
          <div key={index} onClick={() => toggleUserStatus(index)}>
            <UserProfile 
              name={user.name}
              age={user.age}
              email={user.email}
              isOnline={user.isOnline}
            />
          </div>
        ))}
        <p style={{ fontSize: '12px', color: '#666' }}>
          💡 사용자를 클릭하면 온라인 상태가 변경됩니다!
        </p>
      </Card>

      {/* 2. Children Props */}
      <Card title="2️⃣ Children Props">
        <p>🎁 <strong>children:</strong> 컴포넌트 태그 사이의 내용</p>
        <Card title="중첩된 카드 예제">
          <p>이것은 children으로 전달된 내용입니다!</p>
          <p>JSX 요소든, 텍스트든, 무엇이든 가능합니다 ✨</p>
        </Card>
      </Card>

      {/* 3. 함수 Props */}
      <Card title="3️⃣ 함수를 Props로 전달">
        <p>🔗 <strong>이벤트 핸들러:</strong> 부모의 함수를 자식에게 전달</p>
        <div>
          <Button onClick={() => handleButtonClick('첫 번째')} color="blue">
            클릭해보세요!
          </Button>
          <Button onClick={() => handleButtonClick('두 번째')} color="green">
            나도 클릭!
          </Button>
          <Button onClick={() => handleButtonClick('세 번째')} color="purple">
            저도요!
          </Button>
        </div>
        {message && (
          <p style={{ 
            backgroundColor: '#fff3cd', 
            padding: '10px', 
            borderRadius: '5px',
            marginTop: '10px'
          }}>
            {message}
          </p>
        )}
      </Card>

      {/* 4. 복잡한 데이터 Props */}
      <Card title="4️⃣ 배열과 객체 Props">
        <p>📊 <strong>배열 데이터:</strong> 여러 항목을 Props로 전달</p>
        <ShoppingList items={shoppingItems} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          💡 map() 함수로 배열을 렌더링하고, key prop을 꼭 설정하세요!
        </p>
      </Card>

      {/* 학습 요약 */}
      <Card title="📚 Props 핵심 정리">
        <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
          <h4>✅ 배운 내용:</h4>
          <ul>
            <li><strong>구조분해:</strong> {`{ name, age } = props`} 깔끔한 문법</li>
            <li><strong>기본값:</strong> {`isOnline = false`} 안전한 기본값</li>
            <li><strong>children:</strong> 태그 사이 내용을 props로</li>
            <li><strong>함수 전달:</strong> 이벤트 핸들러 공유</li>
            <li><strong>복잡한 데이터:</strong> 배열, 객체도 props로</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PropsAdvanced;