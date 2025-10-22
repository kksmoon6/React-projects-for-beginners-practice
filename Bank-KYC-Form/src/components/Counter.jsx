import { useState } from 'react';

const Counter = () => {
  // State: 숫자를 기억하는 변수
  const [count, setCount] = useState(0);

  // 증가 함수
  const increment = () => {
    setCount(prevCounts => prevCounts + 1);
  };

  // 감소 함수
  const decrement = () => {
    setCount(count - 1);
  };

  // 리셋 함수
  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px solid #28a745',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ color: '#28a745' }}>🔢 카운터 컴포넌트</h2>
      
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#495057',
        margin: '20px 0'
      }}>
        {count}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button 
          onClick={decrement}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ➖ 감소
        </button>

        <button 
          onClick={reset}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 리셋
        </button>

        <button 
          onClick={increment}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ➕ 증가
        </button>
      </div>

      <p style={{ marginTop: '15px', color: '#6c757d' }}>
        버튼을 클릭해서 숫자를 변경해보세요!!!!
      </p>
    </div>
  );
};

export default Counter;