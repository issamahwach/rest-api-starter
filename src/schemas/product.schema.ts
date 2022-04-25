import {object, string, number, TypeOf} from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        description: string({
            required_error: 'Description is required'
        }).min(10, "Description should be at least 10 chars"),
        price: number({
            required_error: 'Price is required'
        }),
        image: string({
            required_error: 'Password is required'
        }),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: 'Product Id is required'
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const deleteProductSchema = object({
    ...params
})

export const findProductSchema = object({
    ...params
})

export type createProductInput  = TypeOf<typeof createProductSchema>
export type updateProductInput  = TypeOf<typeof updateProductSchema>
export type findProductInput  = TypeOf<typeof findProductSchema>
export type deleteProductInput  = TypeOf<typeof deleteProductSchema>

