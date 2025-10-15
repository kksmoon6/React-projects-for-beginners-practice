import React, { useState } from 'react';

// 🎯 자식 컴포넌트 1: 카운터 표시
const CounterDisplay = ({ count, title, color = '#007bff' }) => {
  return (
    <div style={{
      backgroundColor: color,
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '10px 0'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>
      <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
        {count}
      </div>
    </div>
  );
};

// 🎯 자식 컴포넌트 2: 카운터 조작 버튼들
const CounterButtons = ({ onIncrement, onDecrement, onReset, disabled = false }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      margin: '20px 0'
    }}>
      <button
        onClick={onIncrement}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? '#ccc' : '#28a745',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        ➕ 증가
      </button>
      
      <button
        onClick={onDecrement}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? '#ccc' : '#dc3545',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        ➖ 감소
      </button>
      
      <button
        onClick={onReset}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? '#ccc' : '#6c757d',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        🔄 리셋
      </button>
    </div>
  );
};

// 🎯 자식 컴포넌트 3: 상태 정보 표시
const StatusPanel = ({ count, history, onClearHistory }) => {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #dee2e6',
      margin: '20px 0'
    }}>
      <h3>📊 상태 정보</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>현재 값:</strong> {count}</p>
        <p><strong>절댓값:</strong> {Math.abs(count)}</p>
        <p><strong>상태:</strong> 
          <span style={{ 
            color: count > 0 ? 'green' : count < 0 ? 'red' : 'orange',
            fontWeight: 'bold',
            marginLeft: '5px'
          }}>
            {count > 0 ? '양수' : count < 0 ? '음수' : '영'}
          </span>
        </p>
        <p><strong>짝수/홀수:</strong> 
          <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
            {count % 2 === 0 ? '짝수' : '홀수'}
          </span>
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>📈 히스토리 (최근 5개)</h4>
          <button
            onClick={onClearHistory}
            style={{
              backgroundColor: '#ffc107',
              color: 'black',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            히스토리 지우기
          </button>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '4px',
          minHeight: '60px',
          fontSize: '14px'
        }}>
          {history.length > 0 ? (
            history.slice(-5).map((item, index) => (
              <div key={index} style={{ margin: '2px 0' }}>
                {item.action}: {item.from} → {item.to} ({item.time})
              </div>
            ))
          ) : (
            <div style={{ color: '#6c757d' }}>아직 기록이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// 🎯 자식 컴포넌트 4: 입력으로 값 설정
const CounterInput = ({ onSetValue, currentValue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      onSetValue(num);
      setInputValue('');
    } else {
      alert('올바른 숫자를 입력해주세요!');
    }
  };

  return (
    <div style={{
      backgroundColor: '#e3f2fd',
      padding: '20px',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3>🎮 직접 값 설정</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="숫자를 입력하세요"
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
            flex: 1
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          설정
        </button>
      </form>
      <p style={{ fontSize: '12px', color: '#6c757d', margin: '10px 0 0 0' }}>
        현재 값: {currentValue} → 원하는 값으로 바로 변경할 수 있습니다.
      </p>
    </div>
  );
};

// 🏠 부모 컴포넌트: 모든 상태를 관리하고 자식들에게 전달
const ComponentCommunicationDemo = () => {
  // 📝 부모가 관리하는 상태들
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  // 📝 현재 시간을 문자열로 반환하는 헬퍼 함수
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('ko-KR');
  };

  // 📝 히스토리에 기록을 추가하는 헬퍼 함수
  const addToHistory = (action, from, to) => {
    const newRecord = {
      action,
      from,
      to,
      time: getCurrentTime()
    };
    setHistory(prev => [...prev, newRecord]);
  };

  // 🎯 자식 컴포넌트들에게 전달할 콜백 함수들
  const handleIncrement = () => {
    if (!isLocked) {
      const newValue = count + 1;
      addToHistory('증가', count, newValue);
      setCount(newValue);
    }
  };

  const handleDecrement = () => {
    if (!isLocked) {
      const newValue = count - 1;
      addToHistory('감소', count, newValue);
      setCount(newValue);
    }
  };

  const handleReset = () => {
    if (!isLocked) {
      addToHistory('리셋', count, 0);
      setCount(0);
    }
  };

  const handleSetValue = (newValue) => {
    if (!isLocked) {
      addToHistory('직접설정', count, newValue);
      setCount(newValue);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔄 컴포넌트 간 통신 마스터하기</h1>
      
      {/* 잠금 기능 */}
      <div style={{
        backgroundColor: isLocked ? '#f8d7da' : '#d4edda',
        padding: '15px',
        borderRadius: '8px',
        margin: '20px 0',
        border: `2px solid ${isLocked ? '#f5c6cb' : '#c3e6cb'}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            {isLocked ? '🔒 카운터가 잠겨있습니다' : '🔓 카운터 조작 가능'}
          </span>
          <button
            onClick={toggleLock}
            style={{
              backgroundColor: isLocked ? '#dc3545' : '#28a745',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isLocked ? '🔓 잠금 해제' : '🔒 잠그기'}
          </button>
        </div>
      </div>

      {/* 메인 카운터 표시 */}
      <CounterDisplay 
        count={count} 
        title="🎯 메인 카운터" 
        color={isLocked ? '#6c757d' : '#007bff'}
      />

      {/* 카운터 조작 버튼들 */}
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
        disabled={isLocked}
      />

      {/* 직접 값 설정 */}
      <CounterInput
        onSetValue={handleSetValue}
        currentValue={count}
      />

      {/* 상태 정보 패널 */}
      <StatusPanel
        count={count}
        history={history}
        onClearHistory={handleClearHistory}
      />

      {/* 여러 개의 미니 카운터들 */}
      <div style={{ margin: '30px 0' }}>
        <h3>🎨 다양한 스타일의 카운터들</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <CounterDisplay count={count} title="🔥 현재 값" color="#ff6b6b" />
          <CounterDisplay count={count * 2} title="✖️ 2배 값" color="#4ecdc4" />
          <CounterDisplay count={count * count} title="🔢 제곱 값" color="#45b7d1" />
          <CounterDisplay count={Math.abs(count)} title="📊 절댓값" color="#96ceb4" />
        </div>
      </div>

      {/* 학습 정보 */}
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ffeaa7',
        marginTop: '30px'
      }}>
        <h3>📚 학습 포인트</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>🔽 부모 → 자식 (Props)</h4>
            <ul style={{ fontSize: '14px' }}>
              <li><code>count={`{count}`}</code> - 데이터 전달</li>
              <li><code>title={`{title}`}</code> - 문자열 전달</li>
              <li><code>color={`{color}`}</code> - 스타일 설정</li>
              <li><code>disabled={`{isLocked}`}</code> - 상태 전달</li>
            </ul>
          </div>
          
          <div>
            <h4>🔼 자식 → 부모 (Callback)</h4>
            <ul style={{ fontSize: '14px' }}>
              <li><code>onIncrement={`{handleIncrement}`}</code></li>
              <li><code>onSetValue={`{handleSetValue}`}</code></li>
              <li><code>onClearHistory={`{handleClearHistory}`}</code></li>
              <li>이벤트 발생시 부모 함수 호출</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <h4>💡 핵심 개념</h4>
          <ol style={{ fontSize: '14px' }}>
            <li><strong>단일 진실 소스</strong>: 부모가 모든 상태를 관리</li>
            <li><strong>Props Down</strong>: 부모에서 자식으로 데이터 흐름</li>
            <li><strong>Events Up</strong>: 자식에서 부모로 이벤트 전달</li>
            <li><strong>컴포넌트 재사용</strong>: 같은 컴포넌트를 다른 용도로 활용</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ComponentCommunicationDemo;