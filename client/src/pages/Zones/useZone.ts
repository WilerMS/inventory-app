import { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { buildUrl } from '@/constants/env'
import { type ZoneInterface } from '@/types'

interface MutationErrorType {
  error: string
  message: string
}

const useZone = () => {
  const [error, setError] = useState<MutationErrorType>()

  const postZoneRequest = useCallback((zoneData: Omit<ZoneInterface, 'id' | 'user_id'>) => {
    setError(undefined)
    return api<ZoneInterface>(buildUrl('/zones'), {
      method: 'POST',
      body: JSON.stringify(zoneData)
    })
  }, [])

  const putZoneRequest = useCallback((zoneData: Omit<ZoneInterface, 'user_id'>) => {
    setError(undefined)
    return api<ZoneInterface>(buildUrl(`/zones/${zoneData.id}`), {
      method: 'PUT',
      body: JSON.stringify(zoneData)
    })
  }, [])

  const deleteZoneRequest = useCallback((zoneId: number) => {
    setError(undefined)
    return api<string>(buildUrl(`/zones/${zoneId}`), {
      method: 'DELETE'
    })
  }, [])

  const { isSuccess: isSuccesPost, mutateAsync: postZone, isLoading: isLoadingPostZone } = useMutation({
    mutationFn: postZoneRequest,
    onSuccess: (data) => {
      console.log({ data })
    },
    onError: setError
  })

  const { isSuccess: isSuccesPut, mutateAsync: putZone, isLoading: isLoadingPutZone } = useMutation({
    mutationFn: putZoneRequest,
    onSuccess: (data) => {
      console.log({ data })
    },
    onError: setError
  })

  const { isSuccess: isSuccesDelete, mutateAsync: deleteZone, isLoading: isLoadingDeleteZone } = useMutation({
    mutationFn: deleteZoneRequest,
    onSuccess: (data) => {
      console.log({ data })
    },
    onError: setError
  })

  useEffect(() => setError(undefined), [])

  return {
    postZone,
    putZone,
    deleteZone,
    isLoading: isLoadingPostZone || isLoadingPutZone || isLoadingDeleteZone,
    error,
    isSuccess: isSuccesPost || isSuccesPut || isSuccesDelete
  }
}

export default useZone
