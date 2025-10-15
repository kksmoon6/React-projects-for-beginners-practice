import { useState, useCallback } from 'react';

/**
 * 인증 결과 타입
 */
interface AuthResult {
  encCi?: string;
  phoneNo?: string;
  childName?: string;
  phoneAuth: boolean;
  child?: boolean;
}

/**
 * 회원 정보 타입
 */
interface MemberInfo {
  childName1: string;
  childName2: string;
}

/**
 * useAuth 훅 Props
 */
interface UseAuthProps {
  type?: string;
  onSuccess: (data: AuthResult) => void;
  onError: (message: string) => void;
}

/**
 * Mock 인증 서비스 - 실제로는 외부 서비스를 import
 */
const mockIpinAuth = async (): Promise<any> => {
  // 아이핀 인증 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    encCi: 'mock_ipin_ci_' + Date.now(),
    authMethod: 'ipin'
  };
};

const mockPhoneAuth = async (): Promise<any> => {
  // 휴대전화 인증 시뮬레이션  
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    encCi: 'mock_phone_ci_' + Date.now(),
    phoneNo: '010-1234-5678',
    authMethod: 'phone'
  };
};

/**
 * 인증 관련 로직을 관리하는 커스텀 훅
 */
export const useAuth = ({ type, onSuccess, onError }: UseAuthProps) => {
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    childName1: '',
    childName2: '',
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  /**
   * 회원 정보 변경 핸들러
   */
  const handleMemberInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type: inputType, checked } = e.target;
    
    setMemberInfo(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  }, []);

  /**
   * 인증 실행 함수
   */
  const executeAuth = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>, 
    authType: string
  ) => {
    const target = e.target as HTMLButtonElement;
    const fieldName = target.name;

    // 자녀 인증인 경우 이름 입력 검증
    if (type === 'child' && fieldName && !memberInfo[fieldName as keyof MemberInfo]) {
      onError('자녀 이름을 입력해주세요.');
      return;
    }

    setIsAuthenticating(true);

    try {
      let authResult: any;

      // 인증 방식에 따른 분기
      if (authType === 'N') {
        authResult = await mockPhoneAuth();
      } else {
        authResult = await mockIpinAuth();
      }

      // 결과 파라미터 구성
      const params: AuthResult = {
        ...authResult,
        phoneAuth: !!authResult.phoneNo,
      };

      // 자녀 인증 추가 처리
      if (type === 'child' && fieldName) {
        params.child = true;
        params.childName = memberInfo[fieldName as keyof MemberInfo];
      }

      // 인증 성공 시 콜백 호출
      if (params.encCi) {
        onSuccess(params);
      } else {
        onError('인증에 실패했습니다.');
      }
    } catch (error) {
      console.error('인증 오류:', error);
      onError('인증 중 오류가 발생했습니다.');
    } finally {
      setIsAuthenticating(false);
    }
  }, [type, memberInfo, onSuccess, onError]);

  /**
   * 회원 정보 초기화
   */
  const resetMemberInfo = useCallback(() => {
    setMemberInfo({
      childName1: '',
      childName2: '',
    });
  }, []);

  /**
   * 특정 필드 값 설정
   */
  const setMemberField = useCallback((field: keyof MemberInfo, value: string) => {
    setMemberInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  /**
   * 폼 유효성 검사
   */
  const validateForm = useCallback(() => {
    if (type === 'child') {
      return {
        isChildName1Valid: memberInfo.childName1.trim().length > 0,
        isChildName2Valid: memberInfo.childName2.trim().length > 0,
      };
    }
    return { isValid: true };
  }, [type, memberInfo]);

  return {
    // 상태
    memberInfo,
    isAuthenticating,
    
    // 액션
    handleMemberInfoChange,
    executeAuth,
    resetMemberInfo,
    setMemberField,
    
    // 유틸리티
    validateForm,
  };
};