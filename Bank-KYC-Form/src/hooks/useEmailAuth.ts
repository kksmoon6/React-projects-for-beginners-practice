import { useState, useCallback } from 'react';

/**
 * 이메일 데이터 타입
 */
interface EmailData {
  email1: string;
}

/**
 * 이메일 인증 결과 타입
 */
interface EmailAuthResult {
  strResult: string;
  empYn: string;
  [key: string]: any;
}

/**
 * useEmailAuth 훅 Props
 */
interface UseEmailAuthProps {
  mbCrdNo?: string;
  onSuccess: (data: EmailAuthResult) => void;
  onError: (message: string) => void;
}

/**
 * 이메일 유효성 검사 정규식
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Mock 이메일 인증 API
 */
const mockRequestEmailCode = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 성공적인 응답 시뮬레이션
  return {
    success: true,
    data: {
      verificationCode: '123456',
      expiredAt: Date.now() + 300000, // 5분 후 만료
    }
  };
};

/**
 * 이메일 인증 관련 로직을 관리하는 커스텀 훅
 */
export const useEmailAuth = ({ mbCrdNo, onSuccess, onError }: UseEmailAuthProps) => {
  const [email, setEmail] = useState<EmailData>({ email1: '' });
  const [emailData, setEmailData] = useState('');
  const [openEmailPop, setOpenEmailPop] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  /**
   * 이메일 입력 변경 핸들러
   */
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setEmail(prev => ({ ...prev, [name]: value }));
    
    // 이메일이 변경되면 전송 상태 초기화
    if (emailSent) {
      setEmailSent(false);
    }
  }, [emailSent]);

  /**
   * 이메일 유효성 검사
   */
  const validateEmail = useCallback((emailValue: string): boolean => {
    if (!emailValue.trim()) {
      onError('이메일을 입력해주세요.');
      return false;
    }
    
    if (!EMAIL_REGEX.test(emailValue)) {
      onError('올바른 이메일 형식을 입력해주세요.');
      return false;
    }
    
    return true;
  }, [onError]);

  /**
   * 이메일 인증 코드 요청
   */
  const requestEmailAuth = useCallback(async (emailValue?: string) => {
    const targetEmail = emailValue || email.email1;
    
    if (!validateEmail(targetEmail)) {
      return false;
    }

    setIsEmailSending(true);

    try {
      const params = {
        hidEmail: targetEmail,
        mbCrdNo: mbCrdNo,
      };

      const response = await mockRequestEmailCode(params);
      
      if (response.success) {
        setEmailData(targetEmail);
        setEmailSent(true);
        handleEmailToggle(); // 팝업 열기
        return true;
      } else {
        onError('이메일 인증 요청에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error('이메일 인증 요청 오류:', error);
      onError('이메일 인증 요청 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsEmailSending(false);
    }
  }, [email.email1, mbCrdNo, validateEmail, onError]);

  /**
   * 이메일 인증 버튼 클릭 핸들러
   */
  const handleEmailButtonClick = useCallback(async () => {
    await requestEmailAuth();
  }, [requestEmailAuth]);

  /**
   * 이메일 팝업 토글
   */
  const handleEmailToggle = useCallback((result?: EmailAuthResult) => {
    setOpenEmailPop(prev => !prev);
    
    // 인증 성공 시 콜백 호출
    if (result && result.strResult === 'SUCC' && result.empYn === 'Y') {
      onSuccess(result);
    }
  }, [onSuccess]);

  /**
   * 이메일 초기화
   */
  const resetEmail = useCallback(() => {
    setEmail({ email1: '' });
    setEmailData('');
    setEmailSent(false);
    setOpenEmailPop(false);
  }, []);

  /**
   * 팝업 강제 닫기
   */
  const closeEmailPopup = useCallback(() => {
    setOpenEmailPop(false);
  }, []);

  /**
   * 이메일 재전송
   */
  const resendEmail = useCallback(async () => {
    return await requestEmailAuth(emailData || email.email1);
  }, [requestEmailAuth, emailData, email.email1]);

  /**
   * 폼 유효성 상태
   */
  const getValidationState = useCallback(() => {
    return {
      isEmailValid: EMAIL_REGEX.test(email.email1),
      isEmailEmpty: !email.email1.trim(),
      canSendEmail: EMAIL_REGEX.test(email.email1) && !isEmailSending,
    };
  }, [email.email1, isEmailSending]);

  return {
    // 상태
    email,
    emailData,
    openEmailPop,
    isEmailSending,
    emailSent,
    
    // 액션
    handleEmailChange,
    handleEmailButtonClick,
    handleEmailToggle,
    requestEmailAuth,
    resetEmail,
    closeEmailPopup,
    resendEmail,
    
    // 유틸리티
    validateEmail,
    getValidationState,
  };
};