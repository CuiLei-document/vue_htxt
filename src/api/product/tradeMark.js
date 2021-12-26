import request from '@/utils/request'

// 获取分页数据列表 /admin/product/baseTrademark/{page}/{limit}

export const reqGetTradeList = (page,limit)=>{
    return request({ url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
}

// 添加品牌数据 /admin/product/baseTrademark/save
// 修改品牌数据 /admin/product/baseTrademark/update
export const reqTradeSaveOrUpdate = (data)=>{
    if(data.id){
        return request({ url:'/admin/product/baseTrademark/update',method:'put',data})
    }else{
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data })
    }
}

// 删除品牌数据
export const reqRemoveTradeMarkId = (id)=>{
    return request({ url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
}

