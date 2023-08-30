import { css, styled } from 'styled-components';

import Button from '@components/Button';
import Field from '@components/Field';
import Icons from '@design/Icons';
import TopBar from '@components/TopBar';
import ProfileImageButton from '@components/ProfileImageButton';

const SignUpForm: React.FC = () => {
  return (
    <ColumnLayout>
      <Title aria-label="내 계정">
        <Button className="cancel-button" $flexible="Flexible" $type="Ghost">
          닫기
        </Button>
        <span>회원가입</span>
        <Button $flexible="Flexible" $type="Ghost">
          완료
        </Button>
      </Title>

      <Form>
        <ProfileImageButton />

        <Field>
          <Field.Label id="id" text="아이디" />
          <Field.Input id="id" name="id" placeholder="내용을 입력하세요" />
        </Field>

        <Button className="add-region-button" $flexible="Fixed" $type="Outline">
          <Icons.Plus />
          <span>위치 추가</span>
        </Button>
      </Form>
    </ColumnLayout>
  );
};

const ColumnLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Form = styled.form`
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

export default SignUpForm;
