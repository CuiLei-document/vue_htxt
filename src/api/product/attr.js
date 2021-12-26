import request from '@/utils/request'


//获取商品平台属性列表/admin/product/getCategory1
export const reqGetCategory1Id = ()=>{
    return request({ url:'/admin/product/getCategory1',method:'get'})
}

//获取商品平台属性列表/admin/product/getCategory2/{category1Id}
export const reqGetCategory2Id = (category1Id) => {
    return request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
}
//获取商品平台属性列表/admin/product/getCategory3/{category2Id}
export const reqGetCategory3Id = (category2Id) => {
    return request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })
}

// 获取三级联动菜单数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrList = (category1Id,category2Id,category3Id)=>{
    return request({ url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
}

// 添加数据表单 /admin/product/saveAttrInfo
export const reqSaveAttrInfo = (data)=>{
    return request({ url:'/admin/product/saveAttrInfo',method:'post',data})
}
