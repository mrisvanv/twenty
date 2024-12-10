import { useRecordShowContainerActions } from '@/object-record/record-show/hooks/useRecordShowContainerActions';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Patient,
  useAttachPatientMutation,
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
  const [attachPatientMutation] = useAttachPatientMutation();
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

          // Your actual search logic here
          // await new Promise((resolve) => setTimeout(resolve, 1000));
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
  }, [debouncedSearchQuery, enqueueSnackBar]);

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

  // const attachPatient = async (patient: Patient) => {
  //   try {
  //     // useAttachPatientMutation

  //     if (!record?.id) {
  //       throw new Error('Record id not found');
  //     }

  //     if (!patient.patientId) {
  //       throw new Error('Patient id not found');
  //     }

  //     const { data } = await attachPatientMutation({
  //       variables: {
  //         leadId: record.id,
  //         patientId: patient.patientId,
  //         categorySingularApiName: objectNameSingular,
  //       },
  //     });

  //     if (data?.attachPatient?.success === true) {
  //       enqueueSnackBar('Patient attached successfully', {
  //         variant: SnackBarVariant.Success,
  //       });
  //     } else {
  //       enqueueSnackBar(
  //         `Failed to attach patient: ${data?.attachPatient?.message || 'Unknown error'}`,
  //         {
  //           variant: SnackBarVariant.Error,
  //         },
  //       );
  //     }
  //   } catch (error) {
  //     enqueueSnackBar(`Failed to select patient: ${(error as Error).message}`, {
  //       variant: SnackBarVariant.Error,
  //     });
  //   }
  // };
  // const resetObjectMetadataItems = useResetRecoilState(
  //   objectMetadataItemsState,
  // );

  // const [objectMetadataItems, setObjectMetadataItems] = useRecoilState(
  //   objectMetadataItemsState,
  // );
  const [recordFromStore, setRecordFromStore] =
    useRecoilState<ObjectRecord | null>(
      recordStoreFamilyState(record?.id || ''),
    );

  const setPatientId = (patientId: string) => {
    console.log('recordFromStore====================', recordFromStore);
  };
  // const [recordLoading, setRecordLoading] = useRecoilState(
  //   recordLoadingFamilyState(record?.id || ''),
  // );
  // console.log('recordLoading', recordLoading);
  // const handleRefresh = () => {
  //   setRecordLoading(false);
  // };

  const onAddPatient = async () => {
    setIsAddPatientLoading(true);
    const patientId = await addPatient();
    if (!patientId) {
      setIsAddPatientLoading(false);
      return;
    }
    // const newRecordFromStore: ObjectRecord = {
    //   ...recordFromStore,
    //   patientId: patientId,
    // } as ObjectRecord;
    // setRecordFromStore(newRecordFromStore);
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

  const [updateEntity, loading] = useUpdateOneObjectRecordMutation();

  const onSelectPatient = async (patient: Patient) => {
    setIsAddPatientLoading(true);
    // await attachPatient(patient);
    // const newRecordFromStore: ObjectRecord = {
    //   ...recordFromStore,
    //   patientId: patient.patientId,
    // } as ObjectRecord;
    // setRecordFromStore(newRecordFromStore);
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

    // handleRefresh();
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
