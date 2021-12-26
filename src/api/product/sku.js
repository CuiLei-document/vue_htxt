import request from '@/utils/request'

// 获取 sku 数据列表 /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page, limit) => request({ url:`/admin/product/list/${page}/${limit}`,method:'get'})

// 商品上架 /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url:`/admin/product/onSale/${skuId}`,method:'get'})

// 商品下架 /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({ url:`/admin/product/cancelSale/${skuId}`,method:'get'})

// 商品详情 /admin/product/getSkuById/{skuId
export const reqGetSkuById = (skuId) => request({ url:`/admin/product/getSkuById/${skuId}`,method:'get'})