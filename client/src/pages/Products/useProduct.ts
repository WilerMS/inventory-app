import { useCallback, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { buildUrl } from '@/constants/env'
import { type ProductInterface } from '@/types'

interface MutationErrorType {
  error: string
  message: string
}

const useProduct = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<MutationErrorType>()

  const postProductRequest = useCallback((productData: Omit<ProductInterface, 'id' | 'user_id'>) => {
    setError(undefined)
    return api<ProductInterface>(buildUrl('/products'), {
      method: 'POST',
      body: JSON.stringify(productData)
    })
  }, [])

  const putProductRequest = useCallback((productData: Omit<ProductInterface, 'user_id'>) => {
    setError(undefined)
    return api<ProductInterface>(buildUrl(`/products/${productData.id}`), {
      method: 'PUT',
      body: JSON.stringify(productData)
    })
  }, [])

  const deleteProductRequest = useCallback((productId: number) => {
    setError(undefined)
    return api<string>(buildUrl(`/products/${productId}`), {
      method: 'DELETE'
    })
  }, [])

  const { isSuccess: isSuccesPost, mutateAsync: postProduct, isLoading: isLoadingPost } = useMutation({
    mutationFn: postProductRequest,
    onSuccess: (data) => {
      console.log({ data })
      queryClient.invalidateQueries(['zones', `${data.zone_id}`])
    },
    onError: setError
  })

  const { isSuccess: isSuccesPut, mutateAsync: putProduct, isLoading: isLoadingPut } = useMutation({
    mutationFn: putProductRequest,
    onSuccess: (data) => {
      console.log({ data })
      queryClient.invalidateQueries(['zones'])
    },
    onError: setError
  })

  const { isSuccess: isSuccesDelete, mutateAsync: deleteProduct, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: (data) => {
      console.log({ data })
    },
    onError: setError
  })

  useEffect(() => setError(undefined), [])

  return {
    postProduct,
    putProduct,
    deleteProduct,
    error,
    isLoading: isLoadingPost || isLoadingPut || isLoadingDelete,
    isSuccess: isSuccesPost || isSuccesPut || isSuccesDelete
  }
}

export default useProduct
