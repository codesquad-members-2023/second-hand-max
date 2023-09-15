import Field from '@components/Field';

type Props = {
  id: string;
  onIdChange: (id: string) => void;
};

export const SignUpField: React.FC<Props> = ({ id, onIdChange }) => {
  return (
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
  );
};
