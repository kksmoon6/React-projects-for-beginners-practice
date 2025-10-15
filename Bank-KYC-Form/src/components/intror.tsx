import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import note_img from 'assets/common/img/note_img.png';
import { API, callApi } from 'service/KorailApiService';
import RootStore from 'store/RootStore';
import { ipinAuth, phoneAuth } from 'service/AuthService';
import { getIsWebView } from 'util/commonUtil';
import { VALID_REG_EXP } from 'store/ConstantsStore';
import ComScrollInfo from 'components/common/ComScrollInfo';
import ModalContainer from 'containers/ModalContainer';
import PopEmailVerificationFind from 'components/mypage/popup/PopEmailVerificationFind';

interface EmailModel {
  email1: string;
}

interface Props {
  type?: string; // child, adult, find_memberNo, find_password
  callback: (data: any) => void;
  isFindPwd?: boolean;
  mbCrdNo?: string;
}

/* -----------------------------
 * 공용 레이어 팝업 (ComLayerBox)
 * ----------------------------- */
interface LayerProps {
  children: React.ReactNode | React.ReactNode[];
  show: boolean;
}
const areEquals = (prevProps: LayerProps, nextProps: LayerProps) =>
  prevProps.show === nextProps.show;

const ComLayerBox: React.FC<LayerProps> = ({ children, show }) => {
  if (show) {
    document.body.classList.add('modal');
    return ReactDOM.createPortal(
      <div className="layerPopup m-full">
        <div className="deemed" />
        {children}
      </div>,
      document.body
    );
  } else {
    document.body.classList.remove('modal');
  }
  return null;
};

/* -----------------------------
 * 메인 컴포넌트: CertifyCheck
 * ----------------------------- */
