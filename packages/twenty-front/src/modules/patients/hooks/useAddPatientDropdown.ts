import { useRecordShowContainerActions } from '@/object-record/record-show/hooks/useRecordShowContainerActions';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Patient,
  useCreatePatientMutation,
  useSearchPatientsMutation,
} from '~/generated/graphql';

// Debounce Hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

type UseAddPatientDropdownParams = {
  record?: ObjectRecord;
  workspaceId: string;
  objectNameSingular: string;
};

export const useAddPatientDropdown = ({
  record,
  workspaceId,
  objectNameSingular,
}: UseAddPatientDropdownParams) => {
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [isSearchPatientLoading, setIsSearchPatientLoading] = useState(false);
  const [isAddPatientLoading, setIsAddPatientLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [createPatientMutation] = useCreatePatientMutation();
  const [searchPatientsMutation] = useSearchPatientsMutation();
  const { enqueueSnackBar } = useSnackBar();

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(patientSearchQuery, 500);

  // Search patients effect
  useEffect(() => {
    const searchPatients = async () => {
      if (debouncedSearchQuery.trim() !== '') {
        setIsSearchPatientLoading(true);
        try {
          const { data } = await searchPatientsMutation({
            variables: {
              searchQuery: debouncedSearchQuery,
              workspaceId: workspaceId,
            },
          });

          if (
            data?.searchPatients?.result !== undefined &&
            data?.searchPatients?.result !== null
          ) {
            setPatients(data.searchPatients.result);
          } else if (
            data?.searchPatients?.message !== undefined &&
            data?.searchPatients?.message !== null
          ) {
            enqueueSnackBar(data.searchPatients.message, {
              variant: SnackBarVariant.Error,
            });
          } else {
            enqueueSnackBar('Search failed', {
              variant: SnackBarVariant.Error,
            });
          }
        } catch (error) {
          enqueueSnackBar('Search failed', {
            variant: SnackBarVariant.Error,
          });
        } finally {
          setIsSearchPatientLoading(false);
        }
      }
    };

    searchPatients();
  }, [
    debouncedSearchQuery,
    enqueueSnackBar,
    searchPatientsMutation,
    workspaceId,
  ]);

  const addPatient = async () => {
    try {
      if (!record?.id) {
        throw new Error('Record id not found');
      }

      const { fullName, genter, dateOfBirth, location } = record;

      if (!fullName?.firstName || !fullName?.lastName) {
        throw new Error('Invalid Full name');
      }
      if (!genter) {
        throw new Error('Invalid gender');
      }
      if (!dateOfBirth) {
        throw new Error('Invalid Date of Birth');
      }
      if (!location) {
        throw new Error('Invalid Location');
      }

      const { data } = await createPatientMutation({
        variables: {
          leadId: record.id,
          workspaceId: workspaceId,
          categorySingularApiName: objectNameSingular,
        },
      });

      if (data?.createPatient?.success === true) {
        enqueueSnackBar('Patient created successfully', {
          variant: SnackBarVariant.Success,
        });
        return data.createPatient.patientId;
      } else {
        enqueueSnackBar(
          `Failed to create patient: ${data?.createPatient?.message || 'Unknown error'}`,
          {
            variant: SnackBarVariant.Error,
          },
        );
      }
    } catch (error) {
      enqueueSnackBar(`Failed to create patient: ${(error as Error).message}`, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  const [recordFromStore] = useRecoilState<ObjectRecord | null>(
    recordStoreFamilyState(record?.id || ''),
  );

  const onAddPatient = async () => {
    setIsAddPatientLoading(true);
    const patientId = await addPatient();
    if (!patientId) {
      setIsAddPatientLoading(false);
      return;
    }

    updateEntity({
      variables: {
        where: {
          id: record?.id || '',
        },
        updateOneRecordInput: {
          patientId: patientId + '',
        },
      },
    });

    setIsAddPatientLoading(false);
  };

  const { useUpdateOneObjectRecordMutation } = useRecordShowContainerActions({
    objectNameSingular,
    objectRecordId: record?.id || '',
    recordFromStore,
  });

  const onSearchPatient = useCallback((searchQuery: string) => {
    setPatientSearchQuery(searchQuery);
  }, []);

  const [updateEntity] = useUpdateOneObjectRecordMutation();

  const onSelectPatient = async (patient: Patient) => {
    setIsAddPatientLoading(true);
    updateEntity({
      variables: {
        where: {
          id: record?.id || '',
        },
        updateOneRecordInput: {
          patientId: patient.patientId + '',
        },
      },
    });

    setIsAddPatientLoading(false);
  };

  return {
    onSearchPatient,
    onAddPatient,
    onSelectPatient,
    isSearchPatientLoading,
    isAddPatientLoading,
    patients,
  };
};
