import createError from 'http-errors';
import User from '../models/user.model';
import { IUser } from '../types/models';
//Tra lai ket qua
const getAll = async (query: any)=>{
    //Phân trang
    const currentPage = query &&  query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query &&  query.sortBy ? query.sortBy : 'sort'
    const sortType = query &&  query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}
    
    //Đếm tổng số record hiện có của collection Product
    const count = await User.countDocuments();

    //Lấy danh sách khớp với điều kiện cần lấy
    const users = await User
    .find({})
    .select('-__v')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = users.length;

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(count / pageSize), //tổng số trang
        totalItems: count, //tổng số records
        filteredCount, //số record khớp điều kiện
        sortBy: sortObject,
        users: users
    }
}

const getUserById  = async (id:string)=>{
    //SELECT * FROM users WHERE _id = id
    const result = await User.findById(id);

    if(!result){
        throw createError(404,'User not found');
    }
    return result;
}

const createUser = async (data: IUser)=>{
    const result = await User.create(data)
    return result;
}

const updateUser = async (id: string,payload: IUser)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const user = await getUserById(id);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(user, payload);
    await user.save();

    return user
}

const deleteUser = async (id:string)=>{
   
    // const user = await User.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const user = await getUserById(id);
    await User.deleteOne({ _id: user._id });
    return user
}

export default {
    getAll,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}