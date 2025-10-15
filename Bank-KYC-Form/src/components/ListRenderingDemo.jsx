import React, { useState } from 'react';

const ListRenderingDemo = () => {
  // 기본 데이터
  const [fruits] = useState(['🍎 사과', '🍌 바나나', '🍊 오렌지', '🍇 포도']);
  const [todos, setTodos] = useState([
    { id: 1, text: '아침 먹기', done: false },
    { id: 2, text: 'React 공부하기', done: true },
    { id: 3, text: '운동하기', done: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  // 할 일 추가
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Date.now(); // 간단한 ID 생성
      setTodos([...todos, { id: newId, text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  // 할 일 토글
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📋 리스트 렌더링 배우기</h1>
      
      {/* 1. 기본 배열 렌더링 */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2>1️⃣ 기본 배열 렌더링</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {fruits.map((fruit, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white',
              padding: '10px 15px',
              borderRadius: '20px',
              border: '2px solid #2196f3'
            }}>
              {fruit}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          � <code>fruits.map((fruit, index) =&gt; &lt;div key={index}&gt;{fruit}&lt;/div&gt;)</code>
        </p>
      </div>

      {/* 2. 할 일 리스트 */}
      <div style={{ 
        backgroundColor: '#e8f5e9', 
        padding: '20px', 
        borderRadius: '10px'
      }}>
        <h2>2️⃣ 인터랙티브 할 일 리스트</h2>
        
        {/* 할 일 추가 */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새 할 일 입력..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            style={{ 
              flex: 1,
              padding: '10px',
              borderRadius: '5px',
              border: '2px solid #4caf50'
            }}
          />
          <button 
            onClick={addTodo}
            style={{ 
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            추가
          </button>
        </div>

        {/* 할 일 목록 */}
        <div>
          {todos.map(todo => (
            <div key={todo.id} style={{ 
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '2px solid #4caf50',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <button 
                onClick={() => toggleTodo(todo.id)}
                style={{ 
                  backgroundColor: todo.done ? '#4caf50' : 'white',
                  color: todo.done ? 'white' : '#4caf50',
                  border: '2px solid #4caf50',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              >
                {todo.done ? '✓' : '○'}
              </button>
              
              <span style={{ 
                flex: 1,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#666' : '#333'
              }}>
                {todo.text}
              </span>
              
              <span style={{
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '10px',
                backgroundColor: todo.done ? '#e8f5e9' : '#fff3e0',
                color: todo.done ? '#4caf50' : '#ff9800'
              }}>
                {todo.done ? '완료' : '진행중'}
              </span>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#f1f8e9',
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <strong>� 핵심:</strong> map() + key prop + useState + 이벤트 처리
        </div>
      </div>

      {/* 학습 요약 */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>📚 핵심 정리</h2>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>map():</strong> 배열을 JSX로 변환하는 핵심 메서드</li>
          <li><strong>key prop:</strong> 각 항목에 고유한 식별자 필수</li>
          <li><strong>useState:</strong> 배열 상태 관리</li>
          <li><strong>불변성:</strong> 배열 수정시 새 배열 생성 ([...array])</li>
        </ul>
      </div>
    </div>
  );
};

export default ListRenderingDemo;