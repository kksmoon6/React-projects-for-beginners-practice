import { useState } from 'react';

const HookExamples = () => {
  // 1. 숫자 상태
  const [count, setCount] = useState(0);
  
  // 2. 문자열 상태
  const [name, setName] = useState('');
  
  // 3. 불린 상태
  const [isVisible, setIsVisible] = useState(true);
  
  // 4. 배열 상태
  const [items, setItems] = useState(['사과', '바나나']);
  
  // 5. 객체 상태
  const [user, setUser] = useState({
    name: '홍길동',
    age: 25
  });

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px solid #007bff',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{ color: '#007bff' }}>🪝 Hook 예제들</h2>

      {/* 1. 숫자 상태 예제 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>1️⃣ 숫자 상태 (useState)</h3>
        <p>현재 숫자: <strong>{count}</strong></p>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            +1
          </button>
          <button 
            onClick={() => setCount(count - 1)}
            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            -1
          </button>
          <button 
            onClick={() => setCount(count + 5)}
            style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            +5
          </button>
          <button 
            onClick={() => setCount(count - 5)}
            style={{ padding: '5px 10px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            -5
          </button>
          <button 
            onClick={() => setCount(0)}
            style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            리셋
          </button>
        </div>
      </div>

      {/* 2. 문자열 상태 예제 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>2️⃣ 문자열 상태 (useState)</h3>
        <p>안녕하세요, <strong>{name || '이름을 입력해주세요'}</strong>!</p>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={{ padding: '5px', border: '1px solid #ddd', borderRadius: '3px', flex: 1, minWidth: '150px' }}
          />
          <button 
            onClick={() => setName('')}
            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            지우기
          </button>
          <button 
            onClick={() => setName('홍길동')}
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            샘플 이름
          </button>
        </div>
      </div>

      {/* 3. 불린 상태 예제 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>3️⃣ 불린 상태 (useState)</h3>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '3px' }}
        >
          {isVisible ? '숨기기' : '보이기'}
        </button>
        {isVisible && (
          <p style={{ marginTop: '10px', color: '#28a745' }}>
            🎉 짜잔! 나는 보이거나 숨겨질 수 있어요!
          </p>
        )}
      </div>

      {/* 4. 배열 상태 예제 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>4️⃣ 배열 상태 (useState)</h3>
        <p>과일 목록 ({items.length}개):</p>
        <ul style={{ margin: '10px 0' }}>
          {items.map((item, index) => (
            <li key={index} style={{ margin: '5px 0' }}>
              {item}
              <button 
                onClick={() => setItems(items.filter((_, i) => i !== index))}
                style={{ 
                  marginLeft: '10px', 
                  padding: '2px 6px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '2px',
                  fontSize: '12px'
                }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setItems([...items, '오렌지'])}
            style={{ padding: '5px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            오렌지 추가
          </button>
          <button 
            onClick={() => setItems([...items, '포도'])}
            style={{ padding: '5px 10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            포도 추가
          </button>
          <button 
            onClick={() => setItems([])}
            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            모두 삭제
          </button>
          <button 
            onClick={() => setItems(['사과', '바나나'])}
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            기본값 복원
          </button>
        </div>
      </div>

      {/* 5. 객체 상태 예제 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>5️⃣ 객체 상태 (useState)</h3>
        <p>사용자 정보: {user.name} ({user.age}세)</p>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setUser({...user, age: user.age + 1})}
            style={{ padding: '5px 10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            나이 +1
          </button>
          <button 
            onClick={() => setUser({...user, age: user.age - 1})}
            style={{ padding: '5px 10px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            나이 -1
          </button>
          <button 
            onClick={() => setUser({...user, name: user.name === '홍길동' ? '김철수' : '홍길동'})}
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            이름 변경
          </button>
          <button 
            onClick={() => setUser({name: '홍길동', age: 25})}
            style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default HookExamples;