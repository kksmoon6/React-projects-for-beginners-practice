import React, { useState } from 'react';

// 함수 Props 작동방식을 단계별로 보여주는 예제
const FunctionPropsDemo = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClicked, setLastClicked] = useState('');
  const [messages, setMessages] = useState([]);

  // 🔥 STEP 1: 부모 컴포넌트에서 함수들을 정의
  
  // 단순한 함수
  const handleSimpleClick = () => {
    console.log('🎯 STEP 4: 부모의 handleSimpleClick 함수가 실행됨!');
    setClickCount(count => count + 1);
  };

  // 매개변수를 받는 함수
  const handleClickWithParam = (buttonName) => {
    console.log(`🎯 STEP 4: handleClickWithParam 실행! 매개변수: ${buttonName}`);
    setLastClicked(buttonName);
    setMessages(prev => [...prev, `${buttonName} 버튼 클릭됨 (${new Date().toLocaleTimeString()})`]);
  };

  // 복잡한 함수 (여러 작업 수행)
  const handleComplexClick = (data) => {
    console.log('🎯 STEP 4: 복잡한 함수 실행!', data);
    setClickCount(count => count + data.increment);
    setLastClicked(data.name);
    setMessages(prev => [...prev, `${data.name}: ${data.message}`]);
  };

  // 메시지 초기화 함수
  const clearMessages = () => {
    setMessages([]);
    setClickCount(0);
    setLastClicked('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔍 함수 Props 작동방식 분석</h1>

      {/* 현재 상태 표시 */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>📊 현재 상태</h3>
        <p><strong>총 클릭 횟수:</strong> {clickCount}</p>
        <p><strong>마지막 클릭:</strong> {lastClicked || '없음'}</p>
        <p><strong>메시지 개수:</strong> {messages.length}</p>
      </div>

      {/* STEP 2 & 3: 함수를 Props로 전달 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🚀 STEP 2-3: 함수를 Props로 전달</h3>
        
        {/* 1. 단순한 함수 전달 */}
        <SimpleButton 
          onClick={handleSimpleClick}  // 👈 함수 자체를 전달
          label="단순 클릭"
        />

        {/* 2. 매개변수가 있는 함수 전달 */}
        <ParameterButton 
          onClick={handleClickWithParam}  // 👈 함수를 전달
          buttonName="파라미터 버튼"
          label="매개변수 전달"
        />

        {/* 3. 복잡한 데이터와 함수 전달 */}
        <ComplexButton 
          onClick={handleComplexClick}  // 👈 함수를 전달
          data={{
            name: '복잡한 버튼',
            message: '복잡한 작업 완료!',
            increment: 5
          }}
          label="복잡한 함수"
        />

        {/* 4. 초기화 버튼 */}
        <ClearButton onClick={clearMessages} />
      </div>

      {/* 메시지 히스토리 */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        <h3>📝 클릭 히스토리</h3>
        {messages.length === 0 ? (
          <p>아직 클릭한 버튼이 없습니다.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ 
              padding: '5px', 
              borderBottom: '1px solid #ddd',
              fontSize: '14px'
            }}>
              {index + 1}. {msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 🔥 STEP 2: 자식 컴포넌트들이 함수를 Props로 받음

// 1. 단순한 함수를 받는 컴포넌트
const SimpleButton = ({ onClick, label }) => {
  console.log('🎯 STEP 2: SimpleButton이 onClick 함수를 받음');
  
  const handleClick = () => {
    console.log('🎯 STEP 3: SimpleButton의 handleClick 실행');
    onClick(); // 👈 부모의 함수를 호출
  };

  return (
    <button 
      onClick={handleClick}
      style={{ 
        margin: '5px', 
        padding: '10px 15px',
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
};

// 2. 매개변수를 전달하는 컴포넌트
const ParameterButton = ({ onClick, buttonName, label }) => {
  console.log('🎯 STEP 2: ParameterButton이 onClick 함수를 받음');
  
  const handleClick = () => {
    console.log('🎯 STEP 3: ParameterButton의 handleClick 실행');
    onClick(buttonName); // 👈 매개변수와 함께 부모 함수 호출
  };

  return (
    <button 
      onClick={handleClick}
      style={{ 
        margin: '5px', 
        padding: '10px 15px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
};

// 3. 복잡한 데이터를 전달하는 컴포넌트
const ComplexButton = ({ onClick, data, label }) => {
  console.log('🎯 STEP 2: ComplexButton이 onClick 함수와 data를 받음');
  
  const handleClick = () => {
    console.log('🎯 STEP 3: ComplexButton의 handleClick 실행');
    onClick(data); // 👈 객체 데이터와 함께 부모 함수 호출
  };

  return (
    <button 
      onClick={handleClick}
      style={{ 
        margin: '5px', 
        padding: '10px 15px',
        backgroundColor: '#ff9800',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
};

// 4. 단순한 함수 호출
const ClearButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}  // 👈 직접 부모 함수 호출
      style={{ 
        margin: '5px', 
        padding: '10px 15px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      초기화
    </button>
  );
};

export default FunctionPropsDemo;