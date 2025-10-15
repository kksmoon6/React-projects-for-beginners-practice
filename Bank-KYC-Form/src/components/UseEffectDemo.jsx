import React, { useState, useEffect } from 'react';

const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // 1️⃣ 기본 useEffect - 컴포넌트가 렌더링될 때마다 실행
  useEffect(() => {
    console.log('🔄 렌더링될 때마다 실행됨!');
    document.title = `카운트: ${count}`;
  });

  // 2️⃣ 빈 의존성 배열 - 컴포넌트 마운트시에만 실행 (한 번만)
  useEffect(() => {
    console.log('🚀 컴포넌트가 처음 마운트됨!');
    setMessage('컴포넌트가 로드되었습니다!');
    
    // API 호출 시뮬레이션
    const fetchUsers = async () => {
      setLoading(true);
      console.log('📡 API 호출 시뮬레이션...');
      
      // 가짜 API 응답 (2초 후)
      setTimeout(() => {
        const fakeUsers = [
          { id: 1, name: '김철수', status: 'online' },
          { id: 2, name: '이영희', status: 'offline' },
          { id: 3, name: '박민수', status: 'online' }
        ];
        setUsers(fakeUsers);
        setLoading(false);
        console.log('✅ API 응답 완료!');
      }, 2000);
    };
    
    fetchUsers();
  }, []); // 👈 빈 배열 = 한 번만 실행

  // 3️⃣ 특정 값 의존성 - count가 변경될 때만 실행
  useEffect(() => {
    console.log(`📊 count가 ${count}로 변경됨!`);
    
    if (count > 0 && count % 5 === 0) {
      setMessage(`🎉 축하합니다! ${count}에 도달했습니다!`);
    }
  }, [count]); // 👈 count가 변경될 때만 실행

  // 4️⃣ 타이머 useEffect (클린업 함수 포함)
  useEffect(() => {
    console.log('⏰ 타이머 시작!');
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    // 클린업 함수 - 컴포넌트 언마운트시 정리
    return () => {
      console.log('🧹 타이머 정리됨!');
      clearInterval(interval);
    };
  }, []); // 한 번만 설정

  // 5️⃣ 복잡한 useEffect - 여러 의존성
  useEffect(() => {
    if (count > 0 && users.length > 0) {
      console.log(`📈 count: ${count}, users: ${users.length}`);
    }
  }, [count, users]); // 👈 count 또는 users가 변경될 때 실행

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const resetCount = () => {
    setCount(0);
    setMessage('카운트가 리셋되었습니다!');
  };

  const addRandomUser = () => {
    const names = ['홍길동', '김영수', '이수진', '박지민', '최민호'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newUser = {
      id: Date.now(),
      name: randomName,
      status: Math.random() > 0.5 ? 'online' : 'offline'
    };
    
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>⚡ useEffect Hook 완전 정복</h1>
      
      {/* 실시간 정보 표시 */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>📊 실시간 상태</h3>
        <p><strong>카운트:</strong> {count}</p>
        <p><strong>타이머:</strong> {timer}초</p>
        <p><strong>사용자 수:</strong> {users.length}</p>
        <p><strong>페이지 제목:</strong> {document.title}</p>
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '10px', 
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #ffeaa7'
        }}>
          💬 {message}
        </div>
      )}

      {/* 카운터 조작 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🎮 카운터 조작</h3>
        <button 
          onClick={incrementCount}
          style={{ 
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            margin: '5px',
            cursor: 'pointer'
          }}
        >
          카운트 증가 (+1)
        </button>
        <button 
          onClick={resetCount}
          style={{ 
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            margin: '5px',
            cursor: 'pointer'
          }}
        >
          리셋
        </button>
      </div>

      {/* 사용자 목록 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>👥 사용자 목록</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ 
              display: 'inline-block',
              width: '20px',
              height: '20px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p>사용자 정보를 불러오는 중...</p>
          </div>
        ) : (
          <div>
            {users.map(user => (
              <div key={user.id} style={{ 
                backgroundColor: '#f5f5f5',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{user.name}</span>
                <span style={{ 
                  color: user.status === 'online' ? 'green' : 'red',
                  fontWeight: 'bold'
                }}>
                  ● {user.status}
                </span>
              </div>
            ))}
            <button 
              onClick={addRandomUser}
              style={{ 
                backgroundColor: '#2196f3',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '5px',
                margin: '10px 0',
                cursor: 'pointer'
              }}
            >
              랜덤 사용자 추가
            </button>
          </div>
        )}
      </div>

      {/* useEffect 패턴 설명 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>📚 useEffect 패턴들</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <h4>🔄 매번 실행</h4>
            <code style={{ 
              backgroundColor: '#f1f3f4', 
              padding: '5px', 
              borderRadius: '3px',
              fontSize: '12px'
            }}>
              useEffect(() =&gt; {`{}`})
            </code>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>
              렌더링될 때마다 실행
            </p>
          </div>
          
          <div>
            <h4>🚀 한 번만 실행</h4>
            <code style={{ 
              backgroundColor: '#f1f3f4', 
              padding: '5px', 
              borderRadius: '3px',
              fontSize: '12px'
            }}>
              useEffect(() =&gt; {`{}`}, [])
            </code>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>
              마운트시에만 실행
            </p>
          </div>
          
          <div>
            <h4>📊 조건부 실행</h4>
            <code style={{ 
              backgroundColor: '#f1f3f4', 
              padding: '5px', 
              borderRadius: '3px',
              fontSize: '12px'
            }}>
              useEffect(() =&gt; {`{}`}, [count])
            </code>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>
              count 변경시에만 실행
            </p>
          </div>
          
          <div>
            <h4>🧹 클린업</h4>
            <code style={{ 
              backgroundColor: '#f1f3f4', 
              padding: '5px', 
              borderRadius: '3px',
              fontSize: '12px'
            }}>
              useEffect(() =&gt; {`{return () => {}}`})
            </code>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>
              정리 작업 포함
            </p>
          </div>
        </div>
      </div>

      {/* 스타일 추가 */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UseEffectDemo;