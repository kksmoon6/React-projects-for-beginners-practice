const HelloWorld = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f8ff',
      border: '2px solid #4a90e2',
      borderRadius: '10px',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#4a90e2' }}>🎉 안녕하세요! React 세계에 오신 것을 환영합니다!</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        이것은 제가 만든 첫 번째 React 컴포넌트입니다! 😊
      </p>
    </div>
  );
};

export default HelloWorld;