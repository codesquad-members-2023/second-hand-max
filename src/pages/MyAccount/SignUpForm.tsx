import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import Button from '@components/Button';
import Field from '@components/Field';
import Icons from '@design/Icons';
import TopBar from '@components/TopBar';
import ProfileImageButton from '@components/ProfileImageButton';
import PATH from '@constants/PATH';
import { InitOAuthType } from '@hooks/useOAuth';

const SignUpForm: React.FC<{ initOAuth: InitOAuthType }> = ({ initOAuth }) => {
  const [id, setId] = useState('');
  const fileRef = useRef<File>();
  const navigate = useNavigate();

  const onIdChange = (id: string) => {
    setId(id);
  };

  const onFileChange = (file: File) => {
    fileRef.current = file;
  };

  return (
    <StyledSignUpPage>
      <Title aria-label="내 계정">
        <Button
          className="cancel-button"
          $flexible="Flexible"
          $type="Ghost"
          onClick={() => {
            navigate(`/${PATH.MY_ACCOUNT}`);
          }}
        >
          닫기
        </Button>
        <span>회원가입</span>
        <Button
          $flexible="Flexible"
          $type="Ghost"
          disabled={!id}
          onClick={() =>
            initOAuth({ action: 'sign-up', id, file: fileRef.current })
          }
        >
          완료
        </Button>
      </Title>

      <ProfileImageButton {...{ onFileChange }} />
      <Field>
        <Field.Label id="id" text="아이디" />
        <Field.Input
          id="id"
          name="id"
          placeholder="내용을 입력하세요"
          value={id}
          onChange={({ target }) => {
            onIdChange(target.value);
          }}
        />
      </Field>
      <Button className="add-region-button" $flexible="Fixed" $type="Outline">
        <Icons.Plus />
        <span>위치 추가</span>
      </Button>
    </StyledSignUpPage>
  );
};

const StyledSignUpPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .add-region-button {
    ${({ theme: { fonts, colors } }) => css`
      width: 100%;
      stroke: ${colors.neutral.textStrong};
      ${fonts.available.strong16};
    `};
  }
`;

const Title = styled(TopBar)`
  justify-content: space-between;
  ${({ theme: { fonts } }) => css`
    ${fonts.display.strong16};

    button {
      ${fonts.available.strong16};
    }
  `};
`;

export default SignUpForm;
