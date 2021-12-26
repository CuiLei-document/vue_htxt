import request from '@/utils/request'

// 获取spu 列表数据 /admin/product/{page}/{limit}
export const reqGetSpuList = (page, limit, category3Id) => {
    return request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
}

// 获取spu的基本信息列表 /admin/product/getSpuById/{spuId}
export const reqGetSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取品牌名称数据 /admin/product/baseTrademark/getTrademarkList
export const reqGetTradeMark = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })


// 获取 spu图片 /admin/product/spuImageList/{spuId}
export const reqGetSpuImageList = (spuId) => request({ url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取 全部的销售数据 /admin/product/baseSaleAttrList
export const reqGetSakeAttrList = () => request({ url:'/admin/product/baseSaleAttrList',method:'get'})

// spu数据的提交和更新 /admin/product/saveSpuInfo   /admin/product/updateSpuInfo
export const reqAddOrUpdateId = (data) =>{
    if(data.id){
        return request({ url:'/admin/product/updateSpuInfo',method:'post',data})
    }else{
        return request({ url:'/admin/product/saveSpuInfo',method:'post',data})
    }
}
// ----------
// 删除 spu管理的 列表 /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

// 获取图片信息 /admin/product/spuImageList/{spuId}
export const reqGetSkuImageList = (spuId) => {
    return request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
}

// 获取销售属性 /admin/product/spuSaleAttrList/{spuId}
export const reqGetSaleAttrList = (spuId) => {
    return request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
}

// 获取基本属性 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}

// 提交数据 /admin/product/saveSkuInfo
export const reqSkuForm = (data) => {
    return request({ url: '/admin/product/saveSkuInfo', method: 'post', data })
}

// 获取 sku数据提示列表 /admin/product/cancelSale/{skuId}
export const reqCancelList = (spuId) => {
    return request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
}
