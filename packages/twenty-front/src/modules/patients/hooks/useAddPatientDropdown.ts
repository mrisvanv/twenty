import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useCallback, useEffect, useState } from 'react';
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

  const onAddPatient = async () => {
    setIsAddPatientLoading(true);
    await addPatient();
    setIsAddPatientLoading(false);
  };

  const onSearchPatient = useCallback((searchQuery: string) => {
    setPatientSearchQuery(searchQuery);
  }, []);

  return {
    onSearchPatient,
    onAddPatient,
    isSearchPatientLoading,
    isAddPatientLoading,
    patients,
  };
};
