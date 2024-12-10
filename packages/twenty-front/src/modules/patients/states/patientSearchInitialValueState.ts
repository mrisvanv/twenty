import { atom } from 'recoil';

export const patientSearchInitialValueState = atom<string>({
  key: 'patientSearchInitialValueState',
  default: '',
});
