import React, { useState } from 'react';

const ConditionalRenderingDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAge, setUserAge] = useState(15);
  const [score, setScore] = useState(75);
  const [weather, setWeather] = useState('sunny');
  const [showDetails, setShowDetails] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎯 조건부 렌더링 - 쉽게 배우기</h1>
      
      {/* 1️⃣ 가장 기본: if문처럼 사용하기 */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>1️⃣ 기본 조건부 렌더링 (&&)</h3>
        <p>💡 <strong>간단 설명:</strong> 조건이 true면 보여주고, false면 안 보여줌</p>
        
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{ 
            backgroundColor: isLoggedIn ? '#f44336' : '#4caf50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>

        {/* 👇 이것이 조건부 렌더링! */}
        {isLoggedIn && (
          <div style={{ 
            backgroundColor: '#e8f5e9', 
            padding: '10px', 
            borderRadius: '5px',
            border: '1px solid #4caf50'
          }}>
            🎉 환영합니다! 로그인되었습니다!
          </div>
        )}

        {!isLoggedIn && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            padding: '10px', 
            borderRadius: '5px',
            border: '1px solid #f44336'
          }}>
            ❌ 로그인이 필요합니다.
          </div>
        )}

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>코드:</strong> {`{isLoggedIn && <div>환영합니다!</div>}`}
        </div>
      </div>

      {/* 2️⃣ 삼항연산자: A ? B : C */}
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>2️⃣ 삼항연산자 (? :)</h3>
        <p>💡 <strong>간단 설명:</strong> 조건 ? 참일때 : 거짓일때</p>
        
        <div style={{ marginBottom: '10px' }}>
          <label>나이: </label>
          <input 
            type="number" 
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
            style={{ 
              padding: '5px', 
              borderRadius: '3px', 
              border: '1px solid #ddd',
              marginLeft: '10px'
            }}
          />
        </div>

        {/* 👇 삼항연산자 사용! */}
        <div style={{ 
          backgroundColor: userAge >= 18 ? '#e8f5e9' : '#ffebee',
          padding: '10px', 
          borderRadius: '5px',
          border: `1px solid ${userAge >= 18 ? '#4caf50' : '#f44336'}`
        }}>
          {userAge >= 18 ? (
            <span>🎉 성인입니다! 모든 서비스 이용 가능</span>
          ) : (
            <span>🚫 미성년자입니다. 일부 서비스 제한</span>
          )}
        </div>

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>코드:</strong> {`{age >= 18 ? <성인> : <미성년자>}`}
        </div>
      </div>

      {/* 3️⃣ 여러 조건 처리 */}
      <div style={{ 
        backgroundColor: '#f3e5f5', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>3️⃣ 여러 조건 처리</h3>
        <p>💡 <strong>간단 설명:</strong> 점수에 따라 다른 메시지</p>
        
        <div style={{ marginBottom: '10px' }}>
          <label>점수: </label>
          <input 
            type="number" 
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            style={{ 
              padding: '5px', 
              borderRadius: '3px', 
              border: '1px solid #ddd',
              marginLeft: '10px'
            }}
          />
        </div>

        {/* 👇 여러 조건을 차례로 체크! */}
        <div style={{ 
          padding: '10px', 
          borderRadius: '5px',
          backgroundColor: 
            score >= 90 ? '#e8f5e9' :
            score >= 80 ? '#fff3cd' :
            score >= 70 ? '#ffeaa7' :
            '#ffebee',
          border: `1px solid ${
            score >= 90 ? '#4caf50' :
            score >= 80 ? '#ffc107' :
            score >= 70 ? '#ff9800' :
            '#f44336'
          }`
        }}>
          {score >= 90 && <span>🏆 우수! A등급</span>}
          {score >= 80 && score < 90 && <span>👍 양호! B등급</span>}
          {score >= 70 && score < 80 && <span>😊 보통! C등급</span>}
          {score < 70 && <span>😔 노력 필요! 다시 도전!</span>}
        </div>

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>코드:</strong> 여러 조건을 && 로 연결
        </div>
      </div>

      {/* 4️⃣ 함수로 조건 정리하기 */}
      <div style={{ 
        backgroundColor: '#e0f2f1', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>4️⃣ 함수로 깔끔하게 정리</h3>
        <p>💡 <strong>간단 설명:</strong> 복잡한 조건은 함수로 만들어요</p>
        
        <div style={{ marginBottom: '10px' }}>
          <label>날씨: </label>
          <select 
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            style={{ 
              padding: '5px', 
              borderRadius: '3px', 
              border: '1px solid #ddd',
              marginLeft: '10px'
            }}
          >
            <option value="sunny">☀️ 맑음</option>
            <option value="rainy">🌧️ 비</option>
            <option value="cloudy">☁️ 흐림</option>
            <option value="snowy">❄️ 눈</option>
          </select>
        </div>

        {/* 👇 함수로 조건 처리! */}
        {renderWeatherMessage(weather)}

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>코드:</strong> {`{renderWeatherMessage(weather)}`}
        </div>
      </div>

      {/* 5️⃣ 토글 버튼으로 상세 정보 */}
      <div style={{ 
        backgroundColor: '#fce4ec', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>5️⃣ 토글로 정보 보이기/숨기기</h3>
        <p>💡 <strong>간단 설명:</strong> 버튼 클릭으로 내용 보이기/숨기기</p>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          style={{ 
            backgroundColor: '#e91e63',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          {showDetails ? '숨기기 ⬆️' : '자세히 보기 ⬇️'}
        </button>

        {/* 👇 토글 조건부 렌더링! */}
        {showDetails && (
          <div style={{ 
            backgroundColor: 'white',
            padding: '15px', 
            borderRadius: '5px',
            border: '1px solid #e91e63',
            marginTop: '10px'
          }}>
            <h4>📋 상세 정보</h4>
            <ul>
              <li>🎯 조건부 렌더링은 React의 핵심 기능</li>
              <li>🔧 && 연산자: 간단한 조건부 표시</li>
              <li>❓ 삼항연산자: 둘 중 하나 선택</li>
              <li>🎪 여러 조건: 순서대로 체크</li>
              <li>📦 함수 활용: 복잡한 로직 정리</li>
            </ul>
          </div>
        )}
      </div>

      {/* 6️⃣ 입력값에 따른 실시간 조건 */}
      <div style={{ 
        backgroundColor: '#f1f8e9', 
        padding: '15px', 
        borderRadius: '8px'
      }}>
        <h3>6️⃣ 실시간 입력 조건</h3>
        <p>💡 <strong>간단 설명:</strong> 입력하는 동안 실시간으로 조건 체크</p>
        
        <div style={{ marginBottom: '10px' }}>
          <label>이름 입력: </label>
          <input 
            type="text" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={{ 
              padding: '8px', 
              borderRadius: '3px', 
              border: '1px solid #ddd',
              marginLeft: '10px',
              width: '200px'
            }}
          />
        </div>

        {/* 👇 입력값에 따른 조건부 렌더링! */}
        {userName.length === 0 && (
          <div style={{ color: '#666', fontSize: '14px' }}>
            💭 이름을 입력해보세요!
          </div>
        )}

        {userName.length > 0 && userName.length < 2 && (
          <div style={{ color: '#ff9800', fontSize: '14px' }}>
            ⚠️ 이름이 너무 짧아요!
          </div>
        )}

        {userName.length >= 2 && (
          <div style={{ 
            color: '#4caf50', 
            fontSize: '14px',
            backgroundColor: '#e8f5e9',
            padding: '8px',
            borderRadius: '5px',
            marginTop: '5px'
          }}>
            ✅ 안녕하세요, {userName}님! 멋진 이름이네요! 🎉
          </div>
        )}

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>코드:</strong> 입력값의 길이로 조건 체크
        </div>
      </div>

      {/* 요약 */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px',
        border: '2px solid #ddd'
      }}>
        <h3>📚 조건부 렌더링 요약</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <h4>🔧 방법들</h4>
            <ul style={{ fontSize: '14px' }}>
              <li><code>조건 && 컴포넌트</code> - 단순 표시</li>
              <li><code>조건 ? A : B</code> - 둘 중 선택</li>
              <li><code>함수 활용</code> - 복잡한 조건</li>
              <li><code>!조건</code> - 반대 조건</li>
            </ul>
          </div>
          <div>
            <h4>💡 사용 예시</h4>
            <ul style={{ fontSize: '14px' }}>
              <li>로그인/로그아웃 상태</li>
              <li>로딩/완료 표시</li>
              <li>권한별 메뉴</li>
              <li>입력 검증 메시지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 👇 함수로 조건 처리하는 예제
const renderWeatherMessage = (weather) => {
  const weatherStyles = {
    sunny: { backgroundColor: '#fff9c4', color: '#f57f17', border: '1px solid #fbc02d' },
    rainy: { backgroundColor: '#e3f2fd', color: '#1976d2', border: '1px solid #2196f3' },
    cloudy: { backgroundColor: '#f5f5f5', color: '#424242', border: '1px solid #9e9e9e' },
    snowy: { backgroundColor: '#e8eaf6', color: '#3f51b5', border: '1px solid #5c6bc0' }
  };

  const messages = {
    sunny: '☀️ 완벽한 날씨! 외출하기 좋아요!',
    rainy: '🌧️ 우산을 챙기세요!',
    cloudy: '☁️ 선선한 날씨네요!',
    snowy: '❄️ 따뜻하게 입고 나가세요!'
  };

  return (
    <div style={{ 
      ...weatherStyles[weather],
      padding: '10px', 
      borderRadius: '5px',
      marginTop: '10px'
    }}>
      {messages[weather]}
    </div>
  );
};

export default ConditionalRenderingDemo;