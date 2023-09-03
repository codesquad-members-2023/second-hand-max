import FieldBody from './FieldBody';
import FieldLabel from './FieldLabel';
import FieldInput from './FieldInput';

const Field = Object.assign(FieldBody, {
  Label: FieldLabel,
  Input: FieldInput,
});

export default Field;