const CertifyCheck: React.FC<Props> = (props) => {
  const { alertStore } = useContext(RootStore);
  const location = useLocation();
  const IS_WEBVIEW = getIsWebView();

  const [memberInfo, setMemberInfo] = useState<any>({
    childName1: '',
    childName2: '',
  });
  const [eventBanner, setEventBanner] = useState<any[]>([]);
  const [email, setEmail] = useState<EmailModel>({ email1: '' });
  const [openEmailPop, setOpenEmailPop] = useState(false);
  const [emailData, setEmailData] = useState('');

  const isTicketMembershipCertify =
    location.pathname === '/ticket/membership/certify';
  const isSearchIdPw = props.type?.includes('find');

  /* ----------------------------- 이벤트 배너 ----------------------------- */
  const callEventBanner = async () => {
    const res = await callApi(API.EVENT_BANNER, { popupType: 'J' });
    if (res.data?.userEventBanner) {
      setEventBanner([...res.data.userEventBanner]);
    }
  };

  const getEventBanner = () => (
    <div className="advertiseWrap">
      <ul className="clear">
        {eventBanner.map((el, i) =>
          i < 2 ? (
            <li key={i}>
              <a href="#none" onClick={(e) => e.preventDefault()}>
                <img
                  src={`${process.env.REACT_APP_CMS_PATH}${el.popupImg}`}
                  alt={el.popupAlt}
                />
              </a>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );

  /* ----------------------------- 이메일 인증 ----------------------------- */
  const testEmailAuth = async (param: any) => {
    try {
      const res2 = await callApi(API.REQUEST_EMAIL_CODE, param);
      setEmailData(param.hidEmail);
      handleEmailToggle();
    } catch (e) {
      console.log('testEmailAuth Error', e);
    }
  };

  const handleEmailButtonClick = async () => {
    if (!email.email1)
      return alertStore.alertBasic('이메일을 입력해주세요.');
    if (!VALID_REG_EXP.email.test(email.email1))
      return alertStore.alertBasic('이메일 형식을 확인해주세요.');

    const param = {
      hidEmail: email.email1,
      mbCrdNo: props.mbCrdNo,
    };
    testEmailAuth(param);
  };

  const handleEmailToggle = (res?: any) => {
    setOpenEmailPop(!openEmailPop);
    if (res && res.strResult === 'SUCC' && res.empYn === 'Y') {
      props.callback(res);
    }
  };

  /* ----------------------------- 인증 로직 ----------------------------- */
  const openAuth = async (e: any, data: string) => {
    let result: any;
    if (props.type === 'child' && !memberInfo[e.target.name]) {
      return alertStore.alert('자녀 이름을 입력해주세요.', null);
    }
    if (data === 'N') result = await phoneAuth();
    else result = await ipinAuth();

    let params = {
      ...result,
      phoneAuth: !!result.phoneNo,
    };

    if (props.type === 'child') {
      params.child = true;
      params.childName =
        data === 'N' ? memberInfo.childName2 : memberInfo.childName1;
    }

    if (params.encCi) props.callback(params);
  };

  const changeForm = (e: any) => {
    setMemberInfo({
      ...memberInfo,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const onEmailChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setEmail((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    callEventBanner();
  }, []);

  /* ----------------------------- 렌더링 ----------------------------- */
  return (
    <>
      <div className="sub_content type02 signup">
        <div className="member_signUp-pd-wrap">
          <div
            className={
              'membership_signUp02 ' +
              (props.type === 'child' ? 'child' : 'type02')
            }
          >
            {/* 안내 문구 */}
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

            {/* 폼 영역 */}
            <form name="form1" method="post" action="">
              {/* hidden input */}
              <input type="hidden" name="hidustring1" value="4" />
              <input type="hidden" name="hidFlg" value="14250" />
              <input type="hidden" name="radIngrDvCd" value="1" />
              <input type="hidden" name="regForeign" value="<%-strRegForeign%>" />
              <input type="hidden" name="selfCertifyCode" value="01001" />

              <div className="ul_wrap">
                <ul>
                  {!IS_WEBVIEW && (
                    <li style={{ width: '100%' }}>
                      <div className="img"></div>
                      <p>
                        {props.type === 'child' && '보호자 '}아이핀(I-PIN)으로 인증
                      </p>
                    </li>
                  )}

                  {props.type === 'child' && (
                    <>
                      {/* 자녀 이름 입력 */}
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
                              onChange={changeForm}
                              value={memberInfo.childName1}
                              title="이름"
                            />
                          </label>
                        </div>
                        <div className="btn">
                          <button
                            title="새창으로 열기"
                            type="button"
                            className="btn_bn-blue"
                            name="childName1"
                            onClick={(e) => openAuth(e, 'Y')}
                          >
                            아이핀으로 확인하기
                          </button>
                        </div>
                      </li>

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
                              onChange={changeForm}
                              value={memberInfo.childName2}
                              title="이름"
                            />
                          </label>
                        </div>
                        <div className="btn">
                          <button
                            title="새창으로 열기"
                            type="button"
                            className="btn_bn-blue"
                            name="childName2"
                            onClick={(e) => openAuth(e, 'N')}
                          >
                            휴대전화로 확인하기
                          </button>
                        </div>
                      </li>
                    </>
                  )}

                  {isSearchIdPw && (
                    <li style={{ width: '100%' }}>
                      <div className="img"></div>
                      <p>이메일로 인증</p>
                      <div className="input_box">
                        <label htmlFor="email11">
                          <input
                            type="text"
                            placeholder="이메일주소를 입력하세요."
                            id="email_put"
                            name="email1"
                            onChange={onEmailChange}
                            value={email.email1}
                            title="이메일"
                          />
                        </label>
                      </div>
                      <div className="btn">
                        <button
                          type="button"
                          className="btn_bn-blue"
                          title="이메일 인증 확인 팝업 열림"
                          onClick={handleEmailButtonClick}
                        >
                          이메일로 확인하기
                        </button>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </form>

            {/* 스크롤 안내 / 이벤트 배너 */}
            <ComScrollInfo textCode="t43000-001" />
            {getEventBanner()}
          </div>
        </div>
      </div>

      {/* 이메일 인증 팝업 */}
      <ModalContainer isOpen={openEmailPop}>
        <PopEmailVerificationFind
          open={openEmailPop}
          emailData={emailData}
          callback={handleEmailToggle}
        />
      </ModalContainer>
    </>
  );
};

export default React.memo(CertifyCheck);
