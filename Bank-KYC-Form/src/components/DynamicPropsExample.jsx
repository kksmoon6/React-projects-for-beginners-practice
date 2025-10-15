import { useState } from 'react';
import PersonCard from './PersonCard';

const DynamicPropsExample = () => {
  // 선택된 사용자를 관리하는 상태
  const [selectedPerson, setSelectedPerson] = useState('철수');

  // 사용자 데이터베이스
  const people = {
    '철수': {
      name: '김철수',
      age: 25,
      job: '웹 개발자',
      hobby: '게임하기'
    },
    '영희': {
      name: '이영희',
      age: 27,
      job: '디자이너',
      hobby: '그림 그리기'
    },
    '민수': {
      name: '박민수',
      age: 30,
      job: '마케터',
      hobby: '독서'
    },
    '지은': {
      name: '최지은',
      age: 24,
      job: '학생',
      hobby: '여행'
    }
  };

  return (
    <div style={{
      padding: '25px',
      margin: '20px',
      border: '3px solid #4ecdc4',
      borderRadius: '15px',
      backgroundColor: '#f0fdfc'
    }}>
      <h1 style={{ color: '#4ecdc4', textAlign: 'center', marginBottom: '30px' }}>
        🎭 동적 Props 예제
      </h1>
      
      {/* Props 개념 설명 */}
      <div style={{ 
        backgroundColor: '#e0f7fa', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '25px',
        border: '2px solid #4ecdc4'
      }}>
        <h3 style={{ color: '#00695c', marginTop: 0 }}>🎯 Props란?</h3>
        <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <li><strong>부모 컴포넌트</strong>가 <strong>자식 컴포넌트</strong>에게 데이터를 전달하는 방법</li>
          <li>마치 <strong>함수의 매개변수</strong>처럼 작동함</li>
          <li><strong>읽기 전용</strong> - 자식에서는 props를 변경할 수 없음</li>
          <li><strong>재사용 가능</strong> - 같은 컴포넌트, 다른 데이터</li>
        </ul>
      </div>

      {/* 사용자 선택 버튼들 */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#00695c' }}>👥 사람 선택 (Props 데이터 바뀜):</h3>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginTop: '15px'
        }}>
          {Object.keys(people).map((personKey) => (
            <button
              key={personKey}
              onClick={() => setSelectedPerson(personKey)}
              style={{
                padding: '12px 20px',
                fontSize: '16px',
                backgroundColor: selectedPerson === personKey ? '#4ecdc4' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transform: selectedPerson === personKey ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* {personKey} */}
                {people[personKey].name}
            </button>
          ))}
        </div>
      </div>

      {/* 현재 전달되는 Props 보여주기 */}
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '2px solid #ff9800'
      }}>
        <h4 style={{ color: '#e65100', marginTop: 0 }}>📦 현재 전달되는 Props:</h4>
        <div style={{ fontFamily: 'monospace', fontSize: '14px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {`<PersonCard`}<br/>
          {`  name="${people[selectedPerson].name}"`}<br/>
          {`  age={${people[selectedPerson].age}}`}<br/>
          {`  job="${people[selectedPerson].job}"`}<br/>
          {`  hobby="${people[selectedPerson].hobby}"`}<br/>
          {`/>`}
        </div>
      </div>

      {/* 실제 PersonCard 컴포넌트 (Props 받아서 화면에 표시) */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#00695c' }}>🎨 Props를 받은 자식 컴포넌트 결과:</h3>
        <PersonCard 
          name={people[selectedPerson].name}
          age={people[selectedPerson].age}
          job={people[selectedPerson].job}
          hobby={people[selectedPerson].hobby}
        />
      </div>

      {/* 설명 */}
      <div style={{ 
        backgroundColor: '#f3e5f5', 
        padding: '20px', 
        borderRadius: '10px', 
        marginTop: '25px',
        border: '2px solid #9c27b0'
      }}>
        <h4 style={{ color: '#6a1b9a', marginTop: 0 }}>✨ 여기서 일어나는 일:</h4>
        <ol style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <li><strong>버튼 클릭</strong> → <code>setSelectedPerson()</code> 실행</li>
          <li><strong>상태 변경</strong> → 컴포넌트 리렌더링</li>
          <li><strong>새로운 Props</strong> → PersonCard에 다른 데이터 전달</li>
          <li><strong>화면 업데이트</strong> → 새로운 사용자 정보 표시</li>
        </ol>
      </div>
    </div>
  );
};

export default DynamicPropsExample;