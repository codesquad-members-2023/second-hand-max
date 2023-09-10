import FieldBody from './FieldBody';
import FieldLabel from './FieldLabel';
import FieldInput from './FieldInput';
import { FieldCaption } from './FieldCaption';

const Field = Object.assign(FieldBody, {
  Label: FieldLabel,
  Input: FieldInput,
  Caption: FieldCaption,
});

export default Field;
