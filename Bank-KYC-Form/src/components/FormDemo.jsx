import React, { useState } from 'react';

const FormDemo = () => {
  // 📝 폼 데이터를 위한 상태들
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    hobby: [],
    message: '',
    agree: false
  });

  // 🚨 에러 메시지를 위한 상태
  const [errors, setErrors] = useState({});
  
  // ✅ 제출 성공 메시지
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 📝 입력값 변경 처리 함수
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'hobby') {
        // 취미는 여러 개 선택 가능
        setFormData(prev => ({
          ...prev,
          hobby: checked 
            ? [...prev.hobby, value]  // 체크되면 추가
            : prev.hobby.filter(h => h !== value)  // 체크 해제되면 제거
        }));
      } else {
        // 일반 체크박스 (동의 등)
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      // 일반 입력 필드
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // 입력할 때 해당 필드의 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 🔍 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};

    // 이름 검사
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요!';
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 2글자 이상이어야 합니다!';
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요!';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다!';
    }

    // 나이 검사
    if (!formData.age) {
      newErrors.age = '나이를 입력해주세요!';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = '나이는 1~120 사이여야 합니다!';
    }

    // 성별 검사
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요!';
    }

    // 취미 검사
    if (formData.hobby.length === 0) {
      newErrors.hobby = '취미를 하나 이상 선택해주세요!';
    }

    // 메시지 검사
    if (!formData.message.trim()) {
      newErrors.message = '메시지를 입력해주세요!';
    } else if (formData.message.length < 10) {
      newErrors.message = '메시지는 10글자 이상이어야 합니다!';
    }

    // 동의 검사
    if (!formData.agree) {
      newErrors.agree = '개인정보 처리에 동의해주세요!';
    }

    return newErrors;
  };

  // 📤 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      // 에러가 있으면 에러 표시
      setErrors(newErrors);
      setSubmitSuccess(false);
    } else {
      // 에러가 없으면 성공!
      setErrors({});
      setSubmitSuccess(true);
      console.log('폼 데이터:', formData);
      
      // 3초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  // 🔄 폼 리셋 함수
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      hobby: [],
      message: '',
      agree: false
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📝 Form 처리 완전 정복!</h1>
      
      {/* 성공 메시지 */}
      {submitSuccess && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          🎉 폼이 성공적으로 제출되었습니다!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '12px',
        border: '2px solid #e9ecef'
      }}>
        
        {/* 이름 입력 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#495057'
          }}>
            이름 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: errors.name ? '2px solid #dc3545' : '2px solid #ced4da',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.name && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.name}
            </div>
          )}
        </div>

        {/* 이메일 입력 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#495057'
          }}>
            이메일 *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: errors.email ? '2px solid #dc3545' : '2px solid #ced4da',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.email}
            </div>
          )}
        </div>

        {/* 나이 입력 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#495057'
          }}>
            나이 *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="나이를 입력하세요"
            min="1"
            max="120"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: errors.age ? '2px solid #dc3545' : '2px solid #ced4da',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.age && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.age}
            </div>
          )}
        </div>

        {/* 성별 선택 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#495057'
          }}>
            성별 *
          </label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              남성
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              여성
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              기타
            </label>
          </div>
          {errors.gender && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.gender}
            </div>
          )}
        </div>

        {/* 취미 선택 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#495057'
          }}>
            취미 * (복수 선택 가능)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {['독서', '영화감상', '운동', '요리', '게임', '여행'].map(hobby => (
              <label key={hobby} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="hobby"
                  value={hobby}
                  checked={formData.hobby.includes(hobby)}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                {hobby}
              </label>
            ))}
          </div>
          {errors.hobby && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.hobby}
            </div>
          )}
        </div>

        {/* 메시지 입력 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            color: '#495057'
          }}>
            메시지 *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="자유롭게 메시지를 입력하세요 (10글자 이상)"
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: errors.message ? '2px solid #dc3545' : '2px solid #ced4da',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
          <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
            {formData.message.length}/10 글자 이상
          </div>
          {errors.message && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.message}
            </div>
          )}
        </div>

        {/* 동의 체크박스 */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            개인정보 처리에 동의합니다 *
          </label>
          {errors.agree && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              ⚠️ {errors.agree}
            </div>
          )}
        </div>

        {/* 버튼들 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📤 제출하기
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 초기화
          </button>
        </div>
      </form>

      {/* 현재 폼 데이터 표시 (개발용) */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h3>📊 현재 폼 데이터 (실시간)</h3>
        <pre style={{ 
          backgroundColor: '#ffffff',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormDemo;