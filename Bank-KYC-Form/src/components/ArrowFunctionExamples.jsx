import { useState } from 'react';

const ArrowFunctionExamples = () => {
  const [number, setNumber] = useState(5);
  const [name, setName] = useState('');
  const [items, setItems] = useState([1, 2, 3]);

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px solid #9c27b0',
      borderRadius: '10px',
      backgroundColor: '#f3e5f5'
    }}>
      <h2 style={{ color: '#9c27b0' }}>🏹 화살표 함수 ({'='}{'>'})) 예제들</h2>

      {/* 1. 매개변수 1개 - 괄호 생략 가능 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>1️⃣ 매개변수 1개 (괄호 생략 가능)</h3>
        <p>현재 숫자: <strong>{number}</strong></p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setNumber(prev => prev + 1)}
            style={{ padding: '5px 10px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            +1 (prev ={'='}{'>'}  prev + 1)
          </button>
          <button 
            onClick={() => setNumber(prev => prev * 2)}
            style={{ padding: '5px 10px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            ×2 (prev ={'='}{'>'}  prev * 2)
          </button>
          <button 
            onClick={() => setNumber(prev => prev - 3)}
            style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            -3 (prev ={'='}{'>'}  prev - 3)
          </button>
        </div>
      </div>

      {/* 2. 매개변수 0개 - 괄호 필수 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>2️⃣ 매개변수 0개 (괄호 필수)</h3>
        <button 
          onClick={() => setNumber(() => Math.floor(Math.random() * 100))}
          style={{ padding: '5px 10px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          랜덤 숫자 (() => Math.random())
        </button>
      </div>

      {/* 3. 여러 줄 함수 - 중괄호와 return 필요 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>3️⃣ 여러 줄 함수 (중괄호와 return 필요)</h3>
        <p>이름: <strong>{name || '없음'}</strong></p>
        <button 
          onClick={() => setName(prev => {
            const newName = prev === '' ? '홍길동' : '';
            console.log('이름 변경:', newName);
            return newName;
          })}
          style={{ padding: '5px 10px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          이름 토글 (여러 줄 함수)
        </button>
      </div>

      {/* 4. 배열과 화살표 함수 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>4️⃣ 배열과 화살표 함수</h3>
        <p>배열: [{items.join(', ')}]</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setItems(prev => [...prev, prev.length + 1])}
            style={{ padding: '5px 10px', backgroundColor: '#795548', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            추가 (prev => [...prev, newItem])
          </button>
          <button 
            onClick={() => setItems(prev => prev.slice(0, -1))}
            style={{ padding: '5px 10px', backgroundColor: '#607d8b', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            제거 (prev => prev.slice(0, -1))
          </button>
          <button 
            onClick={() => setItems(prev => prev.map(item => item * 2))}
            style={{ padding: '5px 10px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            모두 ×2 (prev => prev.map(item => item * 2))
          </button>
        </div>
      </div>

      {/* 5. 비교: 일반 함수 vs 화살표 함수 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#fff3e0', borderRadius: '5px' }}>
        <h3>5️⃣ 비교: 일반 함수 vs 화살표 함수</h3>
        <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
          <p><strong>일반 함수:</strong></p>
          <code style={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
            setNumber(function(prev) {'{'}
            <br />
            &nbsp;&nbsp;return prev + 1;
            <br />
            {'}'});
          </code>
          
          <p style={{ marginTop: '10px' }}><strong>화살표 함수:</strong></p>
          <code style={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
            setNumber(prev => prev + 1);
          </code>
        </div>
      </div>
    </div>
  );
};

export default ArrowFunctionExamples;