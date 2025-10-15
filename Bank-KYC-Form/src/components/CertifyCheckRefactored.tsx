import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 분리된 컴포넌트들
import ComLayerBox from './common/ComLayerBox';
import EventBanner from './common/EventBanner';
import AuthForm from './auth/AuthForm';

// 커스텀 훅들
import { useAuth } from '../hooks/useAuth';
import { useEmailAuth } from '../hooks/useEmailAuth';

// 기존 의존성들 (Mock으로 대체)
// import note_img from 'assets/common/img/note_img.png';
// import RootStore from 'store/RootStore';
// import { getIsWebView } from 'util/commonUtil';
// import ComScrollInfo from 'components/common/ComScrollInfo';
// import ModalContainer from 'containers/ModalContainer';
// import PopEmailVerificationFind from 'components/mypage/popup/PopEmailVerificationFind';

const note_img = '/images/note.png'; // Mock 이미지 경로

/**
 * Mock 의존성들 - 실제 프로젝트에서는 실제 모듈을 import
 */
const mockAlertStore = {
  alert: (message: string, callback?: (() => void) | null) => {
    alert(message);
    if (callback) callback();
  },
  alertBasic: (message: string) => {
    alert(message);
  }
};

const mockRootStore = {
  alertStore: mockAlertStore
};

const mockGetIsWebView = () => false;

const MockComScrollInfo: React.FC<{ textCode: string }> = ({ textCode }) => (
  <div className="scroll-info">스크롤 안내: {textCode}</div>
);

const MockModalContainer: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({ 
  isOpen, 
  children 
}) => (
  <ComLayerBox show={isOpen}>
    {children}
  </ComLayerBox>
);

const MockPopEmailVerificationFind: React.FC<{
  open: boolean;
  emailData: string;
  callback: (result?: any) => void;
}> = ({ open, emailData, callback }) => (
  <div className="email-verification-popup">
    <h3>이메일 인증</h3>
    <p>인증 이메일을 {emailData}로 전송했습니다.</p>
    <div className="button-group">
      <button onClick={() => callback({ strResult: 'SUCC', empYn: 'Y' })}>
        인증 성공
      </button>
      <button onClick={() => callback()}>
        닫기
      </button>
    </div>
  </div>
);

/**
 * Props 인터페이스
 */
interface Props {
  type?: string; // child, adult, find_memberNo, find_password
  callback: (data: any) => void;
  isFindPwd?: boolean;
  mbCrdNo?: string;
}

/**
 * 리팩토링된 본인인증 컴포넌트
 * - 단일 책임 원칙 적용
 * - 커스텀 훅으로 로직 분리
 * - 컴포넌트 모듈화
 */
const CertifyCheck: React.FC<Props> = (props) => {
  // Mock 의존성들
  const { alertStore } = mockRootStore; // useContext(RootStore);
  const location = useLocation();
  const IS_WEBVIEW = mockGetIsWebView(); // getIsWebView();

  // 파생 상태
  const isTicketMembershipCertify = location.pathname === '/ticket/membership/certify';
  const isSearchIdPw = props.type?.includes('find');

  // 커스텀 훅들
  const authHook = useAuth({
    type: props.type,
    onSuccess: (data) => {
      console.log('인증 성공:', data);
      props.callback(data);
    },
    onError: (message) => {
      alertStore.alertBasic(message);
    }
  });

  const emailAuthHook = useEmailAuth({
    mbCrdNo: props.mbCrdNo,
    onSuccess: (data) => {
      console.log('이메일 인증 성공:', data);
      props.callback(data);
    },
    onError: (message) => {
      alertStore.alertBasic(message);
    }
  });

  /**
   * 컴포넌트 마운트 시 초기화
   */
  useEffect(() => {
    // 필요한 초기화 작업
    console.log('CertifyCheck 마운트됨, props:', props);
  }, [props]);

  /**
   * 메인 렌더링
   */
  return (
    <>
      <div className="sub_content type02 signup">
        <div className="member_signUp-pd-wrap">
          <div
            className={`membership_signUp02 ${
              props.type === 'child' ? 'child' : 'type02'
            }`}
          >
            {/* 안내 문구 섹션 */}
            <div className="imgTextWrap">
              <ul className="clear">
                <li>
                  <img src={note_img} alt="안내 이미지" />
                </li>
                {isTicketMembershipCertify && (
                  <li>
                    <h3 tabIndex={0}>예매보관함 발권접수</h3>
                    <p tabIndex={0}>
                      <span className="red">아이핀(i-PIN)</span> 또는{' '}
                      <span className="red">휴대전화 본인확인</span>을 통해
                      예매보관함 발권접수가 가능합니다.
                    </p>
                  </li>
                )}
              </ul>
            </div>

            {/* 인증 폼 */}
            <AuthForm
              type={props.type}
              memberInfo={authHook.memberInfo}
              email={emailAuthHook.email}
              isWebView={IS_WEBVIEW}
              isSearchIdPw={!!isSearchIdPw}
              onMemberInfoChange={authHook.handleMemberInfoChange}
              onEmailChange={emailAuthHook.handleEmailChange}
              onAuth={authHook.executeAuth}
              onEmailAuth={emailAuthHook.handleEmailButtonClick}
            />

            {/* 스크롤 안내 */}
            <MockComScrollInfo textCode="t43000-001" />

            {/* 이벤트 배너 */}
            <EventBanner popupType="J" maxCount={2} />
          </div>
        </div>
      </div>

      {/* 이메일 인증 팝업 */}
      <MockModalContainer isOpen={emailAuthHook.openEmailPop}>
        <MockPopEmailVerificationFind
          open={emailAuthHook.openEmailPop}
          emailData={emailAuthHook.emailData}
          callback={emailAuthHook.handleEmailToggle}
        />
      </MockModalContainer>
    </>
  );
};

export default React.memo(CertifyCheck);