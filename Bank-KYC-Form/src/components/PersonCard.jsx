// Props를 받아서 사용자 정보를 표시하는 자식 컴포넌트
const PersonCard = (props) => {
  return (
    <div style={{
      padding: '20px',
      margin: '15px',
      border: '3px solid #ff6b6b',
      borderRadius: '10px',
      backgroundColor: '#fff5f5',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '40px', marginBottom: '10px' }}>
        👤
      </div>
      <h2 style={{ color: '#ff6b6b', margin: '10px 0' }}>
        {props.name}
      </h2>
      <p style={{ fontSize: '18px', margin: '8px 0' }}>
        🎂 나이: <strong>{props.age}세</strong>
      </p>
      <p style={{ fontSize: '18px', margin: '8px 0' }}>
        💼 직업: <strong>{props.job}</strong>
      </p>
      <p style={{ fontSize: '18px', margin: '8px 0' }}>
        🎨 취미: <strong>{props.hobby}</strong>
      </p>
    </div>
  );
};

export default PersonCard;