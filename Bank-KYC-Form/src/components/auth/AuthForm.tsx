import React from 'react';

/**
 * 회원 정보 타입
 */
interface MemberInfo {
  childName1: string;
  childName2: string;
}

/**
 * 이메일 정보 타입  
 */
interface EmailInfo {
  email1: string;
}

/**
 * AuthForm Props 타입
 */
interface AuthFormProps {
  type?: string;
  memberInfo: MemberInfo;
  email: EmailInfo;
  isWebView: boolean;
  isSearchIdPw: boolean;
  onMemberInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuth: (e: React.MouseEvent<HTMLButtonElement>, authType: string) => void;
  onEmailAuth: () => void;
}

/**
 * 인증 폼 컴포넌트
 * 아이핀, 휴대전화, 이메일 인증 UI를 담당
 */
const AuthForm: React.FC<AuthFormProps> = ({
  type,
  memberInfo,
  email,
  isWebView,
  isSearchIdPw,
  onMemberInfoChange,
  onEmailChange,
  onAuth,
  onEmailAuth
}) => {
  return (
    <form name="form1" method="post" action="">
      {/* Hidden inputs - 기존 폼 호환성을 위해 유지 */}
      <input type="hidden" name="hidustring1" value="4" />
      <input type="hidden" name="hidFlg" value="14250" />
      <input type="hidden" name="radIngrDvCd" value="1" />
      <input type="hidden" name="regForeign" value="<%-strRegForeign%>" />
      <input type="hidden" name="selfCertifyCode" value="01001" />

      <div className="ul_wrap">
        <ul>
          {/* 아이핀 인증 (웹뷰가 아닌 경우에만 표시) */}
          {!isWebView && (
            <li style={{ width: '100%' }}>
              <div className="img"></div>
              <p>
                {type === 'child' && '보호자 '}아이핀(I-PIN)으로 인증
              </p>
            </li>
          )}

          {/* 자녀 인증인 경우 */}
          {type === 'child' && (
            <>
              {/* 아이핀용 자녀명 입력 */}
              <li style={{ width: '100%' }}>
                <div className="img"></div>
                <p>
                  자녀 이름<span className="mint">*</span>
                </p>
                <div className="input_box">
                  <label htmlFor="childName1">
                    <input
                      type="text"
                      placeholder="이름을 입력하세요."
                      id="childName1"
                      name="childName1"
                      onChange={onMemberInfoChange}
                      value={memberInfo.childName1}
                      title="이름"
                      required
                      aria-describedby="childName1-desc"
                    />
                  </label>
                  <div id="childName1-desc" className="sr-only">
                    아이핀 인증을 위한 자녀 이름을 입력하세요
                  </div>
                </div>
                <div className="btn">
                  <button
                    title="새창으로 열기"
                    type="button"
                    className="btn_bn-blue"
                    name="childName1"
                    onClick={(e) => onAuth(e, 'Y')}
                    disabled={!memberInfo.childName1.trim()}
                  >
                    아이핀으로 확인하기
                  </button>
                </div>
              </li>

              {/* 휴대전화용 자녀명 입력 */}
              <li style={{ width: '100%' }}>
                <div className="img"></div>
                <p>
                  자녀 이름<span className="mint">*</span>
                </p>
                <div className="input_box">
                  <label htmlFor="childName2">
                    <input
                      type="text"
                      placeholder="이름을 입력하세요."
                      id="childName2"
                      name="childName2"
                      onChange={onMemberInfoChange}
                      value={memberInfo.childName2}
                      title="이름"
                      required
                      aria-describedby="childName2-desc"
                    />
                  </label>
                  <div id="childName2-desc" className="sr-only">
                    휴대전화 인증을 위한 자녀 이름을 입력하세요
                  </div>
                </div>
                <div className="btn">
                  <button
                    title="새창으로 열기"
                    type="button"
                    className="btn_bn-blue"
                    name="childName2"
                    onClick={(e) => onAuth(e, 'N')}
                    disabled={!memberInfo.childName2.trim()}
                  >
                    휴대전화로 확인하기
                  </button>
                </div>
              </li>
            </>
          )}

          {/* ID/PW 찾기인 경우 이메일 인증 */}
          {isSearchIdPw && (
            <li style={{ width: '100%' }}>
              <div className="img"></div>
              <p>이메일로 인증</p>
              <div className="input_box">
                <label htmlFor="email_put">
                  <input
                    type="email"
                    placeholder="이메일주소를 입력하세요."
                    id="email_put"
                    name="email1"
                    onChange={onEmailChange}
                    value={email.email1}
                    title="이메일"
                    required
                    aria-describedby="email-desc"
                  />
                </label>
                <div id="email-desc" className="sr-only">
                  인증을 위한 이메일 주소를 입력하세요
                </div>
              </div>
              <div className="btn">
                <button
                  type="button"
                  className="btn_bn-blue"
                  title="이메일 인증 확인 팝업 열림"
                  onClick={onEmailAuth}
                  disabled={!email.email1.trim()}
                >
                  이메일로 확인하기
                </button>
              </div>
            </li>
          )}

          {/* 일반 성인 인증 */}
          {!type && !isSearchIdPw && (
            <>
              <li style={{ width: '100%' }}>
                <div className="img"></div>
                <p>아이핀(I-PIN)으로 인증</p>
                <div className="btn">
                  <button
                    title="새창으로 열기"
                    type="button"
                    className="btn_bn-blue"
                    onClick={(e) => onAuth(e, 'Y')}
                  >
                    아이핀으로 확인하기
                  </button>
                </div>
              </li>
              
              <li style={{ width: '100%' }}>
                <div className="img"></div>
                <p>휴대전화로 인증</p>
                <div className="btn">
                  <button
                    title="새창으로 열기"
                    type="button"
                    className="btn_bn-blue"
                    onClick={(e) => onAuth(e, 'N')}
                  >
                    휴대전화로 확인하기
                  </button>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </form>
  );
};

export default React.memo(AuthForm);